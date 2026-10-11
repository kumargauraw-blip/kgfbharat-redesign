import { cn } from "@/lib/utils"
import type { Ayodhya2026 } from "@/content/events/ayodhya-2026"
import { SectionHead } from "./ui"

/** Road centre-line x-positions (0–130) at each row boundary; one more than the number of milestones. */
const ROAD_X = [65, 88, 96, 78, 46, 34, 52, 65]

function RoadSegment({ from, to, last }: { from: number; to: number; last: boolean }) {
    const d = `M${from},0 C${from},50 ${to},50 ${to},100`
    return (
        <svg viewBox="0 0 130 100" preserveAspectRatio="none" aria-hidden="true" className="absolute inset-x-0 -top-px h-[calc(100%+2px)] w-full overflow-visible">
            <path
                d={d}
                fill="none"
                stroke="var(--color-ay-road)"
                strokeLinecap={last ? "round" : "butt"}
                vectorEffect="non-scaling-stroke"
                className="[stroke-width:26px] md:[stroke-width:36px]"
            />
            <path
                d={d}
                fill="none"
                stroke="var(--color-ay-gold)"
                strokeWidth="2"
                strokeDasharray="10 10"
                vectorEffect="non-scaling-stroke"
            />
        </svg>
    )
}

export function History({ heading, history }: { heading: string; history: Ayodhya2026["history"] }) {
    return (
        <section className="bg-ay-paper-2 py-20 md:py-28">
            <div className="container-custom">
                <SectionHead eyebrow="राम मंदिर यात्रा" title={heading} align="center" />

                <ol className="mx-auto max-w-5xl" aria-label="रामजन्मभूमि इतिहास की समयरेखा">
                    {history.map((h, i) => {
                        const current = "current" in h && h.current
                        const from = ROAD_X[i]
                        const to = ROAD_X[i + 1]
                        const markerX = ((from + to) / 2 / 130) * 100
                        const left = i % 2 === 0
                        return (
                            <li key={h.year} className="grid grid-cols-[4.5rem_minmax(0,1fr)] md:grid-cols-[minmax(0,1fr)_8.125rem_minmax(0,1fr)]">
                                <div className="relative col-start-1 row-start-1 min-h-40 md:col-start-2">
                                    <RoadSegment from={from} to={to} last={i === history.length - 1} />
                                    <span
                                        className={cn(
                                            "absolute top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[3px] border-ay-paper font-ay-sans font-bold tabular-nums text-white shadow-[0_6px_16px_-6px_rgba(0,0,0,0.45)]",
                                            current ? "h-14 w-14 bg-ay-saffron text-[13px] md:h-16 md:w-16 md:text-sm" : "h-12 w-12 bg-ay-maroon text-xs md:h-14 md:w-14 md:text-[13px]",
                                        )}
                                        style={{ left: `${markerX}%` }}
                                        aria-hidden="true"
                                    >
                                        {h.year}
                                    </span>
                                </div>

                                <div
                                    className={cn(
                                        "col-start-2 row-start-1 self-center py-6 pl-4 md:py-8",
                                        left ? "md:col-start-1 md:pl-0 md:pr-10 md:text-right" : "md:col-start-3 md:pl-10",
                                    )}
                                >
                                    <p className={cn("font-ay-sans text-sm font-bold tabular-nums", current ? "text-ay-saffron" : "text-ay-maroon")}>
                                        {current ? `${h.year} · इस वर्ष` : h.year}
                                    </p>
                                    <h3 className="mt-1 font-ay-serif text-xl md:text-2xl font-semibold leading-snug tracking-normal text-ay-ink">{h.title}</h3>
                                    <p className={cn("mt-2 font-ay-sans text-[16px] leading-relaxed text-ay-ink-soft", left && "md:ml-auto", "max-w-md")}>
                                        {h.text}
                                    </p>
                                </div>
                            </li>
                        )
                    })}
                </ol>
            </div>
        </section>
    )
}
