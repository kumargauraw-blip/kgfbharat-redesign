"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { motion } from "framer-motion"
import { Send, Mail, Phone, MapPin, CheckCircle } from "lucide-react"
import { submitContactForm } from "@/app/actions"

interface ContactFormData {
    name: string
    email: string
    subject: string
    message: string
}

const subjectOptions = [
    "General Inquiry",
    "Course Info",
    "Corporate Training",
    "Partnership",
    "Other",
]

export function ContactPageClient() {
    const [submitted, setSubmitted] = useState(false)
    const [submitting, setSubmitting] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ContactFormData>()

    const onSubmit = async (data: ContactFormData) => {
        setSubmitting(true)
        try {
            const formData = new FormData()
            formData.append("name", data.name)
            formData.append("email", data.email)
            formData.append("subject", data.subject)
            formData.append("message", data.message)
            await submitContactForm(formData)
            setSubmitted(true)
            reset()
        } finally {
            setSubmitting(false)
        }
    }

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
                            Reach Out
                        </span>
                        <h1 className="text-4xl md:text-6xl font-black mb-6 leading-[1.1] text-white">
                            Contact Us
                        </h1>
                        <p className="text-xl text-[#111827] leading-relaxed">
                            Have a question about our courses, events, or partnerships? We would love to hear from you.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Content */}
            <div className="container-custom py-16">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
                    {/* Form */}
                    <div className="lg:col-span-3">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="bg-white rounded-2xl p-8 sm:p-10 shadow-sm border border-gray-100"
                        >
                            {submitted ? (
                                <div className="text-center py-12">
                                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                                    <h3 className="text-2xl font-black text-[#111827] mb-2">Message Sent!</h3>
                                    <p className="text-gray-500 mb-6">
                                        Thank you for reaching out. We will get back to you within 24 to 48 hours.
                                    </p>
                                    <button
                                        onClick={() => setSubmitted(false)}
                                        className="text-orange font-bold hover:underline"
                                    >
                                        Send another message
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-bold text-[#111827] mb-2">
                                            Full Name
                                        </label>
                                        <input
                                            id="name"
                                            type="text"
                                            {...register("name", { required: "Name is required" })}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange focus:ring-2 focus:ring-orange/20 outline-none transition-all text-[#111827]"
                                            placeholder="Your full name"
                                        />
                                        {errors.name && (
                                            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block text-sm font-bold text-[#111827] mb-2">
                                            Email Address
                                        </label>
                                        <input
                                            id="email"
                                            type="email"
                                            {...register("email", {
                                                required: "Email is required",
                                                pattern: {
                                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                    message: "Please enter a valid email address",
                                                },
                                            })}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange focus:ring-2 focus:ring-orange/20 outline-none transition-all text-[#111827]"
                                            placeholder="you@example.com"
                                        />
                                        {errors.email && (
                                            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="subject" className="block text-sm font-bold text-[#111827] mb-2">
                                            Subject
                                        </label>
                                        <select
                                            id="subject"
                                            {...register("subject", { required: "Please select a subject" })}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange focus:ring-2 focus:ring-orange/20 outline-none transition-all text-[#111827] bg-white"
                                        >
                                            <option value="">Select a subject</option>
                                            {subjectOptions.map((opt) => (
                                                <option key={opt} value={opt}>
                                                    {opt}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.subject && (
                                            <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="message" className="block text-sm font-bold text-[#111827] mb-2">
                                            Message
                                        </label>
                                        <textarea
                                            id="message"
                                            rows={5}
                                            {...register("message", {
                                                required: "Message is required",
                                                minLength: {
                                                    value: 10,
                                                    message: "Message must be at least 10 characters",
                                                },
                                            })}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange focus:ring-2 focus:ring-orange/20 outline-none transition-all text-[#111827] resize-none"
                                            placeholder="Tell us how we can help..."
                                        />
                                        {errors.message && (
                                            <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                                        )}
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={submitting}
                                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-bold uppercase tracking-wider text-sm transition-all shadow-lg shadow-red-600/20 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {submitting ? "Sending..." : "Send Message"}
                                        <Send className="w-4 h-4" />
                                    </button>
                                </form>
                            )}
                        </motion.div>
                    </div>

                    {/* Contact Info and Map */}
                    <div className="lg:col-span-2 space-y-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100"
                        >
                            <h3 className="text-xl font-black text-[#111827] mb-6">Get in Touch</h3>
                            <div className="space-y-5">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-orange/10 flex items-center justify-center shrink-0">
                                        <Mail className="w-5 h-5 text-orange" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-[#111827] text-sm">Email</p>
                                        <a
                                            href="mailto:info@kgfbharat.org"
                                            className="text-gray-500 hover:text-orange transition-colors"
                                        >
                                            info@kgfbharat.org
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-orange/10 flex items-center justify-center shrink-0">
                                        <Phone className="w-5 h-5 text-orange" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-[#111827] text-sm">Phone</p>
                                        <p className="text-gray-500">+91-XXXX-XXXXXX</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-orange/10 flex items-center justify-center shrink-0">
                                        <MapPin className="w-5 h-5 text-orange" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-[#111827] text-sm">Address</p>
                                        <p className="text-gray-500">
                                            KGF Bharat Foundation<br />
                                            New Delhi, India
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Map Placeholder */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100"
                        >
                            <div className="aspect-[4/3] bg-gray-100 flex items-center justify-center">
                                <div className="text-center text-gray-400">
                                    <MapPin className="w-10 h-10 mx-auto mb-2" />
                                    <p className="text-sm font-medium">Google Maps Embed</p>
                                    <p className="text-xs">Coming soon</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    )
}
