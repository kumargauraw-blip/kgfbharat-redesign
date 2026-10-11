import type { Batch, Course } from "./types"
import { looksLikeHtml, stripHtml } from "./wp-html"

export function isDharmicCourse(course: Pick<Course, "courseCategory">) {
    return course.courseCategory === "dharmic"
}

export function courseListingPath(category?: string) {
    return category === "dharmic" ? "/dharmic-courses" : "/ai-courses"
}

export function courseDetailPath(course: Pick<Course, "slug" | "courseCategory">) {
    return `${courseListingPath(course.courseCategory)}/${course.slug}`
}

/** Plain excerpt for cards, hero, and metadata — never raw HTML. */
export function coursePlainExcerpt(course: Pick<Course, "tagline" | "overview" | "description">) {
    const tagline = course.tagline?.trim()
    if (tagline) return tagline
    const overview = stripHtml(course.overview || "")
    if (overview) return overview
    return stripHtml(course.description)
}

/** Hero line: tagline, or the first paragraph before lists/tables. */
export function courseHeroText(course: Pick<Course, "tagline" | "overview" | "description">) {
    if (course.tagline?.trim()) return course.tagline.trim()
    if (looksLikeHtml(course.description)) {
        const first = course.description.split(/<(ul|ol|h[1-6]|table)\b/i)[0] || ""
        const plain = stripHtml(first)
        if (plain.length > 40) return plain
    }
    return coursePlainExcerpt(course)
}

export function formatCourseDate(value?: string | null) {
    if (!value?.trim()) return undefined
    const parsed = new Date(value)
    if (Number.isNaN(parsed.getTime())) return value.trim()
    return parsed.toLocaleDateString("en-IN", {
        timeZone: "Asia/Kolkata",
        day: "numeric",
        month: "short",
        year: "numeric",
    })
}

export function normalizeHttpUrl(value?: string | null): string | undefined {
    if (!value) return undefined
    const trimmed = value.trim()
    if (!/^https?:\/\//i.test(trimmed)) return undefined
    return trimmed
}

export const SKOOL_JOIN_LABEL = "Join Us @KGF Pathshala"

export function courseSkoolHref(course: Pick<Course, "skoolUrl">) {
    return normalizeHttpUrl(course.skoolUrl)
}

/** Prefer the course Skool classroom; otherwise the next batch enrollment link. */
export function courseEnrollHref(course: Course, batch?: Batch) {
    return courseSkoolHref(course) || normalizeHttpUrl(batch?.enrollmentUrl)
}
