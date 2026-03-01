import { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Calendar, MapPin, Clock, ArrowLeft, ExternalLink, CheckCircle, Camera, Users } from "lucide-react"
import { getEventBySlug, getGalleryItems } from "@/lib/data-source"

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

// Map event slugs to gallery categories
function getGalleryCategoryForEvent(slug: string): string | null {
    const mapping: Record<string, string> = {
        "dharmalankaran-2025": "Dharmalankaran-2025",
    }
    return mapping[slug] || null
}

export default async function EventDetailPage({ params }: PageProps) {
    const { slug } = await params
    const event = await getEventBySlug(slug)

    if (!event) {
        notFound()
    }

    const isPast = event.category === "completed" || event.type === "past" || (event.date && new Date(event.date) < new Date())
    const isUpcoming = !isPast && (event.type === "upcoming" || (event.date && new Date(event.date) >= new Date()))

    // Fetch gallery images for this event
    const galleryCategory = getGalleryCategoryForEvent(slug)
    let galleryImages: Awaited<ReturnType<typeof getGalleryItems>> = []
    if (galleryCategory) {
        const allGallery = await getGalleryItems()
        galleryImages = allGallery.filter(g => g.category === galleryCategory)
    }

    // Pick hero images (first 6 for the mosaic)
    const heroImages = galleryImages.slice(0, 6)
    const remainingImages = galleryImages.slice(6)

    return (
        <div className="min-h-screen bg-white">
            {/* Hero */}
            <div className="text-white pt-14 pb-20 relative overflow-hidden" style={{ background: "linear-gradient(to bottom, #cd5600 0%, #e07020 30%, #f0a060 60%, #fff5eb 90%, white 100%)" }}>
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <Link
                        href="/events"
                        className="inline-flex items-center gap-2 text-yellow-300 hover:text-white transition-colors mb-8 text-sm font-bold uppercase tracking-wider"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        All Events
                    </Link>

                    <div className="grid lg:grid-cols-2 gap-10 items-center">
                        <div>
                            <div className="flex flex-wrap items-center gap-3 mb-4">
                                {isPast && (
                                    <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider bg-white/20 text-white backdrop-blur-sm">
                                        Past Event
                                    </span>
                                )}
                                {isUpcoming && (
                                    <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider bg-orange-500 text-white">
                                        Upcoming
                                    </span>
                                )}
                            </div>

                            <h1 className="text-3xl md:text-5xl font-black mb-6 leading-[1.1] text-white drop-shadow-sm">
                                {event.title}
                            </h1>

                            <div className="flex flex-col gap-3 text-white/90">
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-lg bg-white/15 flex items-center justify-center">
                                        <Calendar className="w-4 h-4" />
                                    </div>
                                    <span className="font-semibold">
                                        {new Date(event.date).toLocaleDateString("en-IN", {
                                            weekday: "long",
                                            day: "numeric",
                                            month: "long",
                                            year: "numeric",
                                        })}
                                    </span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-lg bg-white/15 flex items-center justify-center">
                                        <Clock className="w-4 h-4" />
                                    </div>
                                    <span className="font-semibold">{event.time}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-lg bg-white/15 flex items-center justify-center">
                                        <MapPin className="w-4 h-4" />
                                    </div>
                                    <span className="font-semibold">{event.location}</span>
                                </div>
                                {galleryImages.length > 0 && (
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-lg bg-white/15 flex items-center justify-center">
                                            <Camera className="w-4 h-4" />
                                        </div>
                                        <span className="font-semibold">{galleryImages.length} Photos</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Hero image mosaic */}
                        {heroImages.length > 0 && (
                            <div className="hidden lg:grid grid-cols-3 grid-rows-2 gap-2 h-80 rounded-2xl overflow-hidden shadow-2xl">
                                {heroImages.map((img, i) => (
                                    <div
                                        key={img.id}
                                        className={`relative overflow-hidden ${i === 0 ? "col-span-2 row-span-2" : ""}`}
                                    >
                                        <img
                                            src={img.thumbnailUrl || img.url}
                                            alt={img.title}
                                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Main Content - Full Width */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

                {/* About + Stats Row */}
                <div className="grid lg:grid-cols-3 gap-8 mb-16">
                    <div className="lg:col-span-2">
                        <h2 className="text-3xl font-black text-[#111827] mb-6">About This Event</h2>
                        <div className="text-gray-600 leading-relaxed text-lg space-y-4">
                            {event.description.split('\n').filter(Boolean).map((para, i) => (
                                <p key={i}>{para}</p>
                            ))}
                        </div>
                    </div>
                    <div className="space-y-4">
                        {/* Quick stats cards */}
                        {galleryImages.length > 0 && (
                            <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-6 border border-orange-100">
                                <div className="flex items-center gap-3 mb-2">
                                    <Camera className="w-6 h-6 text-orange" />
                                    <span className="text-3xl font-black text-[#111827]">{galleryImages.length}</span>
                                </div>
                                <p className="text-gray-600 font-semibold">Event Photos</p>
                            </div>
                        )}
                        {event.highlights && event.highlights.length > 0 && (
                            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-6 border border-purple-100">
                                <div className="flex items-center gap-3 mb-2">
                                    <CheckCircle className="w-6 h-6 text-purple-600" />
                                    <span className="text-3xl font-black text-[#111827]">{event.highlights.length}</span>
                                </div>
                                <p className="text-gray-600 font-semibold">Key Highlights</p>
                            </div>
                        )}
                        <div className="bg-gradient-to-br from-saffron/10 to-orange-50 rounded-2xl p-6 border border-orange-100">
                            <div className="flex items-center gap-3 mb-2">
                                <Users className="w-6 h-6 text-orange" />
                                <span className="text-3xl font-black text-[#111827]">84</span>
                            </div>
                            <p className="text-gray-600 font-semibold">Awardees Honored</p>
                        </div>
                    </div>
                </div>

                {/* Highlights Section */}
                {event.highlights && event.highlights.length > 0 && (
                    <div className="mb-16">
                        <h2 className="text-3xl font-black text-[#111827] mb-8">Event Highlights</h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {event.highlights.map((highlight, i) => (
                                <div
                                    key={i}
                                    className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-orange/30 transition-all"
                                >
                                    <div className="w-10 h-10 rounded-xl bg-orange/10 flex items-center justify-center mb-4">
                                        <span className="text-orange font-black text-sm">{String(i + 1).padStart(2, "0")}</span>
                                    </div>
                                    <p className="text-gray-700 font-medium leading-relaxed">{highlight}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Photo Gallery Section */}
                {galleryImages.length > 0 && (
                    <div className="mb-16">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-3xl font-black text-[#111827]">Event Gallery</h2>
                            <Link
                                href="/gallery"
                                className="text-orange hover:text-orange/80 font-bold text-sm uppercase tracking-wider"
                            >
                                View All Photos →
                            </Link>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                            {galleryImages.map((img, i) => (
                                <div
                                    key={img.id}
                                    className="group relative aspect-square rounded-xl overflow-hidden bg-gray-100"
                                >
                                    <img
                                        src={img.thumbnailUrl || img.url}
                                        alt={img.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                        <p className="text-white text-xs font-bold line-clamp-2">{img.title}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Registration CTA for upcoming events */}
                {isUpcoming && event.registrationUrl && (
                    <div className="bg-gradient-to-br from-[#111827] to-[#1F2937] rounded-3xl p-10 sm:p-14 text-white text-center">
                        <h2 className="text-3xl font-black mb-4">Register Now</h2>
                        <p className="text-gray-300 mb-8 text-lg max-w-xl mx-auto">
                            Secure your spot at this event. Limited seats available.
                        </p>
                        <a
                            href={event.registrationUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-10 py-4 rounded-xl font-black uppercase tracking-wider text-sm transition-all shadow-lg shadow-red-600/20"
                        >
                            Register
                            <ExternalLink className="w-4 h-4" />
                        </a>
                    </div>
                )}

                {/* Past event - link to gallery */}
                {isPast && galleryImages.length > 0 && (
                    <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-10 sm:p-14 text-center border border-orange-100">
                        <h2 className="text-3xl font-black text-[#111827] mb-4">Relive the Moments</h2>
                        <p className="text-gray-600 mb-8 text-lg max-w-xl mx-auto">
                            Browse the complete photo gallery from this event featuring all {galleryImages.length} photos of the award ceremony.
                        </p>
                        <Link
                            href="/gallery"
                            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-10 py-4 rounded-xl font-black uppercase tracking-wider text-sm transition-all shadow-lg shadow-red-600/20"
                        >
                            <Camera className="w-4 h-4" />
                            View Full Gallery
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}
