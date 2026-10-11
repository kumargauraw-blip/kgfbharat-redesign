import Link from "next/link"
import { ArrowRight, CalendarDays, Clock, MapPin } from "lucide-react"
import type { Event } from "@/lib/types"
import { EventPoster, posterSrc } from "./EventPoster"
import { dateBlock, dateRangeLabel, daysUntil, eventDates, isUpcomingEvent } from "./event-dates"

const STATUS_WORDS = new Set(["upcoming", "past", "completed", "ongoing", "cancelled", "other"])

function topicLabel(event: Event) {
    const topic = [event.type, event.category].find((v) => v && !STATUS_WORDS.has(v))
    return topic ? topic.charAt(0).toUpperCase() + topic.slice(1) : null
}

function countdownLabel(days: number | null) {
    if (days === null) return null
    if (days <= 0) return "Happening now"
    if (days === 1) return "Starts tomorrow"
    return `${days} days to go`
}

function SectionHeading({ eyebrow, title, count }: { eyebrow: string; title: string; count: number }) {
    return (
        <div className="mb-8 flex items-end justify-between gap-4 border-b border-gray-200 pb-5">
            <div>
                <p className="mb-2 text-xs font-black uppercase tracking-[0.3em] text-orange">{eyebrow}</p>
                <h2 className="text-3xl md:text-4xl font-black tracking-tight text-[#111827]">{title}</h2>
            </div>
            <span className="shrink-0 rounded-full bg-gray-100 px-4 py-1.5 text-sm font-bold text-gray-600">
                {count} {count === 1 ? "event" : "events"}
            </span>
        </div>
    )
}

