import Link from "next/link"
import { CheckCircle, Clock, Globe, ArrowLeft, Calendar, MapPin, Users, Star, GraduationCap } from "lucide-react"
import { Button } from "@/components/ui/button"
import FaqAccordion from "@/components/FaqAccordion"
import { courseEnrollHref, courseHeroText, courseListingPath, courseSkoolHref, formatCourseDate, SKOOL_JOIN_LABEL, normalizeHttpUrl } from "@/lib/course-paths"
import { resolveCourseSupport, resolveStageAnnouncement } from "@/lib/course-support"
import { CourseStageAnnouncement, CourseSupportPanel } from "@/components/courses/CourseSupport"
import { formatWpHtml, looksLikeHtml } from "@/lib/wp-html"
import type { Batch, Course, Testimonial } from "@/lib/types"

export function CourseDetail({
    course,
    batches,
    testimonials,
}: {
    course: Course
    batches: Batch[]
    testimonials: Testimonial[]
}) {
    const listingHref = courseListingPath(course.courseCategory)
    const listingLabel = course.courseCategory === "dharmic" ? "Back to Dharmik Courses" : "Back to Courses"
    const defaultCoachTitle = course.courseCategory === "dharmic" ? "KGF Faculty" : "Lead AI Coach"
    const defaultCoachBody =
        "Technology educator with almost 30 years of experience bridging ancient Indian pedagogical methods with cutting-edge AI and technology training. Kumar brings a unique perspective that combines Sattvic principles with practical, industry-ready skills to help learners achieve transformative results."
    const bio = course.instructorBio?.trim()
    const bioParts = bio?.split(/\s[-–—]\s/) ?? []
    const coachName = bioParts[0] || "Kumar Gauraw"
    const coachTitle = bioParts.length > 1 ? bioParts.slice(1).join(" — ") : defaultCoachTitle
    const coachBody = bio || defaultCoachBody
    const activeBatches = batches.filter((b) =>
        ["Enrolling", "Upcoming", "active", "upcoming"].includes(b.status)
    )
    const skoolHref = courseSkoolHref(course)
    const primaryEnrollHref = courseEnrollHref(course, activeBatches[0])
    const primaryEnrollLabel = skoolHref ? SKOOL_JOIN_LABEL : "Enroll Now"
    const support = resolveCourseSupport(course)
    const stageAnnouncement = resolveStageAnnouncement(course)
    const startDateLabel = formatCourseDate(course.startDate) || formatCourseDate(activeBatches[0]?.startDate)

    return (
        <div className="min-h-screen bg-white pb-20">
            <div className="text-white pt-14 pb-28 relative overflow-hidden" style={{ background: "linear-gradient(to bottom, #cd5600 0%, #e07020 30%, #f0a060 60%, #fff5eb 90%, white 100%)" }}>
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
                <div className="container-custom relative z-10">
                    <Link href={listingHref} className="inline-flex items-center text-yellow-300 hover:text-white mb-6 transition-colors text-sm font-medium">
                        <ArrowLeft className="h-4 w-4 mr-2" /> {listingLabel}
                    </Link>
                    <div className="flex flex-col md:flex-row gap-3 mb-4">
                        {course.targetAudience.map((audience, idx) => (
                            <span key={idx} className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-sm font-medium border border-white/20">
                                {audience}
                            </span>
                        ))}
                    </div>
                    <h1 className="text-3xl md:text-5xl font-heading font-bold mb-6 leading-tight max-w-4xl">
                        {course.title}
                    </h1>
                    <p className="text-xl text-[#111827] max-w-5xl leading-relaxed">
                        {courseHeroText(course)}
                    </p>
                </div>
            </div>

            {course.thumbnailUrl && (
                <div className="container-custom -mt-16 md:-mt-20 relative z-10">
                    <div className="overflow-hidden rounded-2xl border border-white/70 shadow-2xl">
                        <img
                            src={course.thumbnailUrl}
                            alt={course.title}
                            className="w-full max-h-[460px] object-cover object-center"
                        />
                    </div>
                </div>
            )}

            {stageAnnouncement && (
                <div className={`container-custom ${course.thumbnailUrl ? "mt-8" : "mt-10"}`}>
                    <CourseStageAnnouncement text={stageAnnouncement} />
                </div>
            )}

            <div className={`container-custom grid grid-cols-1 lg:grid-cols-3 gap-12 ${stageAnnouncement ? "mt-8" : course.thumbnailUrl ? "mt-10" : "mt-12"}`}>
                <div className="lg:col-span-2 space-y-12">
                    <section>
                        <h2 className="text-2xl font-bold font-heading text-[#111827] mb-4">About this Course</h2>
                        <CourseBody html={course.description} />
                    </section>

                    {support && (
                        <section>
                            <CourseSupportPanel support={support} />
                        </section>
                    )}

                    {course.learningOutcomes && course.learningOutcomes.length > 0 && (
                        <section className="bg-white p-8 rounded-xl border border-gray-100">
                            <h2 className="text-xl font-bold font-heading text-[#111827] mb-6">What You Will Learn</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {course.learningOutcomes.map((outcome, idx) => (
                                    <div key={idx} className="flex items-start space-x-3">
                                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                                        <span className="text-gray-700">{outcome}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {course.curriculum && course.curriculum.length > 0 && (
                        <section>
                            <h2 className="text-2xl font-bold font-heading text-[#111827] mb-6">Curriculum</h2>
                            <div className="space-y-4">
                                {course.curriculum.map((topic, idx) => (
                                    <div key={idx} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex items-center">
                                        <span className="h-8 w-8 rounded-full bg-orange/10 text-orange flex items-center justify-center font-bold mr-4 shrink-0">
                                            {idx + 1}
                                        </span>
                                        <span className="font-medium text-gray-900">{topic}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {activeBatches.length > 0 && (
                        <section>
                            <h2 className="text-2xl font-bold font-heading text-[#111827] mb-6">Upcoming Batches</h2>
                            <div className="space-y-4">
                                {activeBatches.map((batch) => {
                                    const batchHref = normalizeHttpUrl(batch.enrollmentUrl) || normalizeHttpUrl(course.skoolUrl)
                                    return (
                                        <div key={batch.id} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                                <div className="space-y-2">
                                                    <div className="flex items-center gap-3">
                                                        <span className="font-bold text-[#111827] text-lg">{batch.batchNumber}</span>
                                                        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                                                            batch.status === "Enrolling"
                                                                ? "bg-green-100 text-green-700"
                                                                : "bg-blue-100 text-blue-700"
                                                        }`}>
                                                            {batch.status}
                                                        </span>
                                                    </div>
                                                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                                                        <span className="flex items-center gap-1.5">
                                                            <Calendar className="h-4 w-4 text-orange" />
                                                            {new Date(batch.startDate).toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata", day: "numeric", month: "short", year: "numeric" })}
                                                            {" to "}
                                                            {new Date(batch.endDate).toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata", day: "numeric", month: "short", year: "numeric" })}
                                                        </span>
                                                        <span className="flex items-center gap-1.5">
                                                            <Globe className="h-4 w-4 text-orange" />
                                                            {batch.format}
                                                        </span>
                                                        {batch.location && (
                                                            <span className="flex items-center gap-1.5">
                                                                <MapPin className="h-4 w-4 text-orange" />
                                                                {batch.location}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="flex flex-col items-end gap-2 shrink-0">
                                                    <span className="text-2xl font-bold text-[#111827]">&#8377;{batch.price}</span>
                                                    {batch.seatsRemaining != null && batch.maxSeats != null && (
                                                        <span className="flex items-center gap-1 text-sm text-gray-500">
                                                            <Users className="h-3.5 w-3.5" />
                                                            {batch.seatsRemaining} of {batch.maxSeats} seats left
                                                        </span>
                                                    )}
                                                    {batchHref && (
                                                        <Button asChild className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6">
                                                            <a href={batchHref} target="_blank" rel="noopener noreferrer">
                                                                {skoolHref && !normalizeHttpUrl(batch.enrollmentUrl) ? SKOOL_JOIN_LABEL : "Enroll Now"}
                                                            </a>
                                                        </Button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </section>
                    )}

                    <section>
                        <h2 className="text-2xl font-bold font-heading text-[#111827] mb-6">Your Coach</h2>
                        <div className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col sm:flex-row gap-6">
                            <div className="w-20 h-20 rounded-full bg-[#111827]/10 flex items-center justify-center shrink-0">
                                <GraduationCap className="h-10 w-10 text-[#111827]" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-[#111827]">{coachName}</h3>
                                <p className="text-orange font-medium text-sm mb-3">{coachTitle}</p>
                                <p className="text-gray-600 leading-relaxed">{coachBody}</p>
                            </div>
                        </div>
                    </section>

                    {testimonials.length > 0 && (
                        <section>
                            <h2 className="text-2xl font-bold font-heading text-[#111827] mb-6">What Our Students Say</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {testimonials.map((t) => (
                                    <div key={t.id} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                                        <div className="flex items-center gap-1 mb-3">
                                            {Array.from({ length: 5 }).map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`h-4 w-4 ${i < t.rating ? "text-orange fill-orange" : "text-gray-300"}`}
                                                />
                                            ))}
                                        </div>
                                        <p className="text-gray-600 leading-relaxed mb-4 italic">
                                            &ldquo;{t.content}&rdquo;
                                        </p>
                                        <div>
                                            <p className="font-semibold text-[#111827]">{t.name}</p>
                                            <p className="text-sm text-gray-500">
                                                {t.role}{t.company ? `, ${t.company}` : ""}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {course.faq && course.faq.length > 0 && (
                        <section>
                            <h2 className="text-2xl font-bold font-heading text-[#111827] mb-6">Frequently Asked Questions</h2>
                            <FaqAccordion items={course.faq} />
                        </section>
                    )}
                </div>

                <div className="lg:col-span-1">
                    <div className="sticky top-24">
                        <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
                            <div className="p-6 space-y-6">
                                <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                                    <span className="text-gray-500">Price</span>
                                    <span className="text-2xl font-bold text-[#111827]">{course.price}</span>
                                </div>

                                <div className="space-y-4 text-sm text-gray-600">
                                    {startDateLabel && (
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center"><Calendar className="h-4 w-4 mr-2" /> Start Date</div>
                                            <span className="font-medium">{startDateLabel}</span>
                                        </div>
                                    )}
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center"><Clock className="h-4 w-4 mr-2" /> Duration</div>
                                        <span className="font-medium">{course.duration}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center"><Globe className="h-4 w-4 mr-2" /> Format</div>
                                        <span className="font-medium">{course.format}</span>
                                    </div>
                                </div>

                                {skoolHref ? (
                                    <Button asChild className="w-full bg-red-600 hover:bg-red-700 text-white text-base md:text-lg min-h-12 h-auto py-3 shadow-md font-semibold whitespace-normal">
                                        <a href={skoolHref} target="_blank" rel="noopener noreferrer">
                                            {SKOOL_JOIN_LABEL}
                                        </a>
                                    </Button>
                                ) : primaryEnrollHref ? (
                                    <Button asChild className="w-full bg-red-600 hover:bg-red-700 text-white text-lg h-12 shadow-md font-semibold">
                                        <a href={primaryEnrollHref} target="_blank" rel="noopener noreferrer">
                                            {primaryEnrollLabel}
                                        </a>
                                    </Button>
                                ) : course.status === "Active" ? (
                                    <Button asChild className="w-full bg-red-600 hover:bg-red-700 text-white text-lg h-12 shadow-md font-semibold">
                                        <Link href="/contact">{primaryEnrollLabel}</Link>
                                    </Button>
                                ) : (
                                    <Button variant="secondary" className="w-full" disabled>
                                        {course.status === "Completed" ? "Batch Completed" : "Join Waitlist"}
                                    </Button>
                                )}

                                {skoolHref && (
                                    <p className="text-xs text-center text-gray-500">
                                        Classroom lives on Skool. You will leave kgfbharat.org to join.
                                    </p>
                                )}

                                {support && <CourseSupportPanel support={support} compact />}

                                {activeBatches.length > 0 && activeBatches[0].seatsRemaining != null && (
                                    <p className="text-xs text-center text-orange font-medium">
                                        Only {activeBatches[0].seatsRemaining} seats remaining in the next batch!
                                    </p>
                                )}
                            </div>
                            <div className="bg-gray-50 p-4 text-center">
                                <p className="text-xs text-gray-500">
                                    Need help? <Link href="/contact" className="text-[#111827] underline font-medium">Contact Us</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function CourseBody({ html }: { html: string }) {
    if (!html?.trim()) return null
    if (!looksLikeHtml(html)) {
        return <p className="whitespace-pre-line text-gray-600 leading-relaxed">{html}</p>
    }
    const formatted = formatWpHtml(html).replace(
        /<table[\s\S]*?<\/table>/gi,
        (table) => `<div class="kgf-course-table">${table}</div>`
    )
    return (
        <>
            <style>{`
                .kgf-course-body { color: #4b5563; font-size: 1.0625rem; line-height: 1.8; overflow-wrap: break-word; }
                .kgf-course-body > *:first-child { margin-top: 0; }
                .kgf-course-body p { margin: 0 0 1.15em; }
                .kgf-course-body h2, .kgf-course-body h3, .kgf-course-body h4 {
                    font-family: var(--font-heading); font-weight: 700 !important; letter-spacing: -0.02em; color: #111827;
                }
                .kgf-course-body h2 { font-size: 1.55rem !important; line-height: 1.3 !important; margin: 2.25rem 0 0.85rem; }
                .kgf-course-body h3 { font-size: 1.2rem !important; line-height: 1.35 !important; margin: 1.75rem 0 0.65rem; }
                .kgf-course-body h4 { font-size: 1.05rem !important; line-height: 1.4 !important; margin: 1.4rem 0 0.5rem; }
                .kgf-course-body ul, .kgf-course-body ol { margin: 0 0 1.25em; padding-left: 1.35rem; }
                .kgf-course-body ul { list-style: disc; }
                .kgf-course-body ol { list-style: decimal; }
                .kgf-course-body li { margin: 0.4em 0; }
                .kgf-course-body li::marker { color: #e07020; }
                .kgf-course-body strong { color: #1f2937; font-weight: 600; }
                .kgf-course-body em { font-style: italic; }
                .kgf-course-body a { color: #c2410c; text-decoration: underline; }
                .kgf-course-table { overflow-x: auto; margin: 1.5rem 0 2rem; border: 1px solid #f3e8d8; border-radius: 0.85rem; background: #fff; box-shadow: 0 1px 2px rgba(17, 24, 39, 0.04); }
                .kgf-course-body table { width: 100%; min-width: 36rem; border-collapse: collapse; font-size: 0.95rem; line-height: 1.55; }
                .kgf-course-body thead td, .kgf-course-body th { background: #fff7ed; font-weight: 700; color: #111827; }
                .kgf-course-body td, .kgf-course-body th { border-bottom: 1px solid #f3e8d8; border-right: 1px solid #f3e8d8; padding: 0.85rem 1rem; vertical-align: top; text-align: left; }
                .kgf-course-body td:last-child, .kgf-course-body th:last-child { border-right: none; }
                .kgf-course-body tbody tr:last-child td { border-bottom: none; }
                .kgf-course-body td[width] { width: auto; }
            `}</style>
            <div className="kgf-course-body" dangerouslySetInnerHTML={{ __html: formatted }} />
        </>
    )
}
