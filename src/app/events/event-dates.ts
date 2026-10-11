import type { Event } from "@/lib/types"

const DAY_MS = 86_400_000
const TZ = "Asia/Kolkata"

function parse(value?: string): Date | null {
    if (!value) return null
    const iso = /^\d{8}$/.test(value) ? `${value.slice(0, 4)}-${value.slice(4, 6)}-${value.slice(6, 8)}` : value
    const d = /^\d{4}-\d{2}-\d{2}$/.test(iso) ? new Date(`${iso}T00:00:00+05:30`) : new Date(iso)
    return Number.isNaN(d.getTime()) ? null : d
}

function part(d: Date, opts: Intl.DateTimeFormatOptions) {
    return d.toLocaleDateString("en-IN", { timeZone: TZ, ...opts })
}

export function currentTime() {
    return Date.now()
}

export function eventDates(event: Event) {
    const start = parse(event.date)
    const end = parse(event.endDate) ?? start
    return { start, end }
}

export function isUpcomingEvent(event: Event, now: number) {
    const { end } = eventDates(event)
    if (!end) return event.category === "upcoming" || event.type === "upcoming"
    return end.getTime() + DAY_MS > now
}

export function daysUntil(event: Event, now: number) {
    const { start } = eventDates(event)
    if (!start) return null
    return Math.ceil((start.getTime() - now) / DAY_MS)
}

export function dateRangeLabel(event: Event) {
    const { start, end } = eventDates(event)
    if (!start) return ""
    const full = (d: Date) => part(d, { day: "numeric", month: "long", year: "numeric" })
    if (!end || part(start, { dateStyle: "short" }) === part(end, { dateStyle: "short" })) return full(start)
    const sameMonth = part(start, { month: "long", year: "numeric" }) === part(end, { month: "long", year: "numeric" })
    if (sameMonth) return `${part(start, { day: "numeric" })}–${full(end)}`
    return `${part(start, { day: "numeric", month: "short", year: "numeric" })} – ${part(end, { day: "numeric", month: "short", year: "numeric" })}`
}

export function dateBlock(event: Event) {
    const { start, end } = eventDates(event)
    if (!start) return null
    const sd = part(start, { day: "numeric" })
    const ed = end ? part(end, { day: "numeric" }) : sd
    const sameMonth = !end || part(start, { month: "short" }) === part(end, { month: "short" })
    return {
        month: part(start, { month: "short" }).toUpperCase(),
        days: sameMonth && sd !== ed ? `${sd}–${ed}` : sd,
        year: part(start, { year: "numeric" }),
    }
}
