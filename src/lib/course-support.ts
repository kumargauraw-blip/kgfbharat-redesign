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

export const VALMIKI_STAGE_ANNOUNCEMENT =
    "विशेष : इस कोर्स को करने वालों के नाम के साथ उनके सर्टिफिकेट की घोषणा हम अयोध्या के मंच से करेंगे ताकि उन्हें भी रामजी की कृपा मिले।"

export function resolveStageAnnouncement(course: Pick<Course, "slug">): string | undefined {
    if (course.slug === "valmiki-ramayan-social-science") return VALMIKI_STAGE_ANNOUNCEMENT
    return undefined
}

const AYODHYA_SUPPORT: CourseSupport = {
    eyebrow: "निःशुल्क प्रवेश या ₹11,000",
    headline: "अयोध्या में योगदान करें, कक्षा निःशुल्क पाएँ",
    message:
        "जो रामजन्मभूमि गाथा — अयोध्या, 26–27 दिसंबर 2026 — के लिए प्रायोजन करते हैं, दान देते हैं, या कोई भी योगदान करते हैं, उन्हें इस कक्षा में निःशुल्क प्रवेश मिलता है। शेष विद्यार्थी ₹11,000 शुल्क देकर स्वयं नामांकन कर सकते हैं।",
    messageEn:
        "Sponsor, donate, or contribute to the Ayodhya gathering — Ram Janmabhoomi Gatha, 26–27 December 2026 — and this class is free. Everyone else can enroll by paying ₹11,000.",
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
