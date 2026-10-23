import { NextRequest, NextResponse } from "next/server"
import crypto from "crypto"
import { sendDonationReceipt } from "@/lib/donation-receipt"

/**
 * Verifies a completed Razorpay payment and emails a receipt.
 *
 * The signature check (HMAC-SHA256 of "order_id|payment_id" with the key secret)
 * is what proves the payment is genuine — the client's word is never trusted.
 * After verifying, we fetch the payment from Razorpay to get the authoritative
 * amount and the email the donor entered at Checkout, then send a best-effort
 * receipt. Email failure never fails the confirmation; the charge is already done.
 */

export const dynamic = "force-dynamic"

export async function POST(request: NextRequest) {
    const keyId = process.env.RAZORPAY_KEY_ID
    const keySecret = process.env.RAZORPAY_KEY_SECRET
    if (!keyId || !keySecret) {
        return NextResponse.json({ error: "Online donations are not configured yet." }, { status: 503 })
    }

    let body: {
        razorpay_order_id?: string
        razorpay_payment_id?: string
        razorpay_signature?: string
        amount?: unknown
        donor?: { name?: string; email?: string }
    }
    try {
        body = await request.json()
    } catch {
        return NextResponse.json({ error: "Invalid request." }, { status: 400 })
    }

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
        return NextResponse.json({ verified: false, error: "Missing payment details." }, { status: 400 })
    }

    const expected = crypto
        .createHmac("sha256", keySecret)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest("hex")

    const signatureBuf = Buffer.from(razorpay_signature)
    const expectedBuf = Buffer.from(expected)
    const valid =
        signatureBuf.length === expectedBuf.length &&
        crypto.timingSafeEqual(signatureBuf, expectedBuf)

    if (!valid) {
        return NextResponse.json({ verified: false, error: "Payment could not be verified." }, { status: 400 })
    }

    // Pull the authoritative amount and email from Razorpay rather than trusting the client.
    let amount = Number(body.amount) || 0
    let donorEmail = String(body.donor?.email ?? "").trim()
    const donorName = String(body.donor?.name ?? "").trim()
    try {
        const auth = Buffer.from(`${keyId}:${keySecret}`).toString("base64")
        const res = await fetch(`https://api.razorpay.com/v1/payments/${razorpay_payment_id}`, {
            headers: { Authorization: `Basic ${auth}` },
            cache: "no-store",
            signal: AbortSignal.timeout(15_000),
        })
        if (res.ok) {
            const payment = await res.json()
            if (typeof payment.amount === "number") amount = Math.round(payment.amount / 100)
            if (!donorEmail && typeof payment.email === "string") donorEmail = payment.email
        }
    } catch {
        // Fall back to the client-reported amount/email below.
    }

    let emailed = false
    if (donorEmail && amount > 0) {
        emailed = await sendDonationReceipt({
            name: donorName,
            email: donorEmail,
            amount,
            paymentId: razorpay_payment_id,
        }).catch(() => false)
    }

    return NextResponse.json({ verified: true, emailed, amount })
}
