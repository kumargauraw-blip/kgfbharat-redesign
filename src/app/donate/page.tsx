import { Metadata } from "next"
import { Heart, GraduationCap, Sparkles, Award, Shield, ArrowRight } from "lucide-react"

export const metadata: Metadata = {
    title: "Donate | KGF Bharat",
    description:
        "Support KGF Bharat's mission to strengthen Dharmic education, skill development, and recognition of excellence across Bharat.",
}

// Razorpay hosted donation page — no API keys required on our side.
const DONATE_URL = "https://pages.razorpay.com/DonateINR"

const impact = [
    {
        icon: GraduationCap,
        title: "AI & Skill Education",
        text: "Fund accessible AI and technology training that prepares learners for the future.",
    },
    {
        icon: Sparkles,
        title: "Dharmic Learning",
        text: "Support programs rooted in Sanatana wisdom, Gita, and Itihasa.",
    },
    {
        icon: Award,
        title: "Dharmalankaran Awards",
        text: "Help recognize and honour excellence across our community.",
    },
]

export default function DonatePage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero */}
            <section
                className="text-white pt-14 pb-24 relative overflow-hidden"
                style={{
                    background:
                        "linear-gradient(to bottom, #cd5600 0%, #e07020 35%, #f0a060 70%, #fff5eb 95%, white 100%)",
                }}
            >
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
                <div className="container-custom relative z-10 max-w-4xl">
                    <span className="text-yellow-300 font-black tracking-[0.3em] uppercase text-xs mb-4 block">
                        Support Our Mission
                    </span>
                    <h1 className="text-4xl md:text-6xl font-black mb-6 leading-[1.1] text-white">
                        Donate to KGF Bharat
                    </h1>
                    <p className="text-lg md:text-xl text-[#111827] leading-relaxed max-w-3xl">
                        Your contribution directly funds AI education, skill development programs, and the
                        Dharmalankaran Awards that recognize excellence in our community.
                    </p>

                    <a
                        href={DONATE_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-8 inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-xl"
                    >
                        <Heart className="h-4 w-4" />
                        Donate Securely
                        <ArrowRight className="h-4 w-4" />
                    </a>
                </div>
            </section>

            {/* Where your contribution goes */}
            <section className="container-custom py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {impact.map(({ icon: Icon, title, text }) => (
                        <div
                            key={title}
                            className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
                        >
                            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange/10 text-orange mb-4">
                                <Icon className="h-6 w-6" />
                            </span>
                            <h3 className="text-lg font-black text-[#111827] mb-1">{title}</h3>
                            <p className="text-gray-600 leading-relaxed text-sm">{text}</p>
                        </div>
                    ))}
                </div>

                {/* Final CTA */}
                <div className="mt-14 max-w-xl mx-auto text-center">
                    <a
                        href={DONATE_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-lg shadow-red-600/20"
                    >
                        <Heart className="h-4 w-4" />
                        Donate Now
                    </a>

                    <div className="mt-6 flex items-center justify-center gap-2 text-gray-500">
                        <Shield className="h-5 w-5 text-green-500" />
                        <span className="text-sm font-medium">Secure payment via Razorpay</span>
                    </div>
                    <p className="mt-3 text-gray-400 text-sm">
                        KGF Bharat is a registered charitable trust. You&apos;ll receive a payment
                        confirmation from Razorpay after your contribution.
                    </p>
                </div>
            </section>
        </div>
    )
}
