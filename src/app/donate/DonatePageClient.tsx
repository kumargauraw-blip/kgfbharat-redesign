"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Heart, Shield, BookOpen, Award, Users, IndianRupee, CheckCircle, Loader2 } from "lucide-react"

const tiers = [
    {
        name: "Supporter",
        amount: 500,
        icon: Heart,
        color: "orange",
        description: "Help provide learning materials for one student",
        benefits: [
            "Digital certificate of appreciation",
            "Quarterly newsletter updates",
            "Name on our supporters wall",
        ],
    },
    {
        name: "Patron",
        amount: 2000,
        icon: BookOpen,
        color: "blue-600",
        description: "Sponsor a student for a full AI workshop",
        benefits: [
            "Everything in Supporter tier",
            "Invitation to annual community meetup",
            "Priority access to KGF events",
            "Personalized thank you from the team",
        ],
        popular: true,
    },
    {
        name: "Champion",
        amount: 5000,
        icon: Award,
        color: "navy",
        description: "Fund an entire Gurukul bootcamp seat for an underprivileged student",
        benefits: [
            "Everything in Patron tier",
            "VIP seating at Dharmalankaran Awards",
            "Mention in our annual report",
            "Direct impact report from sponsored student",
            "Exclusive community channel access",
        ],
    },
]

const RAZORPAY_SCRIPT = "https://checkout.razorpay.com/v1/checkout.js"
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

declare global {
    interface Window {
        Razorpay?: new (options: Record<string, unknown>) => { open: () => void; on: (e: string, cb: (r: unknown) => void) => void }
    }
}

function loadRazorpay(): Promise<boolean> {
    return new Promise((resolve) => {
        if (typeof window === "undefined") return resolve(false)
        if (window.Razorpay) return resolve(true)
        const existing = document.querySelector(`script[src="${RAZORPAY_SCRIPT}"]`)
        if (existing) {
            existing.addEventListener("load", () => resolve(true))
            existing.addEventListener("error", () => resolve(false))
            return
        }
        const script = document.createElement("script")
        script.src = RAZORPAY_SCRIPT
        script.onload = () => resolve(true)
        script.onerror = () => resolve(false)
        document.body.appendChild(script)
    })
}

