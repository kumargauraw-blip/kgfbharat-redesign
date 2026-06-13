import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const AUTH_COOKIE = "kgf_admin_auth"
const HOME = "/admin/certificates"

export async function POST(request: NextRequest) {
    const formData = await request.formData()
    const password = String(formData.get("password") ?? "")
    const from = String(formData.get("from") ?? "")

    const adminPassword = process.env.ADMIN_PASSWORD
    const sessionSecret = process.env.ADMIN_SESSION_SECRET

    // Wrong password (or server misconfigured) → back to the /admin login with an error flag.
    if (!adminPassword || !sessionSecret || password !== adminPassword) {
        const loginUrl = new URL("/admin", request.url)
        loginUrl.searchParams.set("error", "1")
        if (from) loginUrl.searchParams.set("from", from)
        return NextResponse.redirect(loginUrl, { status: 303 })
    }

    // Only allow redirecting back to a protected admin sub-route; otherwise go to the studio.
    const target = from.startsWith("/admin/") ? from : HOME
    const response = NextResponse.redirect(new URL(target, request.url), { status: 303 })
    response.cookies.set(AUTH_COOKIE, sessionSecret, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 8, // 8 hours
    })
    return response
}
