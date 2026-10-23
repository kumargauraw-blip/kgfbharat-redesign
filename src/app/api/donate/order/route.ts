import { NextRequest, NextResponse } from "next/server"

/**
 * Creates a Razorpay order for a donation.
 *
 * The amount is validated and converted to paise here, server-side, so the
 * client can never dictate an out-of-range charge. The order is created with a
 * Basic-auth call to Razorpay's REST API (key id + secret), so no SDK is
 * needed. The public key id is returned to the browser so Checkout can open;
 * the secret never leaves the server.
 */

export const dynamic = "force-dynamic"

const MIN_AMOUNT = 100        // ₹100 minimum
const MAX_AMOUNT = 500_000    // ₹5,00,000 cap per transaction

export async function POST(request: NextRequest) {
    const keyId = process.env.RAZORPAY_KEY_ID
    const keySecret = process.env.RAZORPAY_KEY_SECRET
    if (!keyId || !keySecret) {
        return NextResponse.json(
            { error: "Online donations are not configured yet. Please try again later." },
            { status: 503 },
        )
    }

    let body: { amount?: unknown }
    try {
        body = await request.json()
    } catch {
        return NextResponse.json({ error: "Invalid request." }, { status: 400 })
    }

    const amount = Number(body.amount)
    if (!Number.isInteger(amount) || amount < MIN_AMOUNT || amount > MAX_AMOUNT) {
        return NextResponse.json(
            {
                error: `Please enter a whole amount between ₹${MIN_AMOUNT.toLocaleString("en-IN")} and ₹${MAX_AMOUNT.toLocaleString("en-IN")}.`,
            },
            { status: 400 },
        )
    }

    const auth = Buffer.from(`${keyId}:${keySecret}`).toString("base64")
    let upstream: Response
    try {
        upstream = await fetch("https://api.razorpay.com/v1/orders", {
            method: "POST",
            headers: {
                Authorization: `Basic ${auth}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                amount: amount * 100, // Razorpay works in paise
                currency: "INR",
                receipt: `kgf_${Date.now()}`,
                notes: { purpose: "KGF Bharat donation" },
            }),
            cache: "no-store",
            signal: AbortSignal.timeout(20_000),
        })
    } catch {
        return NextResponse.json(
            { error: "The payment service is unavailable right now. Please try again." },
            { status: 502 },
        )
    }

    if (!upstream.ok) {
        return NextResponse.json(
            { error: "We could not start the payment. Please try again." },
            { status: 502 },
        )
    }

    const order = await upstream.json()
    return NextResponse.json({
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        keyId, // public key — safe to expose to the browser for Checkout
    })
}