export function DonatePageClient() {
    const [customAmount, setCustomAmount] = useState("")
    const [donorName, setDonorName] = useState("")
    const [donorEmail, setDonorEmail] = useState("")
    const [processingAmount, setProcessingAmount] = useState<number | null>(null)
    const [error, setError] = useState("")
    const [done, setDone] = useState<null | { amount: number; emailed: boolean; email: string }>(null)

    const processing = processingAmount !== null
    const customProcessing = processing && !tiers.some((t) => t.amount === processingAmount)

    const handleDonate = async (amount: number) => {
        setError("")
        const name = donorName.trim()
        const email = donorEmail.trim()

        if (!name) {
            setError("Please enter your name before donating.")
            return
        }
        if (!EMAIL_RE.test(email)) {
            setError("Please enter a valid email — we'll send your receipt there.")
            return
        }
        if (!Number.isInteger(amount) || amount < 100) {
            setError("The minimum donation is ₹100.")
            return
        }

        setProcessingAmount(amount)
        try {
            const ready = await loadRazorpay()
            if (!ready) throw new Error("Could not load the secure payment window. Check your connection and try again.")

            const orderRes = await fetch("/api/donate/order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount }),
            })
            const order = await orderRes.json()
            if (!orderRes.ok) throw new Error(order.error || "Could not start the payment. Please try again.")

            const rzp = new window.Razorpay!({
                key: order.keyId,
                amount: order.amount,
                currency: order.currency,
                order_id: order.orderId,
                name: "KGF Bharat",
                description: "Donation to KGF Bharat",
                image: "/kgf-logo.png",
                prefill: { name, email },
                theme: { color: "#cd5600" },
                handler: async (response: unknown) => {
                    const r = response as Record<string, string>
                    try {
                        const verifyRes = await fetch("/api/donate/verify", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                razorpay_order_id: r.razorpay_order_id,
                                razorpay_payment_id: r.razorpay_payment_id,
                                razorpay_signature: r.razorpay_signature,
                                amount,
                                donor: { name, email },
                            }),
                        })
                        const result = await verifyRes.json()
                        if (!verifyRes.ok || !result.verified) {
                            throw new Error(result.error || "We could not verify your payment. Please contact us.")
                        }
                        setDone({ amount: result.amount || amount, emailed: Boolean(result.emailed), email })
                    } catch (err) {
                        setError(err instanceof Error ? err.message : "Something went wrong confirming your donation.")
                    } finally {
                        setProcessingAmount(null)
                    }
                },
                modal: {
                    ondismiss: () => setProcessingAmount(null),
                },
            })
            rzp.on("payment.failed", (resp: unknown) => {
                const err = (resp as { error?: { description?: string } })?.error
                setError(err?.description || "The payment failed. Please try again.")
                setProcessingAmount(null)
            })
            rzp.open()
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong. Please try again.")
            setProcessingAmount(null)
        }
    }

    if (done) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center px-4 py-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="max-w-lg text-center bg-white rounded-2xl p-10 shadow-sm border border-gray-100"
                >
                    <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-9 h-9 text-green-500" />
                    </div>
                    <h1 className="text-3xl font-black text-[#111827] mb-3">Thank you!</h1>
                    <p className="text-gray-600 mb-2">
                        Your donation of <span className="font-bold text-[#111827]">Rs {done.amount.toLocaleString("en-IN")}</span> has been received.
                    </p>
                    <p className="text-gray-500 text-sm mb-8">
                        {done.emailed
                            ? `A receipt is on its way to ${done.email}.`
                            : `We've recorded your contribution. Your receipt will be emailed to ${done.email} shortly.`}
                    </p>
                    <a
                        href="/"
                        className="inline-block bg-orange hover:bg-orange/90 text-white px-8 py-3.5 rounded-xl font-bold uppercase tracking-wider text-sm transition-all"
                    >
                        Back to Home
                    </a>
                </motion.div>
            </div>
        )
    }

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
                            Support Our Mission
                        </span>
                        <h1 className="text-4xl md:text-6xl font-black mb-6 leading-[1.1] text-white">
                            Donate to KGF Bharat
                        </h1>
                        <p className="text-xl text-[#111827] leading-relaxed">
                            Your contribution directly funds AI education, skill development programs, and the Dharmalankaran Awards that recognize excellence in our community.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Donation Tiers */}
            <div className="container-custom py-16">
                {/* Donor details */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="max-w-2xl mx-auto bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 mb-10"
                >
                    <h3 className="text-lg font-black text-[#111827] mb-1">Your details</h3>
                    <p className="text-gray-500 text-sm mb-5">We'll email your donation receipt here.</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input
                            type="text"
                            value={donorName}
                            onChange={(e) => setDonorName(e.target.value)}
                            placeholder="Full name"
                            autoComplete="name"
                            className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-orange focus:ring-2 focus:ring-orange/20 outline-none transition-all text-[#111827] font-medium"
                        />
                        <input
                            type="email"
                            value={donorEmail}
                            onChange={(e) => setDonorEmail(e.target.value)}
                            placeholder="Email address"
                            autoComplete="email"
                            className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-orange focus:ring-2 focus:ring-orange/20 outline-none transition-all text-[#111827] font-medium"
                        />
                    </div>
                    {error && (
                        <p className="mt-4 text-sm font-medium text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-3">
                            {error}
                        </p>
                    )}
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    {tiers.map((tier, i) => {
                        const Icon = tier.icon
                        const isProcessing = processingAmount === tier.amount
                        return (
                            <motion.div
                                key={tier.name}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: i * 0.1 }}
                                className={`relative bg-white rounded-2xl p-8 shadow-sm border ${
                                    tier.popular
                                        ? "border-orange shadow-lg shadow-orange/10 ring-2 ring-orange"
                                        : "border-gray-100"
                                }`}
                            >
                                {tier.popular && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                        <span className="bg-orange text-white text-xs font-bold uppercase tracking-wider px-4 py-1 rounded-full">
                                            Most Popular
                                        </span>
                                    </div>
                                )}

                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${
                                    tier.color === "orange" ? "bg-orange/10" :
                                    tier.color === "blue-600" ? "bg-amber-50" :
                                    "bg-[#111827]/10"
                                }`}>
                                    <Icon className={`w-7 h-7 ${
                                        tier.color === "orange" ? "text-orange" :
                                        tier.color === "blue-600" ? "text-amber-700" :
                                        "text-[#111827]"
                                    }`} />
                                </div>

                                <h3 className="text-xl font-black text-[#111827] mb-1">{tier.name}</h3>
                                <div className="flex items-baseline gap-1 mb-4">
                                    <span className="text-3xl font-black text-[#111827]">
                                        <IndianRupee className="w-6 h-6 inline -mt-1" />
                                        {tier.amount.toLocaleString("en-IN")}
                                    </span>
                                </div>
                                <p className="text-gray-500 mb-6">{tier.description}</p>

                                <ul className="space-y-3 mb-8">
                                    {tier.benefits.map((benefit, j) => (
                                        <li key={j} className="flex items-start gap-2 text-sm text-gray-600">
                                            <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                                            {benefit}
                                        </li>
                                    ))}
                                </ul>

                                <button
                                    onClick={() => handleDonate(tier.amount)}
                                    disabled={processing}
                                    className="w-full py-3.5 rounded-xl font-bold uppercase tracking-wider text-sm transition-all bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-600/20 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {isProcessing && <Loader2 className="w-4 h-4 animate-spin" />}
                                    {isProcessing ? "Processing…" : `Donate Rs ${tier.amount.toLocaleString("en-IN")}`}
                                </button>
                            </motion.div>
                        )
                    })}
                </div>

                {/* Custom Amount */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                    className="max-w-md mx-auto bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center"
                >
                    <h3 className="text-xl font-black text-[#111827] mb-2">Custom Amount</h3>
                    <p className="text-gray-500 text-sm mb-6">Every contribution, big or small, makes a difference.</p>
                    <div className="flex gap-3">
                        <div className="relative flex-1">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">Rs</span>
                            <input
                                type="number"
                                min="100"
                                value={customAmount}
                                onChange={(e) => setCustomAmount(e.target.value)}
                                placeholder="Enter amount"
                                className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 focus:border-orange focus:ring-2 focus:ring-orange/20 outline-none transition-all text-[#111827] font-bold"
                            />
                        </div>
                        <button
                            onClick={() => {
                                const amount = parseInt(customAmount, 10)
                                if (amount >= 100) handleDonate(amount)
                                else setError("The minimum donation is ₹100.")
                            }}
                            disabled={processing}
                            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3.5 rounded-xl font-bold uppercase tracking-wider text-sm transition-all shadow-lg shadow-red-600/20 shrink-0 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {customProcessing && <Loader2 className="w-4 h-4 animate-spin" />}
                            Donate
                        </button>
                    </div>
                </motion.div>

                {/* Trust Indicators */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 }}
                    className="mt-16 text-center"
                >
                    <div className="flex flex-wrap justify-center gap-8 mb-8">
                        <div className="flex items-center gap-2 text-gray-500">
                            <Shield className="w-5 h-5 text-green-500" />
                            <span className="text-sm font-medium">Secure Payment via Razorpay</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-500">
                            <Users className="w-5 h-5 text-green-500" />
                            <span className="text-sm font-medium">500+ Donors and Growing</span>
                        </div>
                    </div>
                    <p className="text-gray-400 text-sm max-w-2xl mx-auto">
                        KGF Bharat is a registered charitable trust. You will receive a receipt via email after your contribution.
                    </p>
                </motion.div>
            </div>
        </div>
    )
}
