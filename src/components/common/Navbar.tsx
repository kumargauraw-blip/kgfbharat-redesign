"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, ChevronDown, Heart } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface NavItem {
    name: string
    href: string
    children?: { name: string; href: string }[]
}

const navItems: NavItem[] = [
    { name: "Home", href: "/" },
    {
        name: "About",
        href: "/about",
        children: [
            { name: "About Us", href: "/about" },
            { name: "Our Mission", href: "/mission" },
        ],
    },
    { name: "AI Courses", href: "/ai-courses" },
    { name: "Events", href: "/events" },
    { name: "Gallery", href: "/gallery" },
    { name: "Corporate Training", href: "/corporate-training" },
    { name: "Contact", href: "/contact" },
]

// All links for mobile (flat list)
const mobileNavItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Mission", href: "/mission" },
    { name: "AI Courses", href: "/ai-courses" },
    { name: "Events", href: "/events" },
    { name: "Gallery", href: "/gallery" },
    { name: "Corporate Training", href: "/corporate-training" },
    { name: "Contact", href: "/contact" },
]

function DesktopDropdown({
    item,
    pathname,
}: {
    item: NavItem
    pathname: string
}) {
    const [open, setOpen] = React.useState(false)
    const timeoutRef = React.useRef<NodeJS.Timeout | null>(null)

    const isActive =
        item.children?.some((child) => pathname === child.href) ||
        pathname === item.href

    const handleMouseEnter = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current)
        setOpen(true)
    }

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => setOpen(false), 150)
    }

    return (
        <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <button
                className={cn(
                    "flex items-center gap-1 hover:text-orange-light transition-colors",
                    isActive && "text-orange-light"
                )}
            >
                {item.name}
                <ChevronDown
                    className={cn(
                        "h-3 w-3 transition-transform",
                        open && "rotate-180"
                    )}
                />
            </button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 mt-3 w-48 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden py-2"
                    >
                        {item.children?.map((child) => (
                            <Link
                                key={child.href}
                                href={child.href}
                                className={cn(
                                    "block px-5 py-2.5 text-sm font-bold text-navy hover:bg-orange/10 hover:text-orange transition-colors normal-case tracking-normal",
                                    pathname === child.href &&
                                        "text-orange bg-orange/5"
                                )}
                            >
                                {child.name}
                            </Link>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export function Navbar() {
    const [isScrolled, setIsScrolled] = React.useState(false)
    const [isOpen, setIsOpen] = React.useState(false)
    const pathname = usePathname()

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    // Close mobile menu on route change
    React.useEffect(() => {
        setIsOpen(false)
    }, [pathname])

    // Prevent body scroll when mobile menu is open
    React.useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = ""
        }
        return () => {
            document.body.style.overflow = ""
        }
    }, [isOpen])

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-[100] transition-all duration-500",
                isScrolled ? "glass-nav py-3" : "bg-navy py-6"
            )}
        >
            <div className="container-custom flex items-center justify-between relative h-12">
                {/* Logo */}
                <div className="flex items-center gap-6 relative">
                    <Link href="/" className="group">
                        <div
                            className={cn(
                                "absolute top-0 transition-all duration-500 transform",
                                isScrolled
                                    ? "scale-75 -translate-y-4"
                                    : "scale-[1.2] translate-y-6"
                            )}
                        >
                            <div className="bg-white p-1 rounded-2xl shadow-[0_15px_50px_rgba(0,0,0,0.4)] border-[6px] border-orange-light">
                                <div className="h-24 w-24 flex items-center justify-center">
                                    <img
                                        src="/kgf-logo.png"
                                        alt="KGF Logo"
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                            </div>
                        </div>
                    </Link>

                    <div className="ml-28 md:ml-36 hidden sm:block">
                        <h1 className="text-xl md:text-2xl font-black tracking-tighter text-white">
                            KGF{" "}
                            <span className="text-orange-light">BHARAT</span>
                        </h1>
                        <p className="text-[8px] uppercase tracking-[0.4em] text-orange-200 font-bold">
                            Kurukshetra Gurukulam Foundation
                        </p>
                    </div>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden xl:flex items-center gap-8 text-[11px] font-black uppercase tracking-widest text-white/90">
                    {navItems.map((item) =>
                        item.children ? (
                            <DesktopDropdown
                                key={item.href}
                                item={item}
                                pathname={pathname}
                            />
                        ) : (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "hover:text-orange-light transition-colors",
                                    pathname === item.href &&
                                        "text-orange-light"
                                )}
                            >
                                {item.name}
                            </Link>
                        )
                    )}
                </div>

                {/* Donate Button (Desktop) */}
                <div className="hidden xl:flex items-center gap-4">
                    <Link
                        href="/donate"
                        className={cn(
                            "inline-flex items-center gap-2 bg-orange hover:bg-white hover:text-navy text-white px-7 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl border-2 border-orange",
                            pathname === "/donate" &&
                                "bg-white text-navy"
                        )}
                    >
                        <Heart className="h-4 w-4" />
                        Donate
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <div className="flex xl:hidden">
                    <button
                        type="button"
                        className="text-white hover:text-orange-light transition-colors p-2"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label={isOpen ? "Close menu" : "Open menu"}
                    >
                        {isOpen ? (
                            <X className="h-6 w-6" />
                        ) : (
                            <Menu className="h-6 w-6" />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="xl:hidden absolute top-full left-0 w-full bg-navy border-b-2 border-orange-light shadow-2xl overflow-hidden"
                    >
                        <div className="py-4 px-4 max-h-[80vh] overflow-y-auto">
                            {mobileNavItems.map((item, index) => (
                                <motion.div
                                    key={item.href}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{
                                        delay: index * 0.05,
                                        duration: 0.2,
                                    }}
                                >
                                    <Link
                                        href={item.href}
                                        className={cn(
                                            "block px-4 py-3.5 text-lg font-black text-white hover:text-orange-light hover:bg-white/5 rounded-xl transition-colors",
                                            pathname === item.href &&
                                                "text-orange-light bg-white/5"
                                        )}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {item.name}
                                    </Link>
                                </motion.div>
                            ))}

                            {/* Mobile Donate Button */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{
                                    delay: mobileNavItems.length * 0.05,
                                    duration: 0.2,
                                }}
                                className="mt-4 px-4"
                            >
                                <Link
                                    href="/donate"
                                    className="flex items-center justify-center gap-2 w-full bg-orange text-white font-black py-4 rounded-2xl text-sm uppercase tracking-widest hover:bg-orange-light hover:text-navy transition-all"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <Heart className="h-4 w-4" />
                                    Donate Now
                                </Link>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    )
}
