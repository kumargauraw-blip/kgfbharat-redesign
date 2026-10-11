import { NextRequest, NextResponse } from "next/server"

/**
 * Relays the Ayodhya 2026 sponsorship inquiry form to the existing WordPress
 * handler (cms.kgfbharat.org/form-handler.php → Elastic Email).
 *
 * The handler only accepts same-origin requests and keeps its anti-spam token in
 * cookies, so a browser on www.kgfbharat.org cannot call it directly. GET fetches
 * a fresh token and parks the handler's cookies in our own HttpOnly cookie; POST
 * replays them with the submission.
 */

export const dynamic = "force-dynamic"

const HANDLER = "https://cms.kgfbharat.org/form-handler.php"
const UPSTREAM_HEADERS = {
    Origin: "https://cms.kgfbharat.org",
    Referer: "https://cms.kgfbharat.org/ayodhya-event-2026-hindi/",
}
const RELAY_COOKIE = "kgf_inquiry_relay"
const COOKIE_PATH = "/api/events/inquiry"

const FIELDS = { plan: 200, name: 120, organisation: 160, email: 160, phone: 15, message: 2000, company_website: 200 } as const

const fail = (message: string, status: number) => NextResponse.json({ success: false, message }, { status })

function forwardedFor(request: NextRequest): Record<string, string> {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    return ip ? { "X-Forwarded-For": ip } : {}
}

export async function GET(request: NextRequest) {
    let upstream: Response
    try {
        upstream = await fetch(HANDLER, {
            headers: { ...UPSTREAM_HEADERS, ...forwardedFor(request) },
            cache: "no-store",
            signal: AbortSignal.timeout(10_000),
        })
    } catch {
        return fail("फ़ॉर्म सेवा अभी उपलब्ध नहीं है — कृपया ईमेल या फ़ोन से संपर्क करें।", 502)
    }

    const cookies = upstream.headers
        .getSetCookie()
        .map((c) => c.split(";")[0])
        .filter(Boolean)
        .join("; ")
    const body = await upstream.json().catch(() => ({ success: false, message: "Unexpected response." }))

    const res = NextResponse.json(body, { status: upstream.status })
    if (upstream.ok && cookies) {
        res.cookies.set(RELAY_COOKIE, cookies, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: COOKIE_PATH,
            maxAge: 60 * 60,
        })
    }
    return res
}

export async function POST(request: NextRequest) {
    const relay = request.cookies.get(RELAY_COOKIE)?.value
    if (!relay) return fail("सत्र समाप्त हो गया — कृपया पेज को पुनः लोड करके फिर प्रयास करें।", 400)

    let incoming: FormData
    try {
        incoming = await request.formData()
    } catch {
        return fail("अमान्य अनुरोध।", 400)
    }

    const outgoing = new FormData()
    for (const [key, max] of Object.entries(FIELDS)) {
        const value = String(incoming.get(key) ?? "").trim()
        if (value.length > max) return fail("कुछ फ़ील्ड बहुत लंबे हैं।", 400)
        outgoing.set(key, value)
    }
    const name = outgoing.get("name") as string
    const email = outgoing.get("email") as string
    if (!name || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return fail("कृपया अपना नाम और एक मान्य ईमेल दर्ज करें।", 400)
    }
    if (!incoming.get("agree_terms")) return fail("कृपया नियम व शर्तों से सहमति दें।", 400)
    outgoing.set("agree_terms", "on")
    outgoing.set("subject", `${outgoing.get("plan")} पूछताछ — ${name}`)

    let upstream: Response
    try {
        upstream = await fetch(HANDLER, {
            method: "POST",
            headers: { ...UPSTREAM_HEADERS, ...forwardedFor(request), Cookie: relay },
            body: outgoing,
            cache: "no-store",
            signal: AbortSignal.timeout(20_000),
        })
    } catch {
        return fail("भेजा नहीं जा सका — कृपया ईमेल या फ़ोन से संपर्क करें।", 502)
    }

    const body = await upstream.json().catch(() => ({ success: false, message: "कुछ गड़बड़ हो गई — कृपया पुनः प्रयास करें।" }))
    const res = NextResponse.json(body, { status: upstream.status })
    if (body.success) res.cookies.delete({ name: RELAY_COOKIE, path: COOKIE_PATH })
    return res
}
