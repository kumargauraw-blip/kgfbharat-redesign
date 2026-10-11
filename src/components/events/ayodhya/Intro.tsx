import Image from "next/image"
import type { Ayodhya2026 } from "@/content/events/ayodhya-2026"
import { Ornament } from "./ui"

export function Intro({ event }: { event: Ayodhya2026 }) {
    const { intro, stats, highlights } = event
    return (
        <section id="about" className="scroll-mt-32 bg-ay-paper py-20 md:py-28">
            <div className="container-custom">
                <div className="grid gap-12 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:gap-20">
                    <div>
                        <p className="mb-3 font-ay-sans text-sm font-semibold tracking-wide text-ay-saffron">आयोजन क्यों?</p>
                        <h2 className="font-ay-serif text-[1.85rem] md:text-[2.6rem] font-bold leading-[1.3] tracking-normal text-ay-ink">
                            {intro.heading}
                        </h2>
                        <Ornament className="mt-5" />
                        <p className="mt-6 font-ay-sans text-xl leading-relaxed text-ay-ink">{intro.lead}</p>
                        {intro.paragraphs.map((p) => (
                            <p key={p.slice(0, 24)} className="mt-4 font-ay-sans text-lg leading-relaxed text-ay-ink-soft">
                                {p}
                            </p>
                        ))}
                    </div>

                    <div className="flex flex-col gap-4 self-center">
                        {intro.days.map((d, i) => (
                            <div
                                key={d.day}
                                className="relative overflow-hidden rounded-2xl bg-ay-maroon-deep p-7 text-ay-paper"
                            >
                                <span
                                    aria-hidden="true"
                                    className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 font-ay-display text-[5.5rem] leading-none text-ay-gold/15"
                                >
                                    {i + 1}
                                </span>
                                <p className="font-ay-sans text-sm text-ay-gold-light">
                                    {d.day} · {d.date} 2026
                                </p>
                                <p className="mt-2 pr-16 font-ay-serif text-2xl font-semibold leading-snug">{d.theme}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <figure className="mt-16 md:mt-20">
                    <Image
                        src={event.assets.banner}
                        alt={intro.bannerCaption}
                        width={1600}
                        height={900}
                        sizes="(min-width: 1700px) 1600px, 100vw"
                        className="h-auto w-full rounded-3xl"
                    />
                    <figcaption className="mt-3 text-center font-ay-sans text-[15px] text-ay-ink-soft">{intro.bannerCaption}</figcaption>
                </figure>

                <dl className="mt-16 grid grid-cols-2 gap-y-8 border-y border-ay-line py-8 md:mt-20 md:grid-cols-4">
                    {stats.map((s) => (
                        <div key={s.label} className="px-2 md:border-l md:border-ay-line md:px-6 md:first:border-l-0">
                            <dt className="sr-only">{s.label}</dt>
                            <dd className="font-ay-serif text-3xl md:text-4xl font-bold text-ay-maroon">{s.value}</dd>
                            <dd className="mt-1 font-ay-sans text-[15px] text-ay-ink-soft">{s.label}</dd>
                        </div>
                    ))}
                </dl>

                <div className="mt-16 grid gap-x-12 gap-y-10 md:mt-20 md:grid-cols-2">
                    {highlights.map((h, i) => (
                        <div key={h.title} className="flex gap-5">
                            <span className="font-ay-display text-3xl leading-none text-ay-gold" aria-hidden="true">
                                {String(i + 1).padStart(2, "0")}
                            </span>
                            <div>
                                <h3 className="font-ay-serif text-xl font-semibold tracking-normal text-ay-ink">{h.title}</h3>
                                <p className="mt-2 font-ay-sans text-[17px] leading-relaxed text-ay-ink-soft">{h.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
