import Image from "next/image"
import Link from "next/link"
import { ArrowRight, CalendarDays, MapPin } from "lucide-react"
import { ayodhya2026 as event } from "@/content/events/ayodhya-2026"
import { ayodhyaFontVars } from "@/components/events/ayodhya/fonts"
import { SpotlightCountdown } from "./SpotlightCountdown"

export const spotlightHref = `/events/${event.slug}`

export function isSpotlightLive(now = Date.now()) {
    return now < new Date(event.endsAt).getTime()
}

export function SpotlightRibbon() {
    return (
        <Link
            href={spotlightHref}
            className="inline-flex max-w-full items-center gap-2.5 rounded-full border border-orange/30 bg-orange/10 py-1.5 pl-2 pr-4 text-sm font-bold text-[#7a2e00] transition-colors hover:bg-orange/15"
        >
            <span className="rounded-full bg-red-600 px-2.5 py-0.5 text-[11px] font-black uppercase tracking-wider text-white">Upcoming</span>
            <span className="truncate">Ayodhya · 26–27 Dec 2026</span>
            <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
        </Link>
    )
}

export function EventSpotlight() {
    return (
        <div className={`${ayodhyaFontVars} relative`}>
            <div className="relative isolate overflow-hidden rounded-[2rem] bg-[#1a0f08] shadow-[0_40px_80px_-30px_rgba(122,46,0,0.55)] ring-1 ring-black/5 sm:rounded-[2.5rem] lg:min-h-[36rem]">
                <Image
                    src={event.assets.hero}
                    alt="सूर्यास्त के समय सरयू तट से दिखता अयोध्या का श्रीराम मंदिर"
                    fill
                    priority
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="-z-20 object-cover object-[72%_center]"
                />
                <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#1a0f08] from-15% via-[#1a0f08]/55 to-transparent" />
                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#1a0f08]/70 to-transparent" />

                <div className="relative flex flex-col justify-between gap-6 p-5 sm:gap-8 sm:p-9 lg:min-h-[36rem]">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <span className="flagship-ribbon inline-flex items-center bg-red-600 px-5 py-2.5 text-sm sm:text-base font-black uppercase tracking-[0.22em] text-white shadow-[0_10px_24px_-8px_rgba(220,38,38,0.9)]">
                            Flagship Event
                        </span>
                        <span lang="hi" className="font-ay-sans text-sm font-semibold text-amber-200">
                            {event.occasion}
                        </span>
                    </div>

                    <div lang="hi">
                        <h2 className="font-ay-display text-[clamp(2.75rem,7vw,4.75rem)] font-normal leading-[1.1] tracking-normal bg-gradient-to-b from-ay-gold-light via-[#F7B65A] to-ay-saffron bg-clip-text text-transparent">
                            {event.title}
                        </h2>
                        <p className="mt-1 font-ay-serif text-xl sm:text-2xl font-bold text-white">{event.subtitle}</p>

                        <div className="mt-5 flex flex-col gap-2 font-ay-sans text-base sm:text-lg font-semibold text-white/95 sm:flex-row sm:gap-6">
                            <span className="flex items-center gap-2">
                                <CalendarDays className="h-5 w-5 shrink-0 text-orange-400" aria-hidden="true" />
                                {event.dateLabel}
                            </span>
                            <span className="flex items-center gap-2">
                                <MapPin className="h-5 w-5 shrink-0 text-orange-400" aria-hidden="true" />
                                {event.venueLabel}
                            </span>
                        </div>

                        <div className="mt-6 max-w-md">
                            <SpotlightCountdown target={event.startsAt} />
                        </div>

                        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                            <Link
                                href={`${spotlightHref}#passes`}
                                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-orange-600 px-7 py-4 text-sm font-black uppercase tracking-widest text-white shadow-[0_16px_32px_-12px_rgba(234,88,12,0.8)] transition-all hover:-translate-y-0.5 hover:bg-orange-500"
                            >
                                Book your pass
                                <ArrowRight className="h-4 w-4" aria-hidden="true" />
                            </Link>
                            <Link
                                href={spotlightHref}
                                className="inline-flex items-center justify-center rounded-2xl border-2 border-white/30 px-7 py-4 text-sm font-black uppercase tracking-widest text-white transition-colors hover:border-white hover:bg-white/10"
                            >
                                View event
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
