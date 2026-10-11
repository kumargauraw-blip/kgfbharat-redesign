"use client"

import { useRef, useState } from "react"
import { cn } from "@/lib/utils"
import type { Ayodhya2026, ScheduleItem } from "@/content/events/ayodhya-2026"
import { SectionHead, btn } from "./ui"

const MUTED: ScheduleItem["kind"][] = ["meal", "welcome"]

export function Schedule({
    heading,
    schedule,
    dateLabel,
    venueLabel,
}: {
    heading: string
    schedule: Ayodhya2026["schedule"]
    dateLabel: string
    venueLabel: string
}) {
    const [active, setActive] = useState(0)
    const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

    const onKeyDown = (e: React.KeyboardEvent) => {
        if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return
        e.preventDefault()
        const next = (active + (e.key === "ArrowRight" ? 1 : -1) + schedule.length) % schedule.length
        setActive(next)
        tabRefs.current[next]?.focus()
    }

    const day = schedule[active]

    return (
        <section id="schedule" className="scroll-mt-32 bg-ay-paper pb-20 md:pb-28">
            <div className="container-custom border-t border-ay-line pt-20 md:pt-28">
                <SectionHead eyebrow="सत्र एवं मुख्य रूपरेखा" title={heading} />

                <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_20rem] xl:gap-20">
                    <div>
                        <div role="tablist" aria-label="दिन चुनें" className="grid gap-3 sm:grid-cols-2" onKeyDown={onKeyDown}>
                            {schedule.map((d, i) => (
                                <button
                                    key={d.day}
                                    ref={(el) => {
                                        tabRefs.current[i] = el
                                    }}
                                    role="tab"
                                    id={`day-tab-${i}`}
                                    aria-selected={active === i}
                                    aria-controls={`day-panel-${i}`}
                                    tabIndex={active === i ? 0 : -1}
                                    onClick={() => setActive(i)}
                                    className={cn(
                                        "rounded-2xl border px-6 py-4 text-left font-ay-sans transition-colors",
                                        active === i
                                            ? "border-ay-maroon bg-ay-maroon-deep text-ay-paper"
                                            : "border-ay-line bg-ay-paper text-ay-ink hover:border-ay-saffron",
                                    )}
                                >
                                    <span className={cn("block text-sm", active === i ? "text-ay-gold-light" : "text-ay-saffron")}>
                                        {d.day} · {d.date}
                                    </span>
                                    <span className="mt-1 block font-ay-serif text-lg font-semibold leading-snug">{d.theme}</span>
                                </button>
                            ))}
                        </div>

                        <ol role="tabpanel" id={`day-panel-${active}`} aria-labelledby={`day-tab-${active}`} className="relative mt-10">
                            <span aria-hidden="true" className="absolute bottom-3 left-[7px] top-3 w-px bg-ay-line md:left-[11.5rem]" />
                            {day.items.map((item) => {
                                const muted = MUTED.includes(item.kind)
                                return (
                                    <li
                                        key={item.time + item.title}
                                        className="relative grid gap-1 pb-8 pl-8 md:grid-cols-[10.5rem_minmax(0,1fr)] md:gap-10 md:pl-0"
                                    >
                                        <span
                                            aria-hidden="true"
                                            className={cn(
                                                "absolute left-0 top-1.5 h-[15px] w-[15px] rounded-full border-2 md:left-[11rem]",
                                                muted ? "border-ay-line bg-ay-paper" : "border-ay-saffron bg-ay-saffron/20",
                                            )}
                                        />
                                        <p className="font-ay-sans text-[15px] font-semibold tabular-nums text-ay-ink-soft md:pt-0.5 md:text-right">
                                            {item.time}
                                        </p>
                                        <div className="md:pl-8">
                                            <p className={cn("font-ay-sans text-xs font-semibold", muted ? "text-ay-ink-soft/70" : "text-ay-saffron")}>
                                                {item.tag}
                                            </p>
                                            <h3
                                                className={cn(
                                                    "mt-1 font-ay-serif font-semibold leading-snug tracking-normal",
                                                    muted ? "text-lg text-ay-ink-soft" : "text-xl text-ay-ink",
                                                )}
                                            >
                                                {item.title}
                                            </h3>
                                            <p className="mt-1.5 font-ay-sans text-[17px] leading-relaxed text-ay-ink-soft">{item.description}</p>
                                        </div>
                                    </li>
                                )
                            })}
                        </ol>
                    </div>

                    <aside className="self-start rounded-3xl bg-ay-maroon-deep p-7 font-ay-sans text-ay-paper lg:sticky lg:top-36">
                        <p className="text-sm font-semibold text-ay-gold">एक नज़र में</p>
                        <dl className="mt-5 space-y-4 text-[15px]">
                            {[
                                ["तिथि", dateLabel],
                                ["स्थल", venueLabel],
                                ["प्रारूप", "आवासीय एवं डे-डेलिगेट पास"],
                            ].map(([k, v]) => (
                                <div key={k} className="border-b border-white/10 pb-4">
                                    <dt className="text-ay-paper/60">{k}</dt>
                                    <dd className="mt-0.5 font-semibold">{v}</dd>
                                </div>
                            ))}
                        </dl>
                        <p className="mt-4 text-sm leading-relaxed text-ay-paper/60">समय-सारिणी में आवश्यकतानुसार परिवर्तन संभव है।</p>
                        <a href="#passes" className={cn(btn.primary, "mt-6 w-full")}>
                            पास चुनें →
                        </a>
                    </aside>
                </div>
            </div>
        </section>
    )
}
