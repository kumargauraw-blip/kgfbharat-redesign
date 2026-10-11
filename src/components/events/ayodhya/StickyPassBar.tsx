"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

export function StickyPassBar({ fromPrice }: { fromPrice: string }) {
    const [pastHero, setPastHero] = useState(false)
    const [passesInView, setPassesInView] = useState(false)

    useEffect(() => {
        const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.8)
        onScroll()
        window.addEventListener("scroll", onScroll, { passive: true })

        const passes = document.getElementById("passes")
        const observer = new IntersectionObserver(([entry]) => setPassesInView(entry.isIntersecting), { threshold: 0.05 })
        if (passes) observer.observe(passes)

        return () => {
            window.removeEventListener("scroll", onScroll)
            observer.disconnect()
        }
    }, [])

    const visible = pastHero && !passesInView

    return (
        <div
            aria-hidden={!visible}
            className={cn(
                "fixed inset-x-0 bottom-0 z-50 border-t border-ay-gold/30 bg-ay-night/95 px-4 py-3 backdrop-blur-md transition-transform duration-300 md:hidden",
                "pb-[max(0.75rem,env(safe-area-inset-bottom))]",
                visible ? "translate-y-0" : "translate-y-full",
            )}
        >
            <div className="flex items-center justify-between gap-3 font-ay-sans">
                <div className="leading-tight">
                    <p className="text-xs text-ay-paper/70">पास</p>
                    <p className="text-lg font-semibold text-ay-paper">{fromPrice} से</p>
                </div>
                <a
                    href="#passes"
                    tabIndex={visible ? 0 : -1}
                    className="rounded-full bg-ay-saffron px-6 py-2.5 text-[15px] font-semibold text-white transition-colors hover:bg-ay-saffron-bright"
                >
                    टिकट लें →
                </a>
            </div>
        </div>
    )
}
