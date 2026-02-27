import { Metadata } from "next"
import Link from "next/link"
import { Calendar, MapPin, Clock, Award, Users, Star, Trophy, ArrowRight, CheckCircle } from "lucide-react"

export const metadata: Metadata = {
    title: "Dharmalankaran 2025 | National Awards Ceremony | KGF Bharat",
    description: "The Dharmalankaran 2025 Awards ceremony honors individuals and organizations making outstanding contributions to Dharmic values through technology, education, and social impact.",
}

const categories = [
    {
        icon: Star,
        title: "Education Excellence",
        description: "Honoring educators and institutions advancing Dharmic and modern education",
    },
    {
        icon: Trophy,
        title: "Technology Innovation",
        description: "Recognizing technologists building solutions rooted in Dharmic values",
    },
    {
        icon: Users,
        title: "Social Impact",
        description: "Celebrating individuals driving positive change in Dharmic communities",
    },
    {
        icon: Award,
        title: "Youth Leadership",
        description: "Acknowledging young leaders championing Dharmic causes",
    },
    {
        icon: Star,
        title: "Lifetime Achievement",
        description: "Honoring a lifetime of dedication to the preservation and promotion of Dharma",
    },
]

const highlights = [
    "Keynote address by Sandeep Deo, Founder of KGF Bharat",
    "Panel discussion on AI and Dharmic ethics",
    "Awards presented in 5 categories",
    "Cultural performances celebrating Bharatiya traditions",
    "Networking dinner with 200+ leaders and scholars",
]

export default function DharmalankaranPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero */}
            <div className="bg-[#111827] text-white py-28 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-orange/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
                {/* Decorative pattern */}
                <div className="absolute inset-0 opacity-5" style={{
                    backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
                    backgroundSize: "40px 40px"
                }} />

                <div className="container-custom relative z-10 text-center">
                    <div className="max-w-3xl mx-auto">
                        <div className="inline-flex items-center gap-2 bg-orange/20 border border-orange/30 px-5 py-2 rounded-full mb-8">
                            <Award className="w-4 h-4 text-orange" />
                            <span className="text-orange font-bold text-sm uppercase tracking-wider">National Awards Ceremony</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-black mb-4 leading-[1.05] text-white">
                            Dharmalankaran
                            <span className="block text-orange">2025</span>
                        </h1>

                        <p className="text-xl text-gray-300 leading-relaxed mb-8 max-w-2xl mx-auto">
                            Honoring outstanding contributors to Dharmic values through technology, education, and social impact.
                        </p>

                        <div className="flex flex-wrap justify-center gap-6 text-gray-300">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-5 h-5 text-orange" />
                                <span className="font-medium">December 14, 2025</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-5 h-5 text-orange" />
                                <span className="font-medium">10:00 AM to 6:00 PM IST</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin className="w-5 h-5 text-orange" />
                                <span className="font-medium">India International Centre, New Delhi</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* About the Awards */}
            <div className="container-custom py-20">
                <div className="max-w-3xl mx-auto text-center mb-20">
                    <span className="text-orange font-black tracking-[0.3em] uppercase text-xs mb-4 block">
                        About the Awards
                    </span>
                    <h2 className="text-3xl md:text-4xl font-black text-[#111827] mb-6">
                        Celebrating Excellence in Dharmic Service
                    </h2>
                    <p className="text-lg text-gray-600 leading-relaxed">
                        The Dharmalankaran Awards are KGF Bharat&apos;s flagship recognition program. Established to celebrate individuals and organizations that exemplify the values of Dharma in their work, these awards highlight contributions across education, technology, community service, and youth leadership.
                    </p>
                </div>

                {/* Highlights */}
                <div className="max-w-2xl mx-auto mb-20">
                    <h3 className="text-xl font-black text-[#111827] mb-6 text-center">Event Highlights</h3>
                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                        <ul className="space-y-4">
                            {highlights.map((highlight, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-orange shrink-0 mt-0.5" />
                                    <span className="text-gray-600">{highlight}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Award Categories */}
                <div className="mb-20">
                    <div className="text-center mb-12">
                        <span className="text-orange font-black tracking-[0.3em] uppercase text-xs mb-4 block">
                            Recognition
                        </span>
                        <h2 className="text-3xl md:text-4xl font-black text-[#111827]">
                            Award Categories
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {categories.map((category, i) => {
                            const Icon = category.icon
                            return (
                                <div
                                    key={category.title}
                                    className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-orange/20 transition-all"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-orange/10 flex items-center justify-center mb-4">
                                        <Icon className="w-6 h-6 text-orange" />
                                    </div>
                                    <h3 className="text-lg font-black text-[#111827] mb-2">{category.title}</h3>
                                    <p className="text-gray-500 text-sm">{category.description}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* Past Honorees Placeholder */}
                <div className="mb-20">
                    <div className="text-center mb-12">
                        <span className="text-orange font-black tracking-[0.3em] uppercase text-xs mb-4 block">
                            Our Honorees
                        </span>
                        <h2 className="text-3xl md:text-4xl font-black text-[#111827]">
                            Past Honourees
                        </h2>
                    </div>

                    <div className="bg-white rounded-2xl p-12 shadow-sm border border-gray-100 text-center">
                        <Award className="w-12 h-12 text-orange/30 mx-auto mb-4" />
                        <p className="text-gray-400 text-lg">
                            Profiles of our esteemed honourees will be published here soon.
                        </p>
                    </div>
                </div>

                {/* Photo Gallery Placeholder */}
                <div className="mb-20">
                    <div className="text-center mb-12">
                        <span className="text-orange font-black tracking-[0.3em] uppercase text-xs mb-4 block">
                            Memories
                        </span>
                        <h2 className="text-3xl md:text-4xl font-black text-[#111827]">
                            Event Gallery
                        </h2>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="aspect-square bg-[#111827]/5 rounded-2xl flex items-center justify-center">
                                <span className="text-gray-300 text-sm font-medium">Photo {i}</span>
                            </div>
                        ))}
                    </div>
                    <p className="text-center text-gray-400 text-sm mt-4">
                        Photos from the ceremony will be uploaded after the event.
                    </p>
                </div>

                {/* How to Nominate */}
                <div className="bg-gradient-to-br from-[#111827] to-[#1F2937] rounded-3xl p-10 sm:p-16 text-white text-center">
                    <h2 className="text-3xl md:text-4xl font-black mb-4 text-white">
                        How to Nominate
                    </h2>
                    <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8">
                        Know someone making exceptional contributions to Dharmic values and society? Nominate them for the Dharmalankaran Awards. Nominations for the next ceremony will open soon.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-bold uppercase tracking-wider text-sm transition-all shadow-lg shadow-red-600/20"
                        >
                            Contact Us to Nominate
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                        <Link
                            href="/events"
                            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-bold uppercase tracking-wider text-sm transition-all border border-white/20"
                        >
                            View All Events
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
