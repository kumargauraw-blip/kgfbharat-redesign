"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { FAQ } from "@/lib/types"

export default function FaqAccordion({ items }: { items: FAQ[] }) {
    const [openIndex, setOpenIndex] = useState<number | null>(null)

    return (
        <div className="space-y-3">
            {items.map((item, idx) => {
                const isOpen = openIndex === idx
                return (
                    <div
                        key={idx}
                        className="border border-gray-200 rounded-lg overflow-hidden bg-white"
                    >
                        <button
                            onClick={() => setOpenIndex(isOpen ? null : idx)}
                            className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
                        >
                            <span className="font-semibold text-navy pr-4">{item.question}</span>
                            <motion.span
                                animate={{ rotate: isOpen ? 180 : 0 }}
                                transition={{ duration: 0.2 }}
                                className="shrink-0"
                            >
                                <ChevronDown className="h-5 w-5 text-orange" />
                            </motion.span>
                        </button>
                        <AnimatePresence initial={false}>
                            {isOpen && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.25 }}
                                >
                                    <div className="px-5 pb-5 text-gray-600 leading-relaxed">
                                        {item.answer}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                )
            })}
        </div>
    )
}