function FeaturedEvent({ event, now }: { event: Event; now: number }) {
    const block = dateBlock(event)
    const countdown = countdownLabel(daysUntil(event, now))
    const topic = topicLabel(event)

    return (
        <Link
            href={`/events/${event.slug}`}
            className="group block overflow-hidden rounded-[2rem] bg-[#111827] text-white shadow-[0_40px_80px_-30px_rgba(17,24,39,0.6)] ring-1 ring-black/5 transition-transform duration-300 hover:-translate-y-1"
        >
            <EventPoster src={posterSrc(event.slug, event.imageUrl)} alt={event.title} priority sizes="(min-width: 1700px) 1600px, 100vw" />

            <div className="grid gap-6 p-6 sm:p-8 md:grid-cols-[auto_1fr_auto] md:items-center md:gap-8 lg:p-10">
                {block && (
                    <div className="flex w-fit items-center gap-4 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 px-5 py-4 md:flex-col md:gap-0 md:px-6 md:text-center">
                        <span className="text-sm font-black tracking-[0.25em] text-white/85">{block.month}</span>
                        <span className="text-3xl md:text-4xl font-black leading-tight">{block.days}</span>
                        <span className="text-sm font-bold text-white/85">{block.year}</span>
                    </div>
                )}

                <div className="min-w-0">
                    <div className="mb-3 flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-red-600 px-3 py-1 text-xs font-black uppercase tracking-wider">Next up</span>
                        {countdown && (
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-200">
                                <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                                {countdown}
                            </span>
                        )}
                        {topic && <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white/80">{topic}</span>}
                    </div>
                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-black leading-snug transition-colors group-hover:text-orange-300">{event.title}</h3>
                    {event.description && <p className="mt-3 line-clamp-2 text-base md:text-lg leading-relaxed text-gray-300">{event.description}</p>}
                    {event.location && (
                        <p className="mt-4 flex items-center gap-2 font-semibold text-white/90">
                            <MapPin className="h-5 w-5 shrink-0 text-orange-400" aria-hidden="true" />
                            {event.location}
                        </p>
                    )}
                </div>

                <span className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-red-600 px-8 py-4 text-sm font-black uppercase tracking-widest shadow-lg shadow-red-600/30 transition-all group-hover:gap-3 group-hover:bg-red-500 md:w-auto">
                    View event
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
            </div>
        </Link>
    )
}

function EventCard({ event, now, past }: { event: Event; now: number; past?: boolean }) {
    const countdown = past ? null : countdownLabel(daysUntil(event, now))
    const topic = topicLabel(event)

    return (
        <Link
            href={`/events/${event.slug}`}
            className="group flex flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange/30 hover:shadow-xl"
        >
            <div className="relative">
                <EventPoster src={posterSrc(event.slug, event.imageUrl)} alt={event.title} sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" />
                <span className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-black uppercase tracking-wider ${past ? "bg-white/90 text-gray-800" : "bg-red-600 text-white"}`}>
                    {past ? "Past event" : (countdown ?? "Upcoming")}
                </span>
            </div>
            <div className="flex flex-1 flex-col p-6">
                <p className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-bold text-orange">
                    <span className="flex items-center gap-1.5">
                        <CalendarDays className="h-4 w-4" aria-hidden="true" />
                        {dateRangeLabel(event)}
                    </span>
                    {topic && <span className="text-gray-400">· {topic}</span>}
                </p>
                <h3 className="line-clamp-2 text-xl font-black leading-snug text-[#111827] transition-colors group-hover:text-orange">{event.title}</h3>
                {event.location && (
                    <p className="mt-3 flex items-start gap-2 text-sm font-medium text-gray-500">
                        <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                        {event.location}
                    </p>
                )}
                <span className="mt-auto flex items-center gap-2 pt-6 text-sm font-black uppercase tracking-wider text-[#111827] transition-all group-hover:gap-3 group-hover:text-orange">
                    {past ? "See highlights" : "View event"}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
            </div>
        </Link>
    )
}

export function EventsListing({ events, now }: { events: Event[]; now: number }) {
    const time = (e: Event) => eventDates(e).start?.getTime() ?? 0
    const upcoming = events.filter((e) => isUpcomingEvent(e, now)).sort((a, b) => time(a) - time(b))
    const past = events.filter((e) => !isUpcomingEvent(e, now)).sort((a, b) => time(b) - time(a))
    const [next, ...laterUpcoming] = upcoming

    return (
        <div className="min-h-screen bg-white">
            <div className="border-b border-orange/15 bg-[#fff7ed] pt-16 pb-14">
                <div className="container-custom">
                    <p className="mb-3 text-xs font-black uppercase tracking-[0.3em] text-orange">Workshops · Seminars · Awards</p>
                    <h1 className="text-5xl md:text-7xl font-black leading-[1.05] tracking-tight text-[#111827]">Events</h1>
                    <p className="mt-5 text-lg md:text-xl font-medium leading-relaxed text-gray-600">
                        Gatherings that bring thought leaders, technologists, and educators together — from the classroom to the national stage.
                    </p>
                </div>
            </div>

            <div className="container-custom space-y-20 py-16 pb-24">
                {next ? (
                    <section aria-label="Next event">
                        <FeaturedEvent event={next} now={now} />
                    </section>
                ) : (
                    <div className="rounded-[2rem] border border-dashed border-orange/40 bg-orange-50/60 px-8 py-14 text-center">
                        <p className="text-2xl font-black text-[#111827]">New events are being planned</p>
                        <p className="mt-2 text-gray-600">Check back soon, or browse our past events below.</p>
                    </div>
                )}

                {laterUpcoming.length > 0 && (
                    <section>
                        <SectionHeading eyebrow="Mark your calendar" title="More upcoming events" count={laterUpcoming.length} />
                        <div className={laterUpcoming.length === 1 ? "max-w-md" : "grid gap-8 md:grid-cols-2 lg:grid-cols-3"}>
                            {laterUpcoming.map((e) => (
                                <EventCard key={e.id} event={e} now={now} />
                            ))}
                        </div>
                    </section>
                )}

                {past.length > 0 && (
                    <section>
                        <SectionHeading eyebrow="Archive" title="Past events" count={past.length} />
                        <div className={past.length === 1 ? "max-w-md" : "grid gap-8 md:grid-cols-2 lg:grid-cols-3"}>
                            {past.map((e) => (
                                <EventCard key={e.id} event={e} now={now} past />
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    )
}
