import { MapPin, Navigation } from "lucide-react"
import type { Ayodhya2026 } from "@/content/events/ayodhya-2026"
import { SectionHead, btn } from "./ui"

export function Venue({ event }: { event: Ayodhya2026 }) {
    const { venue } = event
    return (
        <section id="venue" className="scroll-mt-32 bg-ay-paper-2 py-20 md:py-28">
            <div className="container-custom grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:items-center">
                <div>
                    <SectionHead eyebrow={venue.eyebrow} title={venue.heading} className="mb-6 md:mb-8" />
                    <h3 className="flex gap-3 font-ay-serif text-xl font-semibold leading-snug tracking-normal text-ay-ink">
                        <MapPin className="mt-1 h-5 w-5 shrink-0 text-ay-saffron" aria-hidden="true" />
                        <span>
                            {venue.title}
                            <br />
                            {venue.name}
                        </span>
                    </h3>
                    <div className="mt-5 space-y-3 border-t border-ay-line pt-5 font-ay-sans text-[16px] leading-relaxed text-ay-ink-soft">
                        {venue.paragraphs.map((p) => (
                            <p key={p.slice(0, 24)}>{p}</p>
                        ))}
                    </div>
                    <a href={event.links.directions} target="_blank" rel="noopener noreferrer" className={`${btn.inkOutline} mt-8 font-ay-sans`}>
                        <Navigation className="h-4 w-4" aria-hidden="true" />
                        दिशा-निर्देश पाएं ↗
                    </a>
                </div>
                <div className="overflow-hidden rounded-3xl border border-ay-line bg-ay-paper">
                    <iframe
                        src={event.links.mapEmbed}
                        title="होटल शान-ए-अवध, अयोध्या — मानचित्र"
                        className="aspect-[4/3] w-full md:aspect-[16/11]"
                        loading="lazy"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                    />
                </div>
            </div>
        </section>
    )
}

export function Donate({ event }: { event: Ayodhya2026 }) {
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-ay-maroon via-ay-maroon-deep to-ay-night py-16 md:py-20">
            <div aria-hidden="true" className="absolute -right-24 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-ay-saffron/25 blur-3xl" />
            <div className="container-custom relative flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
                <div className="max-w-2xl">
                    <p className="font-ay-sans text-sm font-semibold text-ay-gold">{event.donate.eyebrow}</p>
                    <h2 className="mt-3 font-ay-serif text-[1.75rem] md:text-4xl font-bold leading-[1.3] tracking-normal text-ay-paper">
                        {event.donate.heading}
                    </h2>
                    <p className="mt-4 font-ay-sans text-lg leading-relaxed text-ay-paper/80">{event.donate.text}</p>
                </div>
                <a href={event.links.donate} target="_blank" rel="noopener noreferrer" className={`${btn.primary} shrink-0 px-8 py-4 text-base font-ay-sans`}>
                    {event.donate.cta}
                </a>
            </div>
        </section>
    )
}

export function Faq({ event }: { event: Ayodhya2026 }) {
    const { contact } = event
    return (
        <section id="faq" className="scroll-mt-32 bg-ay-paper py-20 md:py-28">
            <div className="container-custom grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)]">
                <div>
                    <SectionHead eyebrow="सामान्य प्रश्न" title="बुक करने से पहले" className="mb-6" />
                    <div className="rounded-2xl bg-ay-paper-2 p-6 font-ay-sans text-[16px] leading-relaxed text-ay-ink-soft">
                        <p className="font-semibold text-ay-ink">और कोई प्रश्न?</p>
                        <p className="mt-2">
                            <a href={`mailto:${contact.email}`} className="text-ay-maroon underline decoration-ay-gold underline-offset-4 hover:text-ay-saffron">
                                {contact.email}
                            </a>
                        </p>
                        <p>
                            <a href={contact.phoneHref} className="text-ay-maroon underline decoration-ay-gold underline-offset-4 hover:text-ay-saffron">
                                {contact.phone}
                            </a>
                        </p>
                        <p className="mt-1 text-sm">{contact.hours}</p>
                    </div>
                </div>
                <div className="divide-y divide-ay-line border-y border-ay-line">
                    {event.faq.map((f, i) => (
                        <details key={f.q} className="group py-5" open={i === 0}>
                            <summary className="flex cursor-pointer list-none items-start justify-between gap-6 font-ay-serif text-xl font-semibold leading-snug text-ay-ink [&::-webkit-details-marker]:hidden">
                                {f.q}
                                <span
                                    aria-hidden="true"
                                    className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-ay-line font-ay-sans text-lg text-ay-saffron transition-transform group-open:rotate-45"
                                >
                                    +
                                </span>
                            </summary>
                            <p className="mt-3 pr-12 font-ay-sans text-[17px] leading-relaxed text-ay-ink-soft">{f.a}</p>
                        </details>
                    ))}
                </div>
            </div>
        </section>
    )
}
