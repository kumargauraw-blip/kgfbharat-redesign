"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

const LINKS = [
    { id: "about", label: "परिचय" },
    { id: "schedule", label: "कार्यक्रम" },
    { id: "speakers", label: "वक्ता" },
    { id: "passes", label: "पास" },
    { id: "sponsorship", label: "प्रायोजन" },
    { id: "gallery", label: "गैलरी" },
    { id: "venue", label: "स्थल" },
    { id: "faq", label: "प्रश्न" },
]

export function EventSubnav() {
    const [active, setActive] = useState<string | null>(null)

    useEffect(() => {
        const sections = LINKS.map((l) => document.getElementById(l.id)).filter(Boolean) as HTMLElement[]
        let frame = 0
        const update = () => {
            frame = 0
            const line = 160
            let current: string | null = null
            for (const s of sections) {
                if (s.getBoundingClientRect().top <= line) current = s.id
            }
            setActive(current)
        }
        const onScroll = () => {
            if (!frame) frame = requestAnimationFrame(update)
        }
        update()
        window.addEventListener("scroll", onScroll, { passive: true })
        window.addEventListener("resize", onScroll)
        return () => {
            cancelAnimationFrame(frame)
            window.removeEventListener("scroll", onScroll)
            window.removeEventListener("resize", onScroll)
        }
    }, [])

    return (
        <nav
            aria-label="आयोजन के खंड"
            className="sticky top-[68px] z-40 border-b border-ay-gold/20 bg-ay-night/95 backdrop-blur-md"
        >
            <div className="container-custom flex items-center gap-4">
                <ul className="flex flex-1 gap-1 overflow-x-auto py-2.5 font-ay-sans text-[15px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    {LINKS.map((l) => (
                        <li key={l.id} className="shrink-0">
                            <a
                                href={`#${l.id}`}
                                aria-current={active === l.id ? "true" : undefined}
                                className={cn(
                                    "block rounded-full px-3.5 py-1.5 transition-colors",
                                    active === l.id
                                        ? "bg-ay-gold/20 text-ay-gold-light"
                                        : "text-ay-paper/75 hover:text-ay-paper",
                                )}
                            >
                                {l.label}
                            </a>
                        </li>
                    ))}
                </ul>
                <a
                    href="#passes"
                    className="hidden shrink-0 rounded-full bg-ay-saffron px-5 py-2 font-ay-sans text-sm font-semibold text-white transition-colors hover:bg-ay-saffron-bright md:inline-flex"
                >
                    पास चुनें
                </a>
            </div>
        </nav>
    )
}
