/**
 * Sends a donation acknowledgement / receipt email via Elastic Email — the same
 * provider the WordPress form handler already uses for this site.
 *
 * This is best-effort: if ELASTIC_EMAIL_API_KEY is not set (e.g. while testing),
 * or delivery fails, we log and return false. The caller must never block the
 * payment confirmation on the receipt, since the money has already been taken.
 */

const ELASTIC_ENDPOINT = "https://api.elasticemail.com/v2/email/send"

export interface DonationReceiptInput {
    name: string
    email: string
    amount: number // rupees
    paymentId: string
}

function formatInr(amount: number): string {
    return `₹${amount.toLocaleString("en-IN")}`
}

function receiptHtml(input: DonationReceiptInput, amountStr: string, dateStr: string): string {
    const greetingName = input.name ? ` ${input.name}` : ""
    return `<!doctype html>
<html>
  <body style="margin:0;background:#fff5eb;font-family:-apple-system,Segoe UI,Roboto,Arial,sans-serif;color:#111827;">
    <div style="max-width:560px;margin:0 auto;padding:32px 24px;">
      <div style="background:#cd5600;color:#fff;border-radius:16px 16px 0 0;padding:28px 28px 22px;">
        <div style="font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#ffe08a;font-weight:800;">KGF Bharat</div>
        <h1 style="margin:8px 0 0;font-size:24px;font-weight:800;">Thank you for your donation</h1>
      </div>
      <div style="background:#ffffff;border:1px solid #f1e3d6;border-top:none;border-radius:0 0 16px 16px;padding:28px;">
        <p style="margin:0 0 16px;font-size:15px;line-height:1.6;">Dear${greetingName},</p>
        <p style="margin:0 0 20px;font-size:15px;line-height:1.6;">
          We have received your generous contribution of <strong>${amountStr}</strong>.
          Your support directly funds AI education, skill development, and the Dharmalankaran Awards.
        </p>
        <table style="width:100%;border-collapse:collapse;font-size:14px;margin:0 0 20px;">
          <tr><td style="padding:8px 0;color:#6b7280;">Amount</td><td style="padding:8px 0;text-align:right;font-weight:700;">${amountStr}</td></tr>
          <tr><td style="padding:8px 0;color:#6b7280;">Date</td><td style="padding:8px 0;text-align:right;">${dateStr}</td></tr>
          <tr><td style="padding:8px 0;color:#6b7280;">Payment reference</td><td style="padding:8px 0;text-align:right;font-family:monospace;">${input.paymentId}</td></tr>
        </table>
        <p style="margin:0 0 16px;font-size:13px;line-height:1.6;color:#6b7280;">
          KGF Bharat is a registered charitable trust. Your official 80G tax-exemption
          receipt under Section 80G of the Income Tax Act, 1961 will follow by email.
          Please retain this acknowledgement and payment reference for your records.
        </p>
        <p style="margin:0;font-size:14px;line-height:1.6;">With gratitude,<br/><strong>Team KGF Bharat</strong></p>
      </div>
      <p style="text-align:center;color:#9ca3af;font-size:12px;margin:20px 0 0;">This is an automated acknowledgement from kgfbharat.org</p>
    </div>
  </body>
</html>`
}

function receiptText(input: DonationReceiptInput, amountStr: string, dateStr: string): string {
    const greetingName = input.name ? ` ${input.name}` : ""
    return [
        `Dear${greetingName},`,
        ``,
        `Thank you for your generous donation of ${amountStr} to KGF Bharat.`,
        ``,
        `Amount: ${amountStr}`,
        `Date: ${dateStr}`,
        `Payment reference: ${input.paymentId}`,
        ``,
        `KGF Bharat is a registered charitable trust. Your official 80G tax-exemption`,
        `receipt will follow by email. Please retain this acknowledgement for your records.`,
        ``,
        `With gratitude,`,
        `Team KGF Bharat`,
    ].join("\n")
}

export async function sendDonationReceipt(input: DonationReceiptInput): Promise<boolean> {
    const apiKey = process.env.ELASTIC_EMAIL_API_KEY
    if (!apiKey) {
        console.warn(`[donation] ELASTIC_EMAIL_API_KEY not set — receipt not sent for ${input.paymentId}`)
        return false
    }

    const from = process.env.DONATION_RECEIPT_FROM || "donations@kgfbharat.org"
    const fromName = process.env.DONATION_RECEIPT_FROM_NAME || "KGF Bharat"
    const amountStr = formatInr(input.amount)
    const dateStr = new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })

    const params = new URLSearchParams({
        apikey: apiKey,
        from,
        fromName,
        to: input.email,
        subject: `Thank you for your donation to KGF Bharat — ${amountStr}`,
        bodyHtml: receiptHtml(input, amountStr, dateStr),
        bodyText: receiptText(input, amountStr, dateStr),
        isTransactional: "true",
    })
    const notify = process.env.DONATION_NOTIFY_EMAIL
    if (notify) params.set("bcc", notify)

    try {
        const res = await fetch(ELASTIC_ENDPOINT, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: params.toString(),
            cache: "no-store",
            signal: AbortSignal.timeout(15_000),
        })
        const data = await res.json().catch(() => null)
        if (!res.ok || (data && data.success === false)) {
            console.error(`[donation] receipt send failed for ${input.paymentId}:`, data?.error || res.status)
            return false
        }
        return true
    } catch (err) {
        console.error(`[donation] receipt send error for ${input.paymentId}:`, err)
        return false
    }
}
