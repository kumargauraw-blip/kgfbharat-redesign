import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const AUTH_COOKIE = "kgf_admin_auth"

// Linked from the admin UI with a normal <Link>/<a>, so handle GET.
export async function GET(request: NextRequest) {
    const response = NextResponse.redirect(new URL("/admin", request.url), { status: 303 })
    response.cookies.set(AUTH_COOKIE, "", {
        httpOnly: true,
        path: "/",
        maxAge: 0,
    })
    return response
}
