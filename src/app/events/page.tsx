import { Metadata } from "next"
import { getEvents } from "@/lib/data-source"
import { EventsPageClient } from "./EventsPageClient"

export const revalidate = 300

export const metadata: Metadata = {
    title: "Events | KGF Bharat",
    description: "Explore upcoming and past events hosted by KGF Bharat, including workshops, conferences, seminars, and the prestigious Dharmalankaran Awards.",
}

export default async function EventsPage() {
    const events = await getEvents()

    return <EventsPageClient events={events} />
}
