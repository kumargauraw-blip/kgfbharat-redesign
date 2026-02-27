import type { Metadata } from "next"
import { Users, BookOpen, Award, Hammer, Heart, ArrowRight } from "lucide-react"
import Link from "next/link"
import { TeamMember } from "@/lib/types"

export const metadata: Metadata = {
    title: "About Us | KGF Bharat",
    description:
        "Learn about KGF Bharat, our mission to bridge Dharmic wisdom with modern technology, and the team driving the movement for a self-reliant Bharat.",
    openGraph: {
        title: "About KGF Bharat",
        description:
            "Building a new generation of creators and engineers who blend modern AI technology with ancient Dharmic wisdom.",
    },
}

const teamMembers: TeamMember[] = [
    {
        name: "Sandeep Deo",
        role: "Founder and Chairman",
        initials: "SD",
        description: "Visionary behind KGF Bharat and the movement for Dharmic renaissance. Leading the foundation's mission to build a self-reliant, culturally rooted society.",
    },
    {
        name: "Kamal Rawat",
        role: "Course Controller",
        initials: "KR",
        description: "Overseeing academic rigor, curriculum development, and student success across all KGF Bharat education programs.",
    },
    {
        name: "Shweta Deo",
        role: "Director",
        initials: "SD",
        description: "Managing operations, institutional strategy, and partnerships to expand the reach and impact of KGF Bharat.",
    },
    {
        name: "Kumar Gauraw",
        role: "Lead AI Instructor",
        initials: "KG",
        description: "Founder of Krishna Worldwide LLC. AI expert and architect leading the technology education curriculum.",
    },
    {
        name: "Ananya Sharma",
        role: "Community Coordinator",
        initials: "AS",
        description: "Building and nurturing the KGF Bharat community across cities, managing events, volunteer programs, and outreach initiatives.",
    },
    {
        name: "Rajesh Verma",
        role: "Technology Lead",
        initials: "RV",
        description: "Driving the digital infrastructure and technology platforms that power KGF Bharat's online learning and community engagement.",
    },
]

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-off-white">
            {/* Hero */}
            <div className="bg-navy text-white py-24 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-64 h-64 bg-orange/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

                <div className="container-custom relative z-10">
                    <div className="max-w-3xl">
                        <span className="text-orange font-black tracking-[0.3em] uppercase text-xs mb-4 block">
                            Who We Are
                        </span>
                        <h1 className="text-4xl md:text-6xl font-black mb-6 leading-[1.1] text-white">
                            The Sattvic Technologist
                        </h1>
                        <p className="text-xl text-gray-300 leading-relaxed">
                            We are building a new generation of creators and engineers who blend modern AI technology with ancient Dharmic wisdom, creating a future rooted in values and powered by innovation.
                        </p>
                    </div>
                </div>
            </div>

            {/* Mission Pillars */}
            <div className="container-custom py-20">
                <div className="text-center mb-16">
                    <span className="text-orange font-black tracking-[0.3em] uppercase text-xs mb-4 block">
                        Our Foundation
                    </span>
                    <h2 className="text-3xl md:text-4xl font-black text-navy">
                        Three Pillars of KGF
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
                        <div className="mx-auto w-16 h-16 bg-orange/10 rounded-2xl flex items-center justify-center mb-4">
                            <BookOpen className="h-8 w-8 text-orange" />
                        </div>
                        <h3 className="text-2xl font-black text-navy mb-2">Shiksha</h3>
                        <p className="text-gray-500">
                            Education that liberates. We provide world-class technical training rooted in ethical foundations and Dharmic wisdom.
                        </p>
                    </div>

                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
                        <div className="mx-auto w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-4">
                            <Hammer className="h-8 w-8 text-blue-600" />
                        </div>
                        <h3 className="text-2xl font-black text-navy mb-2">Nirman</h3>
                        <p className="text-gray-500">
                            Building for society. We foster a community of builders who create tools and institutions for the betterment of Bharat.
                        </p>
                    </div>

                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
                        <div className="mx-auto w-16 h-16 bg-yellow-50 rounded-2xl flex items-center justify-center mb-4">
                            <Award className="h-8 w-8 text-yellow-600" />
                        </div>
                        <h3 className="text-2xl font-black text-navy mb-2">Puraskar</h3>
                        <p className="text-gray-500">
                            Honoring excellence. Recognizing outstanding achievements in the fields of Dharmic technology, education, and social impact.
                        </p>
                    </div>
                </div>

                <div className="text-center mt-10">
                    <Link
                        href="/mission"
                        className="inline-flex items-center gap-2 text-orange font-bold hover:gap-3 transition-all"
                    >
                        Learn more about our mission
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>

            {/* Our Story */}
            <div className="bg-white py-20">
                <div className="container-custom">
                    <div className="max-w-3xl mx-auto text-center">
                        <span className="text-orange font-black tracking-[0.3em] uppercase text-xs mb-4 block">
                            Our Story
                        </span>
                        <h2 className="text-3xl md:text-4xl font-black text-navy mb-6">
                            Rooted in Tradition, Ready for the Future
                        </h2>
                        <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
                            <p>
                                The Kurukshetra Gurukulam Foundation (KGF) was established with a singular vision: to revive the spirit of the ancient Gurukul system while embracing the transformative power of modern technology.
                            </p>
                            <p>
                                Named after the sacred land of Kurukshetra, where the Bhagavad Gita was revealed, KGF Bharat seeks to be the modern-day battlefield for knowledge, where every student and professional becomes equipped to serve Dharma through skill, wisdom, and integrity.
                            </p>
                            <p>
                                From AI education to community building, from national awards to startup mentorship, KGF Bharat is creating an ecosystem where tradition and technology thrive together.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Team Section */}
            <div className="container-custom py-20">
                <div className="text-center mb-16">
                    <span className="text-orange font-black tracking-[0.3em] uppercase text-xs mb-4 block">
                        The People Behind KGF
                    </span>
                    <h2 className="text-3xl md:text-4xl font-black text-navy">
                        Leadership and Team
                    </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {teamMembers.map((member) => (
                        <div
                            key={member.name}
                            className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md hover:border-orange/20 transition-all"
                        >
                            <div className="w-20 h-20 bg-navy rounded-2xl mx-auto mb-5 flex items-center justify-center">
                                <span className="text-white text-xl font-black">{member.initials}</span>
                            </div>
                            <h3 className="text-lg font-black text-navy">{member.name}</h3>
                            <p className="text-orange text-sm font-bold mb-3">{member.role}</p>
                            <p className="text-gray-500 text-sm leading-relaxed">{member.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* CTA */}
            <div className="bg-navy text-white py-20">
                <div className="container-custom text-center">
                    <Heart className="w-10 h-10 text-orange mx-auto mb-6" />
                    <h2 className="text-3xl md:text-4xl font-black mb-4 text-white">
                        Join the Movement
                    </h2>
                    <p className="text-gray-300 text-lg max-w-xl mx-auto mb-8">
                        Be part of the Dharmic renaissance. Whether you are a student, professional, or supporter, there is a place for you.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link
                            href="/ai-courses"
                            className="bg-orange hover:bg-orange-light text-white px-8 py-4 rounded-xl font-bold uppercase tracking-wider text-sm transition-all shadow-lg shadow-orange/20"
                        >
                            Explore Courses
                        </Link>
                        <Link
                            href="/donate"
                            className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-bold uppercase tracking-wider text-sm transition-all border border-white/20"
                        >
                            Support Us
                        </Link>
                        <Link
                            href="/contact"
                            className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-bold uppercase tracking-wider text-sm transition-all border border-white/20"
                        >
                            Get in Touch
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
