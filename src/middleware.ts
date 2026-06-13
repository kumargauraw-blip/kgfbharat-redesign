import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Name of the cookie that holds the admin session token.
const AUTH_COOKIE = "kgf_admin_auth"

// Where an authenticated admin lands by default.
const HOME = "/admin/certificates"

// `/admin` itself is the public login page. Everything *under* /admin requires auth.
export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl
    const token = request.cookies.get(AUTH_COOKIE)?.value
    const expected = process.env.ADMIN_SESSION_SECRET
    const isAuthed = !!expected && token === expected

    // The login page (/admin exactly).
    if (pathname === "/admin") {
        // Already signed in? Skip the login screen.
        if (isAuthed) {
            return NextResponse.redirect(new URL(HOME, request.url))
        }
        return NextResponse.next()
    }

    // Protected admin area (/admin/...).
    if (!isAuthed) {
        const loginUrl = new URL("/admin", request.url)
        loginUrl.searchParams.set("from", pathname)
        return NextResponse.redirect(loginUrl)
    }

    return NextResponse.next()
}

export const config = {
    matcher: ["/admin/:path*"],
}
