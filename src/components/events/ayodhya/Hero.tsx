import Image from "next/image"
import { CalendarDays, MapPin } from "lucide-react"
import type { Ayodhya2026 } from "@/content/events/ayodhya-2026"
import { Countdown } from "./Countdown"
import { btn } from "./ui"

export function Hero({ event }: { event: Ayodhya2026 }) {
    return (
        <header className="relative isolate overflow-hidden bg-ay-night">
            <Image
                src={event.assets.hero}
                alt="सूर्यास्त के समय सरयू तट से दिखता अयोध्या का श्रीराम मंदिर"
                fill
                priority
                sizes="100vw"
                className="-z-20 object-cover object-[70%_center]"
            />
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ay-night/95 via-ay-night/70 to-ay-night/0 md:via-ay-night/55" />
            <div className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-t from-ay-night via-ay-night/60 to-transparent" />

            <div className="container-custom flex min-h-[calc(100svh-7rem)] flex-col justify-between gap-12 pt-16 pb-10 md:pt-24 lg:min-h-[44rem]">
                <div className="max-w-2xl motion-safe:animate-[fade-in_700ms_cubic-bezier(0.22,1,0.36,1)_both]">
                    <p className="font-ay-sans text-sm sm:text-base font-medium text-ay-gold-light">{event.presenter}</p>
                    <p className="mt-3 inline-block rounded-full border border-ay-gold/40 bg-ay-maroon-deep/60 px-4 py-1.5 font-ay-sans text-sm text-ay-paper/90 backdrop-blur-sm">
                        {event.occasion}
                    </p>

                    <h1 className="mt-6 font-ay-display text-[3.4rem] sm:text-7xl lg:text-[5.75rem] font-normal leading-[1.15] tracking-normal [overflow-wrap:anywhere] bg-gradient-to-b from-ay-gold-light via-[#F7B65A] to-ay-saffron bg-clip-text text-transparent drop-shadow-[0_2px_18px_rgba(0,0,0,0.35)]">
                        {event.title}
                    </h1>
                    <p className="mt-2 font-ay-serif text-2xl sm:text-3xl font-semibold leading-snug text-ay-paper">
                        {event.subtitle}
                    </p>

                    <p className="mt-5 font-ay-sans text-[15px] tracking-wide text-ay-gold-light/90">
                        {event.themes.join("  •  ")}
                    </p>

                    <div className="mt-7 flex flex-col gap-3 font-ay-sans text-lg text-ay-paper sm:flex-row sm:gap-8">
                        <span className="flex items-center gap-2.5">
                            <CalendarDays className="h-5 w-5 text-ay-saffron-bright" aria-hidden="true" />
                            {event.dateLabel}
                        </span>
                        <span className="flex items-center gap-2.5">
                            <MapPin className="h-5 w-5 text-ay-saffron-bright" aria-hidden="true" />
                            {event.venueLabel}
                        </span>
                    </div>

                    <div className="mt-9 flex flex-wrap gap-3 font-ay-sans">
                        <a href="#passes" className={btn.primary}>
                            {event.heroCta}
                        </a>
                        <a href="#sponsorship" className={btn.goldOutline}>
                            प्रायोजक बनें
                        </a>
                    </div>
                </div>

                <div className="flex flex-col gap-4 border-t border-ay-gold/25 pt-6 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="mb-3 font-ay-sans text-sm text-ay-paper/70">संगोष्ठी आरंभ होने में</p>
                        <Countdown target={event.startsAt} />
                    </div>
                    <p className="max-w-sm font-ay-sans text-[15px] leading-relaxed text-ay-paper/70">
                        {event.intro.days.map((d) => `${d.date} — ${d.theme}`).join(" • ")}
                    </p>
                </div>
            </div>
        </header>
    )
}
