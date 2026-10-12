import { ayodhya2026 as event } from "@/content/events/ayodhya-2026"
import { ayodhyaFontVars } from "./fonts"
import { Hero } from "./Hero"
import { EventSubnav } from "./EventSubnav"
import { Intro } from "./Intro"
import { Schedule } from "./Schedule"
import { Speakers } from "./Speakers"
import { Book } from "./Book"
import { History } from "./History"
import { Passes } from "./Passes"
import { Sponsorship } from "./Sponsorship"
import { Gallery } from "./Gallery"
import { Venue, Donate, Faq } from "./Venue"
import { StickyPassBar } from "./StickyPassBar"
import { InquiryDialog } from "./InquiryDialog"

const SITE = "https://www.kgfbharat.org"

function jsonLd() {
    const passes = [event.vipPass, ...event.residentialPasses, ...event.dayPasses]
    return {
        "@context": "https://schema.org",
        "@type": "Event",
        name: `${event.title} — ${event.subtitle}`,
        description: event.meta.description,
        inLanguage: "hi",
        startDate: event.startsAt,
        endDate: event.endsAt,
        eventStatus: "https://schema.org/EventScheduled",
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        image: [`${SITE}${event.meta.ogImage}`],
        url: `${SITE}/events/${event.slug}`,
        location: {
            "@type": "Place",
            name: "होटल शान-ए-अवध",
            address: {
                "@type": "PostalAddress",
                streetAddress: event.venue.address,
                addressLocality: "अयोध्या",
                addressRegion: "उत्तर प्रदेश",
                addressCountry: "IN",
            },
        },
        organizer: { "@type": "Organization", name: "Kurukshetra Gurukulam Foundation", url: SITE },
        offers: passes.map((p) => ({
            "@type": "Offer",
            name: p.name,
            price: p.price,
            priceCurrency: "INR",
            url: p.href,
            availability: "https://schema.org/InStock",
        })),
    }
}

export function AyodhyaPage() {
    return (
        <div lang="hi" className={`${ayodhyaFontVars} bg-ay-paper font-ay-sans text-ay-ink`}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }}
            />
            <Hero event={event} />
            <EventSubnav />
            <Intro event={event} />
            <Schedule heading={event.scheduleHeading} schedule={event.schedule} dateLabel={event.dateLabel} venueLabel={event.venueLabel} />
            <Speakers event={event} />
            <Book event={event} />
            <History heading={event.historyHeading} history={event.history} />
            <Passes event={event} />
            <Sponsorship event={event} />
            <Gallery intro={event.galleryIntro} photos={event.gallery} previousEditions={event.links.previousEditions} />
            <Venue event={event} />
            <Donate event={event} />
            <Faq event={event} />
            <StickyPassBar />
            <InquiryDialog
                sponsorOptions={[event.sponsorship.title, ...event.sponsorship.tiers].map(({ name, price }) => ({ name, price }))}
                busOptions={event.bus.slots.map(({ name, price }) => ({ name, price }))}
                terms={event.terms}
            />
        </div>
    )
}
