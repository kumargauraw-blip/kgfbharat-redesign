"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Play, Image as ImageIcon } from "lucide-react"
import { GalleryItem } from "@/lib/types"

function Lightbox({ item, onClose }: { item: GalleryItem; onClose: () => void }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={onClose}
        >
            <button
                onClick={onClose}
                className="absolute top-6 right-6 text-white hover:text-orange transition-colors z-50"
                aria-label="Close lightbox"
            >
                <X className="w-8 h-8" />
            </button>

            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="max-w-4xl w-full"
                onClick={(e) => e.stopPropagation()}
            >
                {item.type === "video" ? (
                    <div className="aspect-video bg-black rounded-xl overflow-hidden">
                        <iframe
                            src={item.url}
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title={item.title}
                        />
                    </div>
                ) : item.url ? (
                    <img
                        src={item.url}
                        alt={item.title}
                        className="w-full max-h-[80vh] object-contain rounded-xl"
                    />
                ) : (
                    <div className="aspect-video bg-[#111827]/50 rounded-xl overflow-hidden flex items-center justify-center">
                        <div className="text-center text-white">
                            <ImageIcon className="w-16 h-16 mx-auto mb-4 text-orange/50" />
                            <p className="text-lg font-bold">{item.title}</p>
                            <p className="text-gray-400 text-sm mt-1">{item.description}</p>
                        </div>
                    </div>
                )}

                <div className="mt-4 text-white">
                    <h3 className="text-xl font-bold">{item.title}</h3>
                    {item.description && (
                        <p className="text-gray-400 mt-1">{item.description}</p>
                    )}
                    <p className="text-gray-500 text-sm mt-2">
                        {new Date(item.date).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                        })}
                    </p>
                </div>
            </motion.div>
        </motion.div>
    )
}

export function GalleryPageClient({
    items,
    categories,
}: {
    items: GalleryItem[]
    categories: string[]
}) {
    const [activeCategory, setActiveCategory] = useState("All")
    const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null)

    const filtered =
        activeCategory === "All"
            ? items
            : items.filter((item) => item.category === activeCategory)

    return (
        <div className="min-h-screen bg-white">
            {/* Hero */}
            <div className="text-white pt-14 pb-28 relative overflow-hidden" style={{ background: "linear-gradient(to bottom, #cd5600 0%, #e07020 30%, #f0a060 60%, #fff5eb 90%, white 100%)" }}>
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />

                <div className="container-custom relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="max-w-5xl"
                    >
                        <span className="text-yellow-300 font-black tracking-[0.3em] uppercase text-xs mb-4 block">
                            Moments and Memories
                        </span>
                        <h1 className="text-4xl md:text-6xl font-black mb-6 leading-[1.1] text-white">
                            Gallery
                        </h1>
                        <p className="text-xl text-[#111827] leading-relaxed">
                            Highlights from our events, workshops, award ceremonies, and community gatherings across Bharat.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Content */}
            <div className="container-custom py-16">
                {/* Category Filter */}
                <div className="flex flex-wrap gap-2 mb-12">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`px-5 py-2.5 rounded-xl font-bold text-sm uppercase tracking-wider transition-all ${
                                activeCategory === category
                                    ? "bg-red-600 text-white shadow-lg shadow-red-600/20"
                                    : "bg-white text-gray-500 hover:text-[#111827] border border-gray-200"
                            }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Gallery Grid */}
                {filtered.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-xl text-gray-400">No items in this category yet.</p>
                    </div>
                ) : (
                    <motion.div
                        layout
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        <AnimatePresence mode="popLayout">
                            {filtered.map((item, i) => (
                                <motion.button
                                    key={item.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3, delay: i * 0.05 }}
                                    onClick={() => setSelectedItem(item)}
                                    className="group relative aspect-[4/3] bg-[#111827]/10 rounded-2xl overflow-hidden text-left"
                                >
                                    {/* Image or video placeholder */}
                                    {item.url && item.type !== "video" ? (
                                        <img
                                            src={item.thumbnailUrl || item.url}
                                            alt={item.title}
                                            className="absolute inset-0 w-full h-full object-cover"
                                            loading="lazy"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 bg-gradient-to-br from-[#111827]/20 to-[#111827]/40 flex items-center justify-center">
                                            {item.type === "video" ? (
                                                <Play className="w-12 h-12 text-white/40 group-hover:text-orange/70 transition-colors" />
                                            ) : (
                                                <ImageIcon className="w-12 h-12 text-white/30 group-hover:text-orange/50 transition-colors" />
                                            )}
                                        </div>
                                    )}

                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                                    {/* Info */}
                                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all">
                                        <p className="text-white font-bold text-sm line-clamp-1">{item.title}</p>
                                        <p className="text-gray-300 text-xs mt-1">{item.category}</p>
                                    </div>

                                    {/* Video badge */}
                                    {item.type === "video" && (
                                        <div className="absolute top-3 right-3 bg-black/50 rounded-full p-1.5">
                                            <Play className="w-3 h-3 text-white fill-white" />
                                        </div>
                                    )}
                                </motion.button>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                )}
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {selectedItem && (
                    <Lightbox item={selectedItem} onClose={() => setSelectedItem(null)} />
                )}
            </AnimatePresence>
        </div>
    )
}
