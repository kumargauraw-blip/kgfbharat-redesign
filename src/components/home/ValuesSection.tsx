import { BookOpen, Hammer, Award, ArrowRight } from "lucide-react"
import Link from "next/link"

export function ValuesSection() {
    return (
        <section id="about" className="py-32 bg-[#FAF9F6] relative overflow-hidden">
            <div className="container-custom relative z-10">
                <div className="grid lg:grid-cols-12 gap-16 items-start">

                    {/* Left Content Column */}
                    <div className="lg:col-span-5 space-y-8 sticky top-32">
                        <div className="space-y-4">
                            <span className="text-orange font-black uppercase tracking-[0.3em] text-xs">Our Core Values</span>
                            <h2 className="text-5xl md:text-6xl font-black text-navy leading-[1.1] tracking-tighter">
                                What are the Three <span className="text-orange italic">Aims</span> of KGF?
                            </h2>
                        </div>

                        <p className="text-xl text-gray-600 font-medium leading-relaxed">
                            The Kurukshetra Gurukulam Foundation (KGF) is on a mission to fortify the Sanatana society through three foundational pillars that ensure we are rooted in the past and ready for the future.
                        </p>

                        <div className="pt-6">
                            <Link href="/about" className="group bg-orange hover:bg-navy text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-sm transition-all shadow-2xl shadow-orange/20 flex items-center gap-4 w-fit">
                                Support Our Mission
                                <span className="text-2xl group-hover:translate-x-2 transition-transform">&rarr;</span>
                            </Link>
                        </div>
                    </div>

                    {/* Right Pillars Column */}
                    <div className="lg:col-span-7 grid gap-8">
                        {/* Shiksha Card */}
                        <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-gray-100 hover:border-orange-200 transition-all group">
                            <div className="flex gap-8 items-start flex-col sm:flex-row">
                                <div className="w-20 h-20 shrink-0 bg-orange/10 rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                    {/* Inline SVG from original or Lucide equivalent */}
                                    <BookOpen className="w-10 h-10 text-orange" strokeWidth={2.5} />
                                </div>
                                <div className="space-y-4">
                                    <h3 className="text-3xl font-black text-navy">Shiksha <span className="text-orange font-serif italic font-normal">(शिक्षा)</span></h3>
                                    <p className="text-gray-500 font-medium leading-relaxed text-lg">
                                        Knowledge is our greatest heritage. We provide structured, world-class education in <span className="text-navy font-bold">Sanatana Dharma, Gita, and Itihasa</span>, blended with modern fields like <span className="text-navy font-bold">Diplomacy, Economics, and Political Science</span>. We equip every age group to understand and apply spiritual essence in every sphere of life.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Nirman Card */}
                        <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-gray-100 hover:border-blue-200 transition-all group">
                            <div className="flex gap-8 items-start flex-col sm:flex-row">
                                <div className="w-20 h-20 shrink-0 bg-blue-50 rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <Hammer className="w-10 h-10 text-blue-600" strokeWidth={2.5} />
                                </div>
                                <div className="space-y-4">
                                    <h3 className="text-3xl font-black text-navy">Nirman <span className="text-blue-600 font-serif italic font-normal">(निर्माण)</span></h3>
                                    <p className="text-gray-500 font-medium leading-relaxed text-lg">
                                        The Architecture of Empowerment. KGF focuses on the physical development of <span className="text-navy font-bold">Sanatan Institutions</span>—from Schools and Sports Academies to Ayurvedic Hospitals, Gaushaalas, and Libraries. We revive ancient temples and build new hubs for a self-sustaining, confident, and empowered society.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Puraskar Card */}
                        <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-gray-100 hover:border-yellow-200 transition-all group">
                            <div className="flex gap-8 items-start flex-col sm:flex-row">
                                <div className="w-20 h-20 shrink-0 bg-yellow-50 rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <Award className="w-10 h-10 text-yellow-600" strokeWidth={2.5} />
                                </div>
                                <div className="space-y-4">
                                    <h3 className="text-3xl font-black text-navy">Puraskar <span className="text-yellow-600 font-serif italic font-normal">(पुरस्कार)</span></h3>
                                    <p className="text-gray-500 font-medium leading-relaxed text-lg">
                                        Honoring our Heroes. Puraskar is our way of recognizing outstanding contributors to <span className="text-navy font-bold">Sanatan Dharma, education, and social service</span>. By celebrating these role models, we inspire the youth to dedicate themselves to the renaissance of our glorious society.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
