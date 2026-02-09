import { notFound } from "next/navigation"
import Link from "next/link"
import { CheckCircle, Clock, Globe, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { fetchCourse } from "@/app/actions"

// Helper to generate static params (if we were fully static, but we are dynamic mostly)
// export async function generateStaticParams() { ... }

export default async function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const course = await fetchCourse(slug)

    if (!course) {
        notFound()
    }

    return (
        <div className="min-h-screen bg-white dark:bg-black pb-20">
            {/* Hero/Header */}
            <div className="bg-charcoal text-white py-16 relative overflow-hidden">
                <div className="container-custom relative z-10">
                    <Link href="/ai-courses" className="inline-flex items-center text-saffron hover:text-white mb-6 transition-colors">
                        <ArrowLeft className="h-4 w-4 mr-2" /> Back to Courses
                    </Link>
                    <div className="flex flex-col md:flex-row gap-4 mb-4">
                        {course.targetAudience.map((audience, idx) => (
                            <span key={idx} className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-sm font-medium border border-white/20">
                                {audience}
                            </span>
                        ))}
                    </div>
                    <h1 className="text-3xl md:text-5xl font-heading font-bold mb-6 leading-tight max-w-4xl">
                        {course.title}
                    </h1>
                    <p className="text-xl text-gray-200 max-w-3xl leading-relaxed">
                        {course.tagline || course.description}
                    </p>
                </div>
            </div>

            <div className="container-custom mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-12">

                    {/* Description */}
                    <section>
                        <h2 className="text-2xl font-bold font-heading text-charcoal mb-4">About this Course</h2>
                        <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
                            <p className="whitespace-pre-line">{course.description}</p>
                        </div>
                    </section>

                    {/* Learning Outcomes */}
                    {course.learningOutcomes && course.learningOutcomes.length > 0 && (
                        <section className="bg-gray-50 dark:bg-gray-900 p-8 rounded-xl border border-gray-100 dark:border-gray-800">
                            <h2 className="text-xl font-bold font-heading text-charcoal mb-6">What You'll Learn</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {course.learningOutcomes.map((outcome, idx) => (
                                    <div key={idx} className="flex items-start space-x-3">
                                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                                        <span className="text-gray-700 dark:text-gray-300">{outcome}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Curriculum */}
                    {course.curriculum && course.curriculum.length > 0 && (
                        <section>
                            <h2 className="text-2xl font-bold font-heading text-charcoal mb-6">Curriculum</h2>
                            <div className="space-y-4">
                                {course.curriculum.map((topic, idx) => (
                                    <div key={idx} className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm flex items-center">
                                        <span className="h-8 w-8 rounded-full bg-saffron/10 text-saffron flex items-center justify-center font-bold mr-4">
                                            {idx + 1}
                                        </span>
                                        <span className="font-medium text-gray-900 dark:text-gray-100">{topic}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Sidebar / Enrollment Card */}
                <div className="lg:col-span-1">
                    <div className="sticky top-24">
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
                            <div className="p-6 space-y-6">
                                <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                                    <span className="text-gray-500">Price</span>
                                    <span className="text-2xl font-bold text-charcoal">{course.price}</span>
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
                                </div>

                                {course.status === 'Active' ? (
                                    <Button className="w-full bg-dark-red hover:bg-dark-red-light text-white text-lg h-12 shadow-md">
                                        Enroll Now
                                    </Button>
                                ) : (
                                    <Button variant="secondary" className="w-full" disabled>
                                        {course.status === 'Completed' ? 'Batch Completed' : 'Join Waitlist'}
                                    </Button>
                                )}

                                <p className="text-xs text-center text-gray-400">
                                    Next Batch details will appear here dynamically.
                                </p>
                            </div>
                            <div className="bg-gray-50 dark:bg-gray-900 p-4 text-center">
                                <p className="text-xs text-gray-500">
                                    Need help? <Link href="/contact" className="text-charcoal underline">Contact Us</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
