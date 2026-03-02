import type { Metadata } from "next"
import Link from "next/link"
import { Clock, CalendarDays, Sparkles } from "lucide-react"
import { getCourses, getBatches } from "@/lib/data-source"
import type { Batch } from "@/lib/types"

export const metadata: Metadata = {
    title: "Dharmik Education | KGF Bharat",
    description:
        "Explore KGF Bharat's Dharmik Education curriculum. Courses on Sanskrit, Vedic philosophy, Dharmic values, and the civilizational heritage of Bharat.",
    openGraph: {
        title: "Dharmik Education | KGF Bharat",
        description:
            "Dharmik courses covering Sanskrit, Vedic philosophy, Dharmic values, and the civilizational heritage of Bharat.",
    },
}

export const dynamic = "force-dynamic"

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

export default async function DharmicCoursesPage() {
    const [allCourses, batches] = await Promise.all([
        getCourses(),
        getBatches(),
    ])

    const courses = allCourses.filter((c) => c.courseCategory === "dharmic")

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-white via-orange-50 to-amber-50 py-24 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
                <div className="absolute bottom-0 left-0 w-72 h-72 bg-amber-200/20 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="max-w-3xl">
                        <div className="flex items-center gap-2 mb-4">
                            <Sparkles className="h-5 w-5 text-orange" />
                            <span className="text-orange font-semibold tracking-wide uppercase text-sm">
                                Department of Dharmic Studies
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                            Dharmik Education
                        </h1>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            Courses on Sanskrit, Vedic philosophy, Dharmic values,
                            and the civilizational heritage of Bharat. Preserving
                            ancient wisdom while building the future.
                        </p>
                    </div>
                </div>
            </div>

            {/* Course Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {courses.length === 0 ? (
                    <div className="text-center py-20">
                        <h3 className="text-xl text-gray-500">
                            Dharmik courses are coming soon. Please check back later.
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
                                    {/* Orange Top Accent */}
                                    <div className="h-1.5 bg-gradient-to-r from-orange-400 to-amber-500" />

                                    {course.thumbnailUrl ? (
                                        <div className="aspect-[16/10] overflow-hidden">
                                            <img
                                                src={course.thumbnailUrl}
                                                alt={course.title}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                        </div>
                                    ) : null}

                                    <div className="p-6 flex flex-col flex-grow">
                                        {/* Header: Status */}
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="flex flex-wrap gap-1.5">
                                                {course.targetAudience.map(
                                                    (audience, idx) => (
                                                        <span
                                                            key={idx}
                                                            className="inline-flex items-center rounded-full bg-orange-50 text-orange-700 px-2.5 py-0.5 text-xs font-medium"
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
                                            {course.duration && (
                                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                                    <Clock className="h-4 w-4 text-orange flex-shrink-0" />
                                                    <span>{course.duration}</span>
                                                    <span className="text-gray-300">|</span>
                                                    <span>{course.format}</span>
                                                </div>
                                            )}

                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <CalendarDays className="h-4 w-4 text-amber-500 flex-shrink-0" />
                                                <span>
                                                    {nextBatchDate
                                                        ? `Next batch: ${formatDate(nextBatchDate)}`
                                                        : "Coming Soon..."}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Price */}
                                        {course.price && (
                                            <div className="mb-5">
                                                <p className="text-2xl font-bold text-gray-900">
                                                    {course.price}
                                                </p>
                                            </div>
                                        )}

                                        {/* CTA */}
                                        <Link
                                            href={`/dharmic-courses`}
                                            className="block w-full text-center bg-[#DC2626] hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                                        >
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}
