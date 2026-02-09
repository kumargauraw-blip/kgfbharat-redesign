"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen } from "lucide-react"

export function Hero() {
    return (
        <section id="home" className="relative min-h-[95vh] flex items-center pt-32 overflow-hidden bg-white">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-navy/5 -skew-x-12 translate-x-12"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-orange-100/50 blur-[140px] rounded-full -z-10"></div>

            <div className="container-custom relative z-10">
                <div className="grid lg:grid-cols-2 items-center gap-20">
                    <div className="space-y-12 text-center lg:text-left">
                        <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-orange-50 border border-orange-100 shadow-sm mx-auto lg:mx-0">
                            <span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span>
                            <span className="text-[11px] font-black uppercase tracking-widest text-orange-700">Protecting Tradition. Engineering Progress.</span>
                        </div>

                        <div className="space-y-6">
                            <h2 className="text-navy/60 text-2xl md:text-3xl font-serif italic font-semibold">
                                धर्मक्षेत्रे कुरुक्षेत्रे...
                            </h2>
                            <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-[1.05] tracking-tighter text-navy">
                                <span className="font-serif">Ancient <span className="gradient-text">Wisdom</span></span><br />
                                Meets <span className="ai-gradient-text">Modern Intelligence.</span>
                            </h1>
                        </div>

                        <p className="text-xl md:text-2xl text-gray-500 max-w-2xl font-medium leading-relaxed mx-auto lg:mx-0">
                            KGF Bharat prepares the visionaries of tomorrow by anchoring them in Sanatana ethics while mastering the most powerful technology of the 21st century.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start">
                            <Link href="/ai-courses" className="w-full sm:w-auto px-12 py-6 bg-navy text-white rounded-[2rem] font-black text-sm uppercase tracking-widest hover:bg-orange-500 transition-all shadow-[0_20px_40px_rgba(26,35,126,0.3)] hover:-translate-y-1 text-center">
                                Explore Curriculums
                            </Link>
                            <Link href="/about" className="w-full sm:w-auto px-12 py-6 bg-white text-navy border-2 border-navy/10 rounded-[2rem] font-black text-sm uppercase tracking-widest hover:bg-gray-50 transition-all text-center">
                                Our Impact
                            </Link>
                        </div>
                    </div>

                    <div className="relative hidden lg:block">
                        <div className="relative z-10 rounded-[4rem] overflow-hidden shadow-2xl border-[12px] border-white animate-float transform rotate-2 h-[600px]">
                            {/* Using a placeholder image or the one from the design if accessible. For now, using a reliable placeholder that fits the theme */}
                            <img
                                src="https://images.unsplash.com/photo-1542332213-31f87348057f?auto=format&fit=crop&q=80&w=1200"
                                alt="Traditional Wisdom"
                                className="w-full h-full object-cover grayscale-[30%] hover:grayscale-0 transition-all duration-1000"
                            />
                        </div>
                        <div className="absolute -top-10 -right-10 bg-white p-8 rounded-[2.5rem] shadow-2xl z-20 border border-gray-100 text-center animate-pulse">
                            <p className="text-4xl font-black text-blue-600 leading-none mb-1">AI</p>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Mastery</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
