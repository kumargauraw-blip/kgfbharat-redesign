"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
// import { KGFLogo } from "@/components/common/KGFLogo" // We might use a different logo logic here or keep the SVG

const navItems = [
    { name: "Home", href: "/" },
    { name: "Vision", href: "/about" },
    { name: "Courses", href: "/ai-courses" },
    { name: "Contact", href: "/#contact" },
]

export function Navbar() {
    const [isScrolled, setIsScrolled] = React.useState(false)
    const [isOpen, setIsOpen] = React.useState(false)
    const pathname = usePathname()

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <nav className={cn(
            "fixed top-0 left-0 right-0 z-[100] transition-all duration-500",
            isScrolled ? "glass-nav py-3" : "bg-navy py-6"
        )}>
            <div className="container-custom flex items-center justify-between relative h-12">

                {/* Logo Overlapping Container */}
                <div className="flex items-center gap-6 relative">
                    <Link href="/" className="group">
                        <div className={cn(
                            "absolute top-0 transition-all duration-500 transform",
                            isScrolled ? "scale-75 -translate-y-4" : "scale-[1.2] translate-y-6"
                        )}>
                            <div className="bg-white p-1 rounded-2xl shadow-[0_15px_50px_rgba(0,0,0,0.4)] border-[6px] border-orange-light">
                                {/* Using the SVG logo we created earlier as a fallback/placeholder since we don't have the image url constant yet */}
                                <div className="h-24 w-24 flex items-center justify-center">
                                    <img src="/kgf-logo.png" alt="KGF Logo" className="w-full h-full object-contain" />
                                </div>
                            </div>
                        </div>
                    </Link>

                    <div className="ml-28 md:ml-36 hidden sm:block">
                        <h1 className="text-xl md:text-2xl font-black tracking-tighter text-white">
                            KGF <span className="text-orange-light">BHARAT</span>
                        </h1>
                        <p className="text-[8px] uppercase tracking-[0.4em] text-orange-200 font-bold">Kurukshetra Gurukulam Foundation</p>
                    </div>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex items-center gap-10 text-[11px] font-black uppercase tracking-widest text-white/90">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="hover:text-orange-light transition-colors"
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>

                {/* Action Button */}
                <div className="hidden lg:flex items-center gap-4">
                    <Button className="bg-orange hover:bg-white hover:text-navy text-white px-8 py-6 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl border-2 border-orange">
                        Donate Now 🤍
                    </Button>
                </div>

                {/* Mobile Menu Button */}
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        className="text-white hover:text-orange-light"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <span className="sr-only">Open menu</span>
                        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isOpen && (
                <div className="lg:hidden absolute top-full left-0 w-full bg-navy border-b border-orange-light shadow-xl py-4">
                    <div className="space-y-1 px-4">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="block px-4 py-3 text-lg font-black text-white hover:text-orange-light transition-colors"
                                onClick={() => setIsOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}
                        <div className="mt-6 px-4">
                            <Button className="w-full bg-orange text-white font-black" asChild>
                                <Link href="/donate">Donate Now</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    )
}
