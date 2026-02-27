import Link from "next/link"
import { Mail, Phone, MapPin } from "lucide-react"

const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Mission", href: "/mission" },
    { name: "AI Courses", href: "/ai-courses" },
    { name: "Events", href: "/events" },
    { name: "Gallery", href: "/gallery" },
    { name: "Contact", href: "/contact" },
]

const socialLinks = [
    {
        name: "Facebook",
        href: "#",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
        ),
    },
    {
        name: "X (Twitter)",
        href: "#",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4l11.733 16h4.267l-11.733 -16h-4.267z" />
                <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
            </svg>
        ),
    },
    {
        name: "LinkedIn",
        href: "#",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
            </svg>
        ),
    },
    {
        name: "YouTube",
        href: "#",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                <path d="m10 15 5-3-5-3z" />
            </svg>
        ),
    },
    {
        name: "Instagram",
        href: "#",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
            </svg>
        ),
    },
]

export function Footer() {
    return (
        <footer className="pt-24 pb-12 bg-[#001033] text-white">
            <div className="container-custom">
                {/* Main Footer Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-12">
                    {/* KGF Bharat Branding */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="bg-white p-1.5 rounded-xl">
                                <div className="h-12 w-12 flex items-center justify-center">
                                    <img
                                        src="/kgf-logo.png"
                                        alt="KGF Logo"
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                            </div>
                            <div>
                                <h4 className="text-2xl font-black tracking-tighter">
                                    KGF BHARAT
                                </h4>
                                <p className="text-[9px] font-bold text-orange uppercase tracking-widest">
                                    Kurukshetra Gurukulam Foundation
                                </p>
                            </div>
                        </div>
                        <p className="text-white/60 text-sm font-medium leading-relaxed">
                            We are not just a foundation; we are an ecosystem
                            for those who refuse to choose between their roots
                            and their potential.
                        </p>

                        {/* Social Links */}
                        <div className="flex gap-3">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    aria-label={social.name}
                                    className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-orange cursor-pointer transition-all border border-white/10 text-white/80 hover:text-white"
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h5 className="font-black text-orange mb-8 uppercase tracking-[0.2em] text-xs">
                            Quick Links
                        </h5>
                        <ul className="space-y-3">
                            {quickLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-white/70 hover:text-orange transition-colors text-sm font-semibold"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h5 className="font-black text-orange mb-8 uppercase tracking-[0.2em] text-xs">
                            Contact Us
                        </h5>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <Mail className="h-4 w-4 text-orange mt-0.5 shrink-0" />
                                <a
                                    href="mailto:info@kgfbharat.org"
                                    className="text-white/70 hover:text-orange transition-colors text-sm font-semibold"
                                >
                                    info@kgfbharat.org
                                </a>
                            </li>
                            <li className="flex items-start gap-3">
                                <Phone className="h-4 w-4 text-orange mt-0.5 shrink-0" />
                                <span className="text-white/70 text-sm font-semibold">
                                    +91 98765 43210
                                </span>
                            </li>
                            <li className="flex items-start gap-3">
                                <MapPin className="h-4 w-4 text-orange mt-0.5 shrink-0" />
                                <span className="text-white/70 text-sm font-semibold">
                                    Bengaluru HQ, Karnataka, Bharat
                                </span>
                            </li>
                        </ul>
                    </div>

                    {/* Technology Partner */}
                    <div>
                        <h5 className="font-black text-orange mb-8 uppercase tracking-[0.2em] text-xs">
                            Technology Partner
                        </h5>
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
                            <p className="text-xl font-black tracking-tight">
                                Krishna Worldwide
                            </p>
                            <p className="text-[9px] font-bold text-orange uppercase tracking-widest">
                                Technology Solutions
                            </p>
                            <p className="text-white/50 text-xs leading-relaxed">
                                Powering KGF Bharat's AI curriculum and
                                technology initiatives. Expert-led courses
                                designed for the modern workforce.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-white/40 font-bold uppercase tracking-[0.2em] text-center md:text-left">
                        &copy; 2026 Kurukshetra Gurukulam Foundation. All
                        rights reserved.
                    </p>
                    <p className="text-xs text-white/30 font-semibold uppercase tracking-wider text-center md:text-right">
                        Sanatana. Sovereign. Smart.
                    </p>
                </div>
            </div>
        </footer>
    )
}
