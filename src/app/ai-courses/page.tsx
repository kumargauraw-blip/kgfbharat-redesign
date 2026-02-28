import type { Metadata } from "next"
import Link from "next/link"
import { Clock, MessageCircle, HelpCircle, Sparkles, CalendarDays } from "lucide-react"
import { getCourses, getBatches } from "@/lib/data-source"
import { CustomBatchForm } from "@/components/ai-courses/CustomBatchForm"
import type { Batch } from "@/lib/types"

export const metadata: Metadata = {
    title: "AI Courses | KGF Bharat",
    description:
        "Explore KGF Bharat's AI curriculum. Advanced technical training provided in partnership with Krishna Worldwide Technology, designed to equip the modern technologist with state-of-the-art AI capabilities.",
    openGraph: {
        title: "AI Courses | KGF Bharat",
        description:
            "Advanced AI training courses in partnership with Krishna Worldwide Technology. Master artificial intelligence, machine learning, and more.",
    },
}

export const revalidate = 300

function getNextBatchDate(courseId: string, batches: Batch[]): string | null {
    const now = new Date()
    const courseBatches = batches
        .filter((b) => b.courseId === courseId && new Date(b.startDate) > now)
        .sort(
            (a, b) =>
                new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
        )
    return courseBatches.length > 0 ? courseBatches[0].startDate : null
}

function formatDate(dateStr: string): string {
    const date = new Date(dateStr)
    return date.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
    })
}

export default async function CoursesPage() {
    const [courses, batches] = await Promise.all([
        getCourses(),
        getBatches(),
    ])

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-white via-blue-50 to-purple-50 py-24 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
                <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-200/20 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div className="max-w-3xl">
                            <div className="flex items-center gap-2 mb-4">
                                <Sparkles className="h-5 w-5 text-purple-600" />
                                <span className="text-purple-600 font-semibold tracking-wide uppercase text-sm">
                                    Department of Technology
                                </span>
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                                AI Curriculum
                            </h1>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                Advanced technical training provided in partnership with{" "}
                                <span className="text-gray-900 font-semibold">
                                    Krishna Worldwide LLC
                                </span>
                                . Designed to equip the modern technologist with state-of-the-art
                                capabilities.
                            </p>
                        </div>

                        {/* Partner Badge */}
                        <div className="hidden md:block">
                            <div className="bg-white/80 backdrop-blur-sm border border-purple-100 p-5 rounded-xl shadow-sm text-center">
                                <p className="text-xs text-purple-600 uppercase tracking-widest font-bold mb-1">
                                    Powered By
                                </p>
                                <p className="font-bold text-gray-900 text-lg">
                                    Krishna Worldwide
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Course Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {courses.length === 0 ? (
                    <div className="text-center py-20">
                        <h3 className="text-xl text-gray-500">
                            No courses available at the moment. Please check back later.
                        </h3>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {courses.map((course) => {
                            const nextBatchDate = getNextBatchDate(
                                course.id,
                                batches
                            )
                            return (
                                <div
                                    key={course.id}
                                    className="group bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col"
                                >
                                    {/* Blue/Purple Top Accent */}
                                    <div className="h-1.5 bg-gradient-to-r from-blue-500 to-purple-500" />

                                    <div className="p-6 flex flex-col flex-grow">
                                        {/* Header: Audience tags + Status */}
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="flex flex-wrap gap-1.5">
                                                {course.targetAudience.map(
                                                    (audience, idx) => (
                                                        <span
                                                            key={idx}
                                                            className="inline-flex items-center rounded-full bg-blue-50 text-blue-700 px-2.5 py-0.5 text-xs font-medium"
                                                        >
                                                            {audience}
                                                        </span>
                                                    )
                                                )}
                                            </div>
                                            <span
                                                className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${
                                                    course.status === "Active"
                                                        ? "bg-green-100 text-green-800"
                                                        : "bg-gray-100 text-gray-600"
                                                }`}
                                            >
                                                {course.status}
                                            </span>
                                        </div>

                                        {/* Title */}
                                        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 min-h-[3.5rem]">
                                            {course.title}
                                        </h3>

                                        {/* Tagline */}
                                        <p className="text-gray-500 text-sm mb-5 line-clamp-2">
                                            {course.tagline || course.description}
                                        </p>

                                        {/* Details */}
                                        <div className="space-y-3 mb-5 flex-grow">
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <Clock className="h-4 w-4 text-purple-500 flex-shrink-0" />
                                                <span>{course.duration}</span>
                                                <span className="text-gray-300">|</span>
                                                <span>{course.format}</span>
                                            </div>

                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <CalendarDays className="h-4 w-4 text-blue-500 flex-shrink-0" />
                                                <span>
                                                    {nextBatchDate
                                                        ? `Next batch: ${formatDate(nextBatchDate)}`
                                                        : "Coming Soon..."}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Price */}
                                        <div className="mb-5">
                                            <p className="text-2xl font-bold text-gray-900">
                                                {course.price}
                                            </p>
                                        </div>

                                        {/* CTA */}
                                        <Link
                                            href={`/ai-courses/${course.slug}`}
                                            className="block w-full text-center bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                                        >
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}

                {/* Not sure which course? CTA */}
                <div className="mt-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-center text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-2xl -translate-x-1/3 translate-y-1/3" />
                    <div className="relative z-10 max-w-3xl mx-auto">
                        <HelpCircle className="h-12 w-12 text-blue-200 mx-auto mb-4" />
                        <h3 className="text-2xl md:text-3xl font-bold mb-4">
                            Not sure which course is right for you?
                        </h3>
                        <p className="text-blue-100 mb-8 leading-relaxed">
                            Our AI Advisor can help you find the perfect course based on your
                            background, goals, and experience level. Or reach out to our team
                            directly for personalized guidance.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/ai-advisor"
                                className="inline-flex items-center justify-center gap-2 bg-white text-blue-700 font-semibold px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors"
                            >
                                <MessageCircle className="h-4 w-4" />
                                Talk to AI Advisor
                            </Link>
                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center gap-2 border border-white/40 text-white font-semibold px-8 py-3 rounded-lg hover:bg-white/10 transition-colors"
                            >
                                Contact Us
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Custom Batch Request Section */}
            <CustomBatchForm courses={courses} />
        </div>
    )
}
