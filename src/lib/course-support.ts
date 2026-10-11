import { ayodhya2026 } from "@/content/events/ayodhya-2026"
import type { Course, CourseSupportCause } from "./types"
import { normalizeHttpUrl } from "./course-paths"

export type CourseSupport = {
    eyebrow: string
    headline: string
    message: string
    messageEn?: string
    ctaLabel: string
    ctaHref: string
    secondaryLabel?: string
    secondaryHref?: string
}

const AYODHYA_EVENT_PATH = `/events/${ayodhya2026.slug}`

const AYODHYA_SUPPORT: CourseSupport = {
    eyebrow: "टोकन शुल्क · बड़ी सेवा",
    headline: "अयोध्या आयोजन का समर्थन करें",
    message:
        "यह पाठ्यक्रम जानबूझकर न्यूनतम शुल्क पर है, ताकि कोई भी जुड़ सके। जो दे सकते हैं, वे कृपया रामजन्मभूमि गाथा — अयोध्या, 26–27 दिसंबर 2026 — के लिए KGF Bharat को दान करें।",
    messageEn:
        "This course is priced so anyone can join. If you are able, please also donate — this offering is tied to the Ayodhya gathering on 26–27 December 2026.",
    ctaLabel: "अयोध्या आयोजन हेतु दान करें",
    ctaHref: ayodhya2026.links.donate,
    secondaryLabel: "आयोजन देखें",
    secondaryHref: AYODHYA_EVENT_PATH,
}

function fromCms(cause: CourseSupportCause): CourseSupport | undefined {
    const ctaHref = normalizeHttpUrl(cause.ctaUrl) || (cause.ctaUrl?.startsWith("/") ? cause.ctaUrl : undefined)
    if (!cause.headline?.trim() && !cause.message?.trim()) return undefined
    if (!ctaHref) return undefined
    const secondaryHref = normalizeHttpUrl(cause.secondaryUrl) || (cause.secondaryUrl?.startsWith("/") ? cause.secondaryUrl : undefined)
    return {
        eyebrow: cause.eyebrow?.trim() || AYODHYA_SUPPORT.eyebrow,
        headline: cause.headline?.trim() || AYODHYA_SUPPORT.headline,
        message: cause.message?.trim() || AYODHYA_SUPPORT.message,
        ctaLabel: cause.ctaLabel?.trim() || AYODHYA_SUPPORT.ctaLabel,
        ctaHref,
        secondaryLabel: cause.secondaryLabel?.trim() || (secondaryHref ? AYODHYA_SUPPORT.secondaryLabel : undefined),
        secondaryHref,
    }
}

/** Per-course support ask. CMS wins when filled; Valmiki defaults to Ayodhya until then. */
export function resolveCourseSupport(course: Pick<Course, "slug" | "supportCause">): CourseSupport | undefined {
    if (course.supportCause?.enabled === false) return undefined // editor turned the ask off
    const cms = course.supportCause ? fromCms(course.supportCause) : undefined
    if (cms) return cms
    if (course.slug === "valmiki-ramayan-social-science") return AYODHYA_SUPPORT
    return undefined
}
