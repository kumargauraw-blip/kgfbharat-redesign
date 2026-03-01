import { notFound } from "next/navigation"
import Link from "next/link"
import { Metadata } from "next"
import { CheckCircle, Clock, Globe, ArrowLeft, Calendar, MapPin, Users, Star, GraduationCap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getCourseBySlug, getBatchesByCourseId, getTestimonialsByCourseSlug, getCourses } from "@/lib/data-source"
import FaqAccordion from "@/components/FaqAccordion"

export const dynamic = "force-dynamic"

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params
    const course = await getCourseBySlug(slug)
    if (!course) return { title: "Course Not Found" }
    return {
        title: `${course.title} | KGF Bharat AI Courses`,
        description: course.tagline || course.description,
    }
}

export default async function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const course = await getCourseBySlug(slug)

    if (!course) {
        notFound()
    }

    // Fetch batches for this course and testimonials in parallel
    const [batches, testimonials] = await Promise.all([
        getBatchesByCourseId(course.id),
        getTestimonialsByCourseSlug(course.slug),
    ])

    const activeBatches = batches.filter(b => ["Enrolling", "Upcoming", "active", "upcoming"].includes(b.status))

    return (
        <div className="min-h-screen bg-white pb-20">
            {/* Hero/Header */}
            <div className="text-white pt-14 pb-28 relative overflow-hidden" style={{ background: "linear-gradient(to bottom, #cd5600 0%, #e07020 30%, #f0a060 60%, #fff5eb 90%, white 100%)" }}>
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
                <div className="container-custom relative z-10">
                    <Link href="/ai-courses" className="inline-flex items-center text-yellow-300 hover:text-white mb-6 transition-colors text-sm font-medium">
                        <ArrowLeft className="h-4 w-4 mr-2" /> Back to Courses
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
                        {course.tagline || course.description}
                    </p>
                </div>
            </div>

            <div className="container-custom mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-12">

                    {/* Description */}
                    <section>
                        <h2 className="text-2xl font-bold font-heading text-[#111827] mb-4">About this Course</h2>
                        <div className="prose max-w-none text-gray-600">
                            <p className="whitespace-pre-line">{course.description}</p>
                        </div>
                    </section>

                    {/* Learning Outcomes */}
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

                    {/* Curriculum */}
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

                    {/* Upcoming Batches */}
                    {activeBatches.length > 0 && (
                        <section>
                            <h2 className="text-2xl font-bold font-heading text-[#111827] mb-6">Upcoming Batches</h2>
                            <div className="space-y-4">
                                {activeBatches.map((batch) => (
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
                                                        {new Date(batch.startDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                                                        {" to "}
                                                        {new Date(batch.endDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
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
                                                <Button asChild className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6">
                                                    <a href={batch.enrollmentUrl} target="_blank" rel="noopener noreferrer">
                                                        Enroll Now
                                                    </a>
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Instructor Bio */}
                    <section>
                        <h2 className="text-2xl font-bold font-heading text-[#111827] mb-6">Your Instructor</h2>
                        <div className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col sm:flex-row gap-6">
                            <div className="w-20 h-20 rounded-full bg-[#111827]/10 flex items-center justify-center shrink-0">
                                <GraduationCap className="h-10 w-10 text-[#111827]" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-[#111827]">Kumar Gauraw</h3>
                                <p className="text-orange font-medium text-sm mb-3">Lead AI Instructor</p>
                                <p className="text-gray-600 leading-relaxed">
                                    Technology educator with 15+ years of experience bridging ancient Indian pedagogical methods with cutting-edge AI and technology training. Kumar brings a unique perspective that combines Sattvic principles with practical, industry-ready skills to help learners achieve transformative results.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Testimonials */}
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

                    {/* FAQ */}
                    {course.faq && course.faq.length > 0 && (
                        <section>
                            <h2 className="text-2xl font-bold font-heading text-[#111827] mb-6">Frequently Asked Questions</h2>
                            <FaqAccordion items={course.faq} />
                        </section>
                    )}
                </div>

                {/* Sidebar / Enrollment Card */}
                <div className="lg:col-span-1">
                    <div className="sticky top-24">
                        <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
                            <div className="p-6 space-y-6">
                                <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                                    <span className="text-gray-500">Price</span>
                                    <span className="text-2xl font-bold text-[#111827]">{course.price}</span>
                                </div>

                                <div className="space-y-4 text-sm text-gray-600">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center"><Clock className="h-4 w-4 mr-2" /> Duration</div>
                                        <span className="font-medium">{course.duration}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center"><Globe className="h-4 w-4 mr-2" /> Format</div>
                                        <span className="font-medium">{course.format}</span>
                                    </div>
                                    {activeBatches.length > 0 && (
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center"><Calendar className="h-4 w-4 mr-2" /> Next Batch</div>
                                            <span className="font-medium">
                                                {new Date(activeBatches[0].startDate).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {activeBatches.length > 0 ? (
                                    <Button asChild className="w-full bg-red-600 hover:bg-red-700 text-white text-lg h-12 shadow-md font-semibold">
                                        <a href={activeBatches[0].enrollmentUrl} target="_blank" rel="noopener noreferrer">
                                            Enroll Now
                                        </a>
                                    </Button>
                                ) : course.status === 'Active' ? (
                                    <Button className="w-full bg-red-600 hover:bg-red-700 text-white text-lg h-12 shadow-md font-semibold">
                                        Enroll Now
                                    </Button>
                                ) : (
                                    <Button variant="secondary" className="w-full" disabled>
                                        {course.status === 'Completed' ? 'Batch Completed' : 'Join Waitlist'}
                                    </Button>
                                )}

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
