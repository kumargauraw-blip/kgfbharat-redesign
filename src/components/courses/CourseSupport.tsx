import type { ReactNode } from "react"
import Link from "next/link"
import { Heart } from "lucide-react"
import type { CourseSupport } from "@/lib/course-support"

function isExternal(href: string) {
    return /^https?:\/\//i.test(href)
}

function SupportLink({
    href,
    className,
    children,
}: {
    href: string
    className: string
    children: ReactNode
}) {
    if (isExternal(href)) {
        return (
            <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
                {children}
            </a>
        )
    }
    return (
        <Link href={href} className={className}>
            {children}
        </Link>
    )
}

/** Compact note on course listing cards. */
export function CourseSupportNote({ support }: { support: CourseSupport }) {
    return (
        <div className="mb-5 rounded-xl border border-orange-200 bg-orange-50/80 px-4 py-3">
            <p className="text-[10px] font-bold uppercase tracking-widest text-orange-800">{support.eyebrow}</p>
            <p className="mt-1 text-sm font-semibold text-[#111827] leading-snug">{support.headline}</p>
            <p className="mt-1.5 text-sm text-gray-600 leading-relaxed">{support.message}</p>
            {support.messageEn && (
                <p className="mt-1 text-xs text-gray-500 leading-relaxed">{support.messageEn}</p>
            )}
            <SupportLink
                href={support.ctaHref}
                className="mt-2 inline-block text-sm font-semibold text-[#c2410c] hover:underline"
            >
                {support.ctaLabel} →
            </SupportLink>
        </div>
    )
}

/** Full story + donate CTA on the course detail page. */
export function CourseSupportPanel({ support, compact }: { support: CourseSupport; compact?: boolean }) {
    return (
        <div className={`rounded-xl border border-orange-200 bg-gradient-to-br from-orange-50 to-amber-50 ${compact ? "p-5" : "p-6 md:p-8"}`}>
            <div className="flex items-start gap-3">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-700">
                    <Heart className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                    <p className="text-[11px] font-bold uppercase tracking-widest text-orange-800">{support.eyebrow}</p>
                    <h3 className={`mt-1 font-heading font-bold text-[#111827] leading-snug ${compact ? "text-lg" : "text-xl"}`}>
                        {support.headline}
                    </h3>
                    <p className={`mt-2 text-gray-700 leading-relaxed ${compact ? "text-sm" : "text-base"}`}>{support.message}</p>
                    {support.messageEn && (
                        <p className={`mt-2 text-gray-500 leading-relaxed ${compact ? "text-xs" : "text-sm"}`}>{support.messageEn}</p>
                    )}
                    <div className={`mt-4 flex flex-col ${compact ? "gap-2" : "sm:flex-row sm:flex-wrap gap-3"}`}>
                        <SupportLink
                            href={support.ctaHref}
                            className="inline-flex items-center justify-center rounded-lg bg-[#DC2626] px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-700"
                        >
                            {support.ctaLabel}
                        </SupportLink>
                        {support.secondaryHref && support.secondaryLabel && (
                            <SupportLink
                                href={support.secondaryHref}
                                className="inline-flex items-center justify-center rounded-lg border border-orange-300 bg-white px-5 py-2.5 text-sm font-semibold text-[#9a3412] hover:bg-orange-50"
                            >
                                {support.secondaryLabel}
                            </SupportLink>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
