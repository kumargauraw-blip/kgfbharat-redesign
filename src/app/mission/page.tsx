import { Metadata } from "next"
import { BookOpen, Hammer, Award, GraduationCap, Building, Trophy, Users, TrendingUp, Star } from "lucide-react"

export const metadata: Metadata = {
    title: "Our Mission | KGF Bharat",
    description: "Discover the three pillars of KGF Bharat: Shiksha (Education), Nirman (Nation Building), and Puraskar (Recognition), driving Dharmic renaissance through technology and tradition.",
}

const pillars = [
    {
        name: "Shiksha",
        sanskrit: "शिक्षा",
        subtitle: "Education",
        icon: BookOpen,
        accentColor: "orange",
        bgColor: "bg-orange/10",
        textColor: "text-orange",
        borderColor: "border-orange/20",
        description:
            "Knowledge is the foundation of a strong society. Through Shiksha, we provide world-class AI and technology courses, digital literacy programs, and Dharmic education that bridges ancient wisdom with modern capability.",
        initiatives: [
            {
                icon: GraduationCap,
                title: "AI Gurukul Courses",
                desc: "Comprehensive AI training programs for students, professionals, and entrepreneurs",
            },
            {
                icon: BookOpen,
                title: "Digital Literacy Drives",
                desc: "Technology education reaching rural and semi-urban communities across Bharat",
            },
            {
                icon: Users,
                title: "Dharmic Study Circles",
                desc: "Regular study groups exploring the Gita, Vedas, and Itihasa through modern pedagogy",
            },
        ],
        stats: [
            { value: "1,000+", label: "Students Trained" },
            { value: "12", label: "Courses Offered" },
            { value: "15+", label: "Cities Reached" },
        ],
    },
    {
        name: "Nirman",
        sanskrit: "निर्माण",
        subtitle: "Nation Building",
        icon: Hammer,
        accentColor: "blue-600",
        bgColor: "bg-blue-50",
        textColor: "text-blue-600",
        borderColor: "border-blue-200",
        description:
            "Nirman is our commitment to building the infrastructure for a self-reliant Bharat. From skill development centers to institutional support, we create the physical and human foundations for a thriving Dharmic society.",
        initiatives: [
            {
                icon: Building,
                title: "Skill Development Centres",
                desc: "Hands-on training hubs for employment-ready skills in technology and traditional crafts",
            },
            {
                icon: TrendingUp,
                title: "Startup Mentorship",
                desc: "Supporting Dharmic entrepreneurs with guidance, networking, and early-stage resources",
            },
            {
                icon: Users,
                title: "Community Empowerment",
                desc: "Programs that uplift communities through self-employment and cooperative enterprises",
            },
        ],
        stats: [
            { value: "500+", label: "Jobs Created" },
            { value: "8", label: "Centres Planned" },
            { value: "50+", label: "Mentors Active" },
        ],
    },
    {
        name: "Puraskar",
        sanskrit: "पुरस्कार",
        subtitle: "Recognition",
        icon: Award,
        accentColor: "yellow-600",
        bgColor: "bg-yellow-50",
        textColor: "text-yellow-600",
        borderColor: "border-yellow-200",
        description:
            "Puraskar honors those who have made extraordinary contributions to Dharmic values, education, and social impact. Through the Dharmalankaran Awards and other recognitions, we celebrate excellence and inspire the next generation.",
        initiatives: [
            {
                icon: Trophy,
                title: "Dharmalankaran Awards",
                desc: "Annual national ceremony recognizing leaders in education, technology, and Dharmic service",
            },
            {
                icon: Star,
                title: "Youth Excellence Program",
                desc: "Identifying and supporting exceptional young talent working towards Dharmic causes",
            },
            {
                icon: Award,
                title: "Institutional Honours",
                desc: "Recognizing organizations making significant impact in preserving and promoting Dharmic heritage",
            },
        ],
        stats: [
            { value: "25+", label: "Awards Given" },
            { value: "5", label: "Award Categories" },
            { value: "200+", label: "Nominees Yearly" },
        ],
    },
]

