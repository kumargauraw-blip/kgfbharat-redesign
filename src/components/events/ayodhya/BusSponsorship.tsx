"use client"

import { useState } from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Ayodhya2026, BusMarker } from "@/content/events/ayodhya-2026"
import { formatINR } from "./format"
import { btn } from "./ui"
import { InquiryButton } from "./triggers"

const BODY = "var(--color-ay-road)"
const GLASS = "#F1E6CE"
const BRICK = "#9C4A2E"
const GOLD = "#A97C2F"
const TYRE = "#241F1A"

const MARKER_FILL: Record<BusMarker, string> = { 1: BRICK, 2: BRICK, 3: BRICK, 4: GOLD, 5: BODY }

function Marker({ n, x, y, active }: { n: BusMarker; x: number; y: number; active: BusMarker | null }) {
    const on = active === n
    return (
        <g className="transition-opacity duration-200" opacity={active && !on ? 0.35 : 1}>
            {on && <circle cx={x} cy={y} r="20" fill={MARKER_FILL[n]} opacity="0.25" />}
            <circle cx={x} cy={y} r={on ? 15 : 12} fill={MARKER_FILL[n]} stroke={on ? "#fff" : "none"} strokeWidth="2" />
            <text x={x} y={y + 4.5} textAnchor="middle" fontSize="13" fontWeight="700" fill={n === 4 ? TYRE : GLASS}>
                {n}
            </text>
        </g>
    )
}

function SideView({ active }: { active: BusMarker | null }) {
    return (
        <g>
            <rect x="30" y="90" width="430" height="120" rx="10" fill={BODY} />
            <path d="M460 90 h20 a10 10 0 0 1 10 10 v40 h-30 z" fill={BODY} />
            <g fill={GLASS} fillOpacity="0.85">
                {[55, 117, 179, 241, 303, 365].map((x) => (
                    <rect key={x} x={x} y="108" width="52" height="38" rx="3" />
                ))}
            </g>
            <rect x="50" y="103" width="372" height="48" rx="4" fill="none" stroke={GOLD} strokeWidth="3" strokeDasharray="6 4" />
            <rect x="30" y="160" width="430" height="30" fill={BRICK} />
            {[110, 390].map((cx) => (
                <g key={cx}>
                    <circle cx={cx} cy="212" r="24" fill={TYRE} />
                    <circle cx={cx} cy="212" r="9" fill={GLASS} />
                </g>
            ))}
            <line x1="60" y1="90" x2="60" y2="55" stroke={TYRE} strokeWidth="2" />
            <path d="M60 55 l34 12 -34 12 z" fill={GOLD} />
            <Marker n={2} x={20} y={175} active={active} />
            <Marker n={4} x={236} y={95} active={active} />
            <Marker n={5} x={95} y={45} active={active} />
        </g>
    )
}

function EndView({ view, active }: { view: "front" | "rear"; active: BusMarker | null }) {
    const front = view === "front"
    return (
        <g>
            <rect x="0" y="80" width="140" height="130" rx="14" fill={BODY} />
            <rect x="15" y="100" width="110" height="42" rx="6" fill={GLASS} fillOpacity={front ? 0.85 : 0.5} />
            <rect x="0" y={front ? 75 : 188} width="140" height="20" rx="4" fill={BRICK} />
            <rect x="22" y="195" width="20" height="34" rx="6" fill={TYRE} />
            <rect x="98" y="195" width="20" height="34" rx="6" fill={TYRE} />
            <Marker n={front ? 1 : 3} x={70} y={front ? 52 : 165} active={active} />
            <text x="70" y="252" textAnchor="middle" fontSize="13" fill="#5A5147">
                {front ? "आगे" : "पीछे"}
            </text>
        </g>
    )
}

function BusDiagram({ active }: { active: BusMarker | null }) {
    const label = "बस पर प्रायोजन स्थान: 1 पूरी बस (आगे), 2 साइड पैनल, 3 पीछे, 4 खिड़कियाँ/अंदरूनी, 5 फ्लैग-ऑफ"
    return (
        <>
            <svg viewBox="0 0 900 270" role="img" aria-label={label} className="hidden h-auto w-full font-ay-sans md:block">
                <line x1="10" y1="255" x2="890" y2="255" stroke={TYRE} strokeOpacity="0.15" />
                <SideView active={active} />
                <g transform="translate(560 0)">
                    <EndView view="front" active={active} />
                </g>
                <g transform="translate(740 0)">
                    <EndView view="rear" active={active} />
                </g>
            </svg>
            <div className="font-ay-sans md:hidden" role="img" aria-label={label}>
                <svg viewBox="0 0 500 270" aria-hidden="true" className="h-auto w-full">
                    <line x1="10" y1="255" x2="490" y2="255" stroke={TYRE} strokeOpacity="0.15" />
                    <SideView active={active} />
                </svg>
                <div className="mx-auto mt-2 grid max-w-xs grid-cols-2 gap-6">
                    {(["front", "rear"] as const).map((v) => (
                        <svg key={v} viewBox="-10 30 160 235" aria-hidden="true" className="h-auto w-full">
                            <EndView view={v} active={active} />
                        </svg>
                    ))}
                </div>
            </div>
        </>
    )
}

