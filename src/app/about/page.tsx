import type { Metadata } from "next"
import { Users, BookOpen, Award, Hammer, Heart, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { TeamMember } from "@/lib/types"

export const metadata: Metadata = {
    title: "About Us | KGF Bharat",
    description:
        "Learn about Kurukshetra Gurukulam Foundation (KGF), established to reawaken Dharmakshetra for Sanatan Dharmis through Shiksha, Samman, and Nirman.",
    openGraph: {
        title: "About KGF Bharat",
        description:
            "Kurukshetra Gurukulam Foundation (KGF) has been established to reawaken Dharmakshetra for the Sanatan Dharmis through Shiksha, Samman, and Nirman.",
    },
}

const teamMembers: TeamMember[] = [
    // Row 1
    {
        name: "Ssandeep Deo",
        role: "Founder President",
        initials: "SD",
        imageUrl: "/team/ssandeep-deo.png",
        description: "A journalist of 25 years, a sharp writer with 9 books, bestselling author, a publisher through Kapot Media, an entrepreneur with a mission through Kurukshetra Gurukulam Foundation (KGF).",
    },
    {
        name: "Shweta Deo",
        role: "Director",
        initials: "SD",
        imageUrl: "/team/shweta-deo.png",
        description: "She holds a BSc (Chemistry Hons.) and serves as Director of Kurukchetra Gurukulam Foundation (KGF) and MD of Kapot Media Network LLP. She is an inspiration to the entire KGF team and drives all of our endeavours.",
    },
    {
        name: "Amardeep Deo",
        role: "Admin",
        initials: "AD",
        imageUrl: "/team/amardeep-deo.jpg",
        description: "Highly organized Administrator dedicated to supporting the KGF mission through seamless office management and effective external communication.",
    },
    // Row 2
    {
        name: "Kamal Rawat",
        role: "Course Controller",
        initials: "KR",
        imageUrl: "/team/kamal-rawat.jpg",
        description: "He is a software developer, trainer, author, and an entrepreneur. He has first-hand experience of implementing full life cycle of large scale applications across various domains and platforms.",
    },
    {
        name: "Raakesh Ojha",
        role: "IT Head",
        initials: "RO",
        imageUrl: "/team/raakesh-ojha.jpg",
        description: "IT Professional with over a decade of hardcore experience in various domain ranging from Intl. business development, project management, to solution architects in Blockchain technology, Metaverse, NFTs, AI/ML and IoT ecosystem.",
    },
    {
        name: "Dr. Chetan Maan",
        role: "Management",
        initials: "CM",
        imageUrl: "/team/dr-chetan-maan.jpg",
        description: "A results-driven Management professional overseeing the operation and leading teams at KGF. Adept at implementing effective processes to ensure KGF meets its goals and mission.",
    },
]

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero */}
            <div className="text-white pt-14 pb-28 relative overflow-hidden" style={{ background: "linear-gradient(to bottom, #cd5600 0%, #e07020 30%, #f0a060 60%, #fff5eb 90%, white 100%)" }}>
                <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

                <div className="container-custom relative z-10">
                    <div className="max-w-5xl">
                        <span className="text-yellow-300 font-black tracking-[0.3em] uppercase text-xs mb-4 block">
                            Who We Are
                        </span>
                        <h1 className="text-4xl md:text-6xl font-black mb-6 leading-[1.1] text-white">
                            Kurukshetra Gurukulam Foundation
                        </h1>
                        <p className="text-xl text-[#111827] leading-relaxed">
                            Reawakening Dharmakshetra for Sanatan Dharmis through Shiksha, Samman, and Nirman.
                        </p>
                    </div>
                </div>
            </div>

            {/* Our Story */}
            <div className="bg-white py-24">
                <div className="container-custom">
                    <div className="max-w-5xl mx-auto text-center">
                        <span className="text-orange font-black tracking-[0.3em] uppercase text-xs mb-4 block">
                            Our Story
                        </span>
                        <h2 className="text-3xl md:text-4xl font-black text-[#111827] mb-8">
                            Rooted in Dharma, Built for All
                        </h2>
                        <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                            <p>
                                Kurukshetra Gurukulam Foundation (KGF) has been established to reawaken Dharmakshetra for the Sanatan Dharmis. This Gurukulam is different from the traditional Gurukuls, in which only the study and teaching of young students was arranged. This Gurukulam is for both men and women of all age groups. Its aim is to Strengthen the Sanatan society through Shiksha, Samman, and Nirman.
                            </p>
                            <p>
                                Kurukshetra has been called Dharmakshetra because it is blessed by Bhagwan Vishnu. According to Vaman Purana, King Kuru cultivated the Mahadharmas here, for which he sacrificed his body as a seed and Prabhu Vishnu sowed that seed. This is why Kurukshetra is called Dharmakshetra.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Decorative Divider */}
            <div className="flex items-center justify-center py-2">
                <div className="h-px w-16 bg-orange/30" />
                <div className="mx-4 w-2 h-2 rounded-full bg-orange/40" />
                <div className="h-px w-16 bg-orange/30" />
            </div>

            {/* Three Pillars */}
            <div className="container-custom py-24">
                <div className="text-center mb-16">
                    <span className="text-orange font-black tracking-[0.3em] uppercase text-xs mb-4 block">
                        Our Foundation
                    </span>
                    <h2 className="text-3xl md:text-4xl font-black text-[#111827]">
                        Three Pillars of KGF
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
                        <div className="mx-auto w-16 h-16 bg-orange/10 rounded-2xl flex items-center justify-center mb-6">
                            <BookOpen className="h-8 w-8 text-orange" />
                        </div>
                        <h3 className="text-2xl font-black text-[#111827] mb-3">Shiksha</h3>
                        <p className="text-gray-500 leading-relaxed">
                            KGF offers courses in Sanatan Dharma, Gita, Itihasa, Diplomacy, Political Science, Economics, Culture and Physical Training, presented in today&apos;s context.
                        </p>
                    </div>

                    <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
                        <div className="mx-auto w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center mb-6">
                            <Hammer className="h-8 w-8 text-amber-700" />
                        </div>
                        <h3 className="text-2xl font-black text-[#111827] mb-3">Nirman</h3>
                        <p className="text-gray-500 leading-relaxed">
                            Through Nirman (Development), KGF focuses on the creation and development of Sanatan institutions that strengthen society.
                        </p>
                    </div>

                    <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
                        <div className="mx-auto w-16 h-16 bg-yellow-50 rounded-2xl flex items-center justify-center mb-6">
                            <Award className="h-8 w-8 text-yellow-600" />
                        </div>
                        <h3 className="text-2xl font-black text-[#111827] mb-3">Samman</h3>
                        <p className="text-gray-500 leading-relaxed">
                            Samman (Awards) is KGF&apos;s way of honoring outstanding contributors to Sanatan Dharma, culture, social service, education, and national pride.
                        </p>
                    </div>
                </div>

                <div className="text-center mt-12">
                    <Link
                        href="/mission"
                        className="inline-flex items-center gap-2 text-orange font-bold hover:gap-3 transition-all"
                    >
                        Learn more about our mission
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>

            {/* Decorative Divider */}
            <div className="flex items-center justify-center py-2">
                <div className="h-px w-16 bg-orange/30" />
                <div className="mx-4 w-2 h-2 rounded-full bg-orange/40" />
                <div className="h-px w-16 bg-orange/30" />
            </div>

            {/* Team Section */}
            <div className="container-custom py-24">
                <div className="text-center mb-16">
                    <span className="text-orange font-black tracking-[0.3em] uppercase text-xs mb-4 block">
                        The People Behind KGF
                    </span>
                    <h2 className="text-3xl md:text-4xl font-black text-[#111827]">
                        Leadership and Team
                    </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    {teamMembers.map((member) => (
                        <div
                            key={member.name}
                            className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md hover:border-orange/20 transition-all"
                        >
                            <div className="w-28 h-28 rounded-full mx-auto mb-6 overflow-hidden bg-gray-100">
                                {member.imageUrl ? (
                                    <Image src={member.imageUrl} alt={member.name} width={112} height={112} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full bg-[#111827] flex items-center justify-center">
                                        <span className="text-white text-2xl font-black">{member.initials}</span>
                                    </div>
                                )}
                            </div>
                            <h3 className="text-xl font-black text-[#111827]">{member.name}</h3>
                            <p className="text-orange text-sm font-bold mb-4">{member.role}</p>
                            <p className="text-gray-500 text-sm leading-relaxed">{member.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* CTA */}
            <div className="bg-[#111827] text-white py-20">
                <div className="container-custom text-center">
                    <Heart className="w-10 h-10 text-orange mx-auto mb-6" />
                    <h2 className="text-3xl md:text-4xl font-black mb-4 text-white">
                        Join the Movement
                    </h2>
                    <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8">
                        Be part of the Dharmic renaissance. Whether you are a student, professional, or supporter, there is a place for you.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link
                            href="/ai-courses"
                            className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-bold uppercase tracking-wider text-sm transition-all shadow-lg shadow-red-600/20"
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
