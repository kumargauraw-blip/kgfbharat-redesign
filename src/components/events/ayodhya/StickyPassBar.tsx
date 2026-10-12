"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

const ACTIONS = [
    { href: "#sponsorship", lines: ["इवेंट", "प्रायोजक बनें"] },
    { href: "#bus-sponsorship", lines: ["यात्रा बस", "प्रायोजक बनें"] },
    { href: "#passes", lines: ["टिकट लें"] },
] as const

export function StickyPassBar() {
    const [pastHero, setPastHero] = useState(false)
    const [ctaInView, setCtaInView] = useState(false)

    useEffect(() => {
        const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.8)
        onScroll()
        window.addEventListener("scroll", onScroll, { passive: true })

        const observer = new IntersectionObserver(
            (entries) => setCtaInView(entries.some((entry) => entry.isIntersecting)),
            { threshold: 0.05 },
        )
        for (const id of ["passes", "sponsorship"]) {
            const el = document.getElementById(id)
            if (el) observer.observe(el)
        }

        return () => {
            window.removeEventListener("scroll", onScroll)
            observer.disconnect()
        }
    }, [])

    const visible = pastHero && !ctaInView

    return (
        <div
            aria-hidden={!visible}
            className={cn(
                "fixed inset-x-0 bottom-0 z-50 border-t border-ay-gold/30 bg-ay-night/95 px-2.5 py-2.5 backdrop-blur-md transition-transform duration-300 md:hidden",
                "pb-[max(0.625rem,env(safe-area-inset-bottom))]",
                visible ? "translate-y-0" : "translate-y-full",
            )}
        >
            <div className="flex items-stretch gap-1.5 font-ay-sans">
                {ACTIONS.map((action) => (
                    <a
                        key={action.href}
                        href={action.href}
                        tabIndex={visible ? 0 : -1}
                        className="flex min-w-0 flex-1 items-center justify-center rounded-full bg-ay-saffron px-1.5 py-2 text-center text-[12px] font-semibold leading-[1.2] text-white transition-colors hover:bg-ay-saffron-bright"
                    >
                        <span>
                            {action.lines.map((line, i) => (
                                <span key={line} className={i > 0 ? "block" : undefined}>
                                    {line}
                                </span>
                            ))}
                        </span>
                    </a>
                ))}
            </div>
        </div>
    )
}
