import { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Calendar, MapPin, Clock, ArrowLeft, ExternalLink, CheckCircle } from "lucide-react"
import { getEventBySlug } from "@/lib/data-source"

export const dynamic = "force-dynamic"

interface PageProps {
    params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params
    const event = await getEventBySlug(slug)
    if (!event) return { title: "Event Not Found | KGF Bharat" }

    return {
        title: `${event.title} | KGF Bharat Events`,
        description: event.description,
    }
}

export async function generateStaticParams() {
    return []
}

export default async function EventDetailPage({ params }: PageProps) {
    const { slug } = await params
    const event = await getEventBySlug(slug)

    if (!event) {
        notFound()
    }

    const isUpcoming = event.type === "upcoming"

    return (
        <div className="min-h-screen bg-white">
            {/* Hero */}
            <div className="text-white pt-14 pb-28 relative overflow-hidden" style={{ background: "linear-gradient(to bottom, #cd5600 0%, #e07020 30%, #f0a060 60%, #fff5eb 90%, white 100%)" }}>
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />

                <div className="container-custom relative z-10">
                    <Link
                        href="/events"
                        className="inline-flex items-center gap-2 text-yellow-300 hover:text-orange transition-colors mb-8 text-sm font-bold uppercase tracking-wider"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        All Events
                    </Link>

                    <div className="max-w-5xl">
                        <div className="flex flex-wrap items-center gap-3 mb-4">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-white">
                                {event.category}
                            </span>
                            {isUpcoming && (
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-orange/20 text-orange">
                                    Upcoming
                                </span>
                            )}
                        </div>

                        <h1 className="text-3xl md:text-5xl font-black mb-6 leading-[1.1] text-white">
                            {event.title}
                        </h1>

                        <div className="flex flex-col sm:flex-row flex-wrap gap-4 text-[#111827]">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-5 h-5 text-orange" />
                                <span>
                                    {new Date(event.date).toLocaleDateString("en-IN", {
                                        weekday: "long",
                                        day: "numeric",
                                        month: "long",
                                        year: "numeric",
                                    })}
                                    {event.endDate && (
                                        <> to {new Date(event.endDate).toLocaleDateString("en-IN", {
                                            day: "numeric",
                                            month: "long",
                                            year: "numeric",
                                        })}</>
                                    )}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-5 h-5 text-orange" />
                                <span>{event.time}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin className="w-5 h-5 text-orange" />
                                <span>{event.location}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="container-custom py-16">
                <div className="max-w-4xl">
                    {/* Description */}
                    <div className="bg-white rounded-2xl p-8 sm:p-10 shadow-sm border border-gray-100 mb-8">
                        <h2 className="text-2xl font-black text-[#111827] mb-4">About This Event</h2>
                        <p className="text-gray-600 leading-relaxed text-lg">
                            {event.description}
                        </p>
                    </div>

                    {/* Highlights */}
                    {event.highlights && event.highlights.length > 0 && (
                        <div className="bg-white rounded-2xl p-8 sm:p-10 shadow-sm border border-gray-100 mb-8">
                            <h2 className="text-2xl font-black text-[#111827] mb-6">Highlights</h2>
                            <ul className="space-y-4">
                                {event.highlights.map((highlight, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-orange shrink-0 mt-0.5" />
                                        <span className="text-gray-600">{highlight}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Registration CTA */}
                    {isUpcoming && event.registrationUrl && (
                        <div className="bg-gradient-to-br from-[#111827] to-[#1F2937] rounded-2xl p-8 sm:p-10 text-white">
                            <h2 className="text-2xl font-black mb-3">Register Now</h2>
                            <p className="text-gray-300 mb-6">
                                Secure your spot at this event. Limited seats available.
                            </p>
                            <a
                                href={event.registrationUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-bold uppercase tracking-wider text-sm transition-all shadow-lg shadow-red-600/20"
                            >
                                Register
                                <ExternalLink className="w-4 h-4" />
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
