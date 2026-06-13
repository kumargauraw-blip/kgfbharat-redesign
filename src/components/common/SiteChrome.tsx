"use client"

import { usePathname } from "next/navigation"
import { Navbar } from "./Navbar"
import { Footer } from "./Footer"

// The public navbar/footer should not wrap the admin area (login, certificate
// studio, course/batch management) — those render their own full-screen shells.
export function SiteChrome({ children }: { children: React.ReactNode }) {
    const pathname = usePathname() || ""
    const bare = pathname.startsWith("/admin")

    if (bare) {
        return <>{children}</>
    }

    return (
        <>
            <Navbar />
            <main className="flex-1 pt-28">{children}</main>
            <Footer />
        </>
    )
}
