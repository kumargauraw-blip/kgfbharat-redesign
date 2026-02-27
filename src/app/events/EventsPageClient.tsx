"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Calendar, MapPin, ArrowRight, Tag } from "lucide-react"
import { Event } from "@/lib/types"

const categoryColors: Record<string, string> = {
    conference: "bg-blue-100 text-blue-800",
    workshop: "bg-green-100 text-green-800",
    seminar: "bg-purple-100 text-purple-800",
    cultural: "bg-pink-100 text-pink-800",
    awards: "bg-amber-100 text-amber-800",
}

function EventCard({ event, index }: { event: Event; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
        >
            <Link
                href={`/events/${event.slug}`}
                className="group block bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-orange/20 transition-all overflow-hidden"
            >
                <div className="p-6 sm:p-8">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${categoryColors[event.category] || "bg-gray-100 text-gray-700"}`}>
                            <Tag className="w-3 h-3" />
                            {event.category}
                        </span>
                        {event.type === "upcoming" && (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-orange/10 text-orange uppercase tracking-wider">
                                Upcoming
                            </span>
                        )}
                    </div>

                    <h3 className="text-xl sm:text-2xl font-black text-[#111827] mb-3 group-hover:text-orange transition-colors">
                        {event.title}
                    </h3>

                    <p className="text-gray-500 mb-6 line-clamp-2">
                        {event.description}
                    </p>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-orange" />
                            <span>
                                {new Date(event.date).toLocaleDateString("en-IN", {
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
                            <MapPin className="w-4 h-4 text-orange" />
                            <span>{event.location}</span>
                        </div>
                    </div>

                    <div className="mt-6 flex items-center gap-2 text-orange font-bold text-sm group-hover:gap-3 transition-all">
                        View Details
                        <ArrowRight className="w-4 h-4" />
                    </div>
                </div>
            </Link>
        </motion.div>
    )
}

export function EventsPageClient({ events }: { events: Event[] }) {
    const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming")

    const upcoming = events.filter(e => e.type === "upcoming")
    const past = events.filter(e => e.type === "past")
    const displayed = activeTab === "upcoming" ? upcoming : past

    return (
        <div className="min-h-screen bg-white">
            {/* Hero */}
            <div className="text-white pt-14 pb-28 relative overflow-hidden" style={{ background: "linear-gradient(to bottom, #cd5600 0%, #e07020 30%, #f0a060 60%, #fff5eb 90%, white 100%)" }}>
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/20 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />

                <div className="container-custom relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="max-w-5xl"
                    >
                        <span className="text-yellow-300 font-black tracking-[0.3em] uppercase text-xs mb-4 block">
                            Community and Learning
                        </span>
                        <h1 className="text-4xl md:text-6xl font-black mb-6 leading-[1.1] text-white">
                            Events
                        </h1>
                        <p className="text-xl text-[#111827] leading-relaxed">
                            Join us at workshops, conferences, and award ceremonies that bring together thought leaders, technologists, and educators from across Bharat.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Content */}
            <div className="container-custom py-16">
                {/* Tabs */}
                <div className="flex gap-2 mb-12">
                    <button
                        onClick={() => setActiveTab("upcoming")}
                        className={`px-6 py-3 rounded-xl font-bold text-sm uppercase tracking-wider transition-all ${
                            activeTab === "upcoming"
                                ? "bg-red-600 text-white shadow-lg shadow-red-600/20"
                                : "bg-white text-gray-500 hover:text-[#111827] border border-gray-200"
                        }`}
                    >
                        Upcoming ({upcoming.length})
                    </button>
                    <button
                        onClick={() => setActiveTab("past")}
                        className={`px-6 py-3 rounded-xl font-bold text-sm uppercase tracking-wider transition-all ${
                            activeTab === "past"
                                ? "bg-red-600 text-white shadow-lg shadow-red-600/20"
                                : "bg-white text-gray-500 hover:text-[#111827] border border-gray-200"
                        }`}
                    >
                        Past ({past.length})
                    </button>
                </div>

                {/* Events Grid */}
                {displayed.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-xl text-gray-400">
                            {activeTab === "upcoming"
                                ? "No upcoming events at the moment. Check back soon!"
                                : "No past events to display."}
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {displayed.map((event, i) => (
                            <EventCard key={event.id} event={event} index={i} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