function SlotBadge({ n }: { n: BusMarker }) {
    return (
        <span
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-ay-sans text-sm font-bold"
            style={{ background: MARKER_FILL[n], color: n === 4 ? TYRE : GLASS }}
            aria-label={`चित्र में स्थान ${n}`}
        >
            {n}
        </span>
    )
}

function Price({ slot }: { slot: Ayodhya2026["bus"]["slots"][number] }) {
    return (
        <p className="font-ay-serif text-2xl font-bold text-ay-ink">
            {formatINR(slot.price)}
            {slot.priceSuffix && <span className="ml-1 font-ay-sans text-sm font-normal text-ay-ink-soft">/ {slot.priceSuffix}</span>}
        </p>
    )
}

function Benefits({ items }: { items: string[] }) {
    return (
        <ul className="space-y-2 font-ay-sans text-[15px] leading-relaxed text-ay-ink-soft">
            {items.map((b) => (
                <li key={b} className="flex gap-2">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-ay-saffron" aria-hidden="true" />
                    {b}
                </li>
            ))}
        </ul>
    )
}

export function BusSponsorship({ bus }: { bus: Ayodhya2026["bus"] }) {
    const [active, setActive] = useState<BusMarker | null>(null)
    const hover = (n: BusMarker) => ({
        onMouseEnter: () => setActive(n),
        onMouseLeave: () => setActive(null),
        onFocus: () => setActive(n),
        onBlur: () => setActive(null),
    })
    const grid = bus.slots.filter((s) => s.marker !== 5)
    const flag = bus.slots.find((s) => s.marker === 5)

    return (
        <div id="bus-sponsorship" className="mt-20 scroll-mt-32 bg-ay-road py-16 md:mt-28 md:py-20">
            <div className="container-custom">
                <p className="font-ay-sans text-sm font-semibold text-ay-gold-light">{bus.eyebrow}</p>
                <h3 className="mt-3 font-ay-serif text-[1.75rem] md:text-4xl font-bold leading-[1.3] tracking-normal text-ay-paper">{bus.heading}</h3>
                <p className="mt-3 font-ay-sans text-lg leading-relaxed text-ay-paper/75">{bus.sub}</p>

                <div className="mt-10 rounded-3xl bg-ay-paper p-5 md:p-10">
                    <BusDiagram active={active} />

                    <ul className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                        {grid.map((s) => (
                            <li
                                key={s.name}
                                {...hover(s.marker)}
                                className={cn(
                                    "flex flex-col rounded-2xl border bg-white p-6 transition-colors",
                                    active === s.marker ? "border-ay-saffron" : "border-ay-line",
                                )}
                            >
                                <div className="flex items-center justify-between gap-3">
                                    <SlotBadge n={s.marker} />
                                    <span className="rounded-full bg-ay-maroon/10 px-3 py-1 font-ay-sans text-xs font-semibold text-ay-maroon">{s.availability}</span>
                                </div>
                                <h4 className="mt-4 font-ay-serif text-lg font-semibold leading-snug tracking-normal text-ay-ink">{s.name}</h4>
                                <div className="mt-3">
                                    <Price slot={s} />
                                </div>
                                <div className="mt-4 flex-1 border-t border-ay-line pt-4">
                                    <Benefits items={s.benefits} />
                                </div>
                                <InquiryButton item={s.name} group="bus" className={`${btn.inkOutline} mt-6 w-full font-ay-sans`}>
                                    यह स्लॉट आरक्षित करें →
                                </InquiryButton>
                            </li>
                        ))}
                    </ul>

                    {flag && (
                        <article
                            {...hover(flag.marker)}
                            className={cn(
                                "mt-5 grid gap-6 rounded-2xl border bg-ay-maroon-deep p-6 text-ay-paper transition-colors md:p-8 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:items-center",
                                active === flag.marker ? "border-ay-saffron" : "border-transparent",
                            )}
                        >
                            <div>
                                <div className="flex flex-wrap items-center gap-3 font-ay-sans">
                                    <SlotBadge n={flag.marker} />
                                    <span className="rounded-full bg-ay-gold px-3 py-1 text-xs font-semibold text-ay-night">EXCLUSIVE</span>
                                    <span className="text-sm font-semibold text-ay-gold-light">फ्लैग-ऑफ प्रायोजक · {flag.availability}</span>
                                </div>
                                <h4 className="mt-4 font-ay-serif text-2xl font-semibold tracking-normal text-ay-paper">{flag.name}</h4>
                                <ul className="mt-4 space-y-2 font-ay-sans text-[15px] leading-relaxed text-ay-paper/85">
                                    {flag.benefits.map((b) => (
                                        <li key={b} className="flex gap-2">
                                            <Check className="mt-1 h-4 w-4 shrink-0 text-ay-gold" aria-hidden="true" />
                                            {b}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="flex flex-col gap-5 lg:items-end">
                                <p className="font-ay-serif text-4xl font-bold">{formatINR(flag.price)}</p>
                                <InquiryButton item={flag.name} group="bus" className={`${btn.primary} font-ay-sans`}>
                                    यह स्लॉट आरक्षित करें →
                                </InquiryButton>
                            </div>
                        </article>
                    )}
                </div>
            </div>
        </div>
    )
}