export default function MissionPage() {
    return (
        <div className="min-h-screen bg-off-white">
            {/* Hero */}
            <div className="bg-navy text-white py-24 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-orange/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />

                <div className="container-custom relative z-10">
                    <div className="max-w-3xl">
                        <span className="text-orange font-black tracking-[0.3em] uppercase text-xs mb-4 block">
                            Our Foundation
                        </span>
                        <h1 className="text-4xl md:text-6xl font-black mb-6 leading-[1.1] text-white">
                            Three Pillars of KGF Bharat
                        </h1>
                        <p className="text-xl text-gray-300 leading-relaxed">
                            The Kurukshetra Gurukulam Foundation is built on three pillars that guide every initiative, program, and decision we make in service of Dharmic society.
                        </p>
                    </div>
                </div>
            </div>

            {/* Pillars */}
            <div className="container-custom py-16 space-y-24">
                {pillars.map((pillar, index) => {
                    const PillarIcon = pillar.icon
                    return (
                        <section key={pillar.name} className="scroll-mt-24">
                            <div className={`grid lg:grid-cols-2 gap-12 items-start ${index % 2 === 1 ? "lg:flex-row-reverse" : ""}`}>
                                {/* Left: Content */}
                                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className={`w-16 h-16 rounded-2xl ${pillar.bgColor} flex items-center justify-center`}>
                                            <PillarIcon className={`w-8 h-8 ${pillar.textColor}`} strokeWidth={2.5} />
                                        </div>
                                        <div>
                                            <h2 className="text-4xl md:text-5xl font-black text-navy leading-none">
                                                {pillar.name}{" "}
                                                <span className={`${pillar.textColor} font-serif italic font-normal text-3xl`}>
                                                    ({pillar.sanskrit})
                                                </span>
                                            </h2>
                                            <p className="text-gray-400 font-bold uppercase tracking-widest text-xs mt-1">
                                                {pillar.subtitle}
                                            </p>
                                        </div>
                                    </div>

                                    <p className="text-lg text-gray-600 leading-relaxed mb-8">
                                        {pillar.description}
                                    </p>

                                    {/* Stats */}
                                    <div className="grid grid-cols-3 gap-4 mb-8">
                                        {pillar.stats.map((stat) => (
                                            <div key={stat.label} className="text-center bg-white rounded-xl p-4 border border-gray-100">
                                                <div className={`text-2xl font-black ${pillar.textColor}`}>{stat.value}</div>
                                                <div className="text-xs text-gray-400 font-bold uppercase tracking-wider mt-1">
                                                    {stat.label}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Right: Initiatives */}
                                <div className={`space-y-4 ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                                    <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-6">
                                        Key Initiatives
                                    </h3>
                                    {pillar.initiatives.map((initiative) => {
                                        const InitIcon = initiative.icon
                                        return (
                                            <div
                                                key={initiative.title}
                                                className={`bg-white p-6 rounded-2xl shadow-sm border ${pillar.borderColor} hover:shadow-md transition-shadow`}
                                            >
                                                <div className="flex gap-4 items-start">
                                                    <div className={`w-12 h-12 shrink-0 rounded-xl ${pillar.bgColor} flex items-center justify-center`}>
                                                        <InitIcon className={`w-6 h-6 ${pillar.textColor}`} />
                                                    </div>
                                                    <div>
                                                        <h4 className="font-black text-navy text-lg">{initiative.title}</h4>
                                                        <p className="text-gray-500 mt-1">{initiative.desc}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>

                            {index < pillars.length - 1 && (
                                <div className="border-b border-gray-200 mt-24" />
                            )}
                        </section>
                    )
                })}
            </div>

            {/* CTA */}
            <div className="bg-navy text-white py-20">
                <div className="container-custom text-center">
                    <h2 className="text-3xl md:text-4xl font-black mb-4 text-white">
                        Join the Movement
                    </h2>
                    <p className="text-gray-300 text-lg max-w-xl mx-auto mb-8">
                        Whether through education, building, or recognition, there is a place for you in the KGF Bharat mission.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <a
                            href="/ai-courses"
                            className="bg-orange hover:bg-orange-light text-white px-8 py-4 rounded-xl font-bold uppercase tracking-wider text-sm transition-all shadow-lg shadow-orange/20"
                        >
                            Explore Courses
                        </a>
                        <a
                            href="/donate"
                            className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-bold uppercase tracking-wider text-sm transition-all border border-white/20"
                        >
                            Support Us
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}
