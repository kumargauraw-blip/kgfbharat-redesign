import Link from "next/link"
import { getCourses } from "@/lib/data-source"
import type { Course } from "@/lib/types"

function StatusBadge({ status }: { status: string }) {
    const isActive = status.toLowerCase() === "active"
    return (
        <span
            className={`absolute top-5 right-5 z-10 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                isActive
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-600"
            }`}
        >
            {status}
        </span>
    )
}

function CourseCard({
    course,
    isDharmik,
}: {
    course: Course
    isDharmik: boolean
}) {
    const href = isDharmik
        ? `/dharmic-courses`
        : `/ai-courses/${course.slug}`

    return (
        <Link
            href={href}
            className="bg-white group relative overflow-hidden rounded-[2.5rem] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-gray-100 flex flex-col"
        >
            <StatusBadge status={course.status} />

            <div className="aspect-[4/3] overflow-hidden bg-gray-50 flex items-center justify-center relative">
                {course.thumbnailUrl ? (
                    <img
                        src={course.thumbnailUrl}
                        alt={course.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                ) : (
                    <div
                        className={`w-full h-full flex flex-col items-center justify-center gap-2 ${
                            isDharmik
                                ? "bg-gradient-to-br from-orange-50 to-amber-100"
                                : "bg-gradient-to-br from-blue-50 to-purple-100"
                        }`}
                    >
                        <svg
                            className={`w-12 h-12 ${
                                isDharmik
                                    ? "text-orange/40"
                                    : "text-purple-300"
                            }`}
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
                        </svg>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                            {course.title}
                        </span>
                    </div>
                )}
            </div>

            <div className="p-8 flex flex-col flex-1">
                <p
                    className={`text-[11px] font-bold uppercase tracking-widest mb-3 ${
                        isDharmik ? "text-orange" : "text-[#111827]"
                    }`}
                >
                    {isDharmik ? "Dharmik Education" : "AI & Technology"}
                </p>
                <h3 className="text-2xl font-bold mb-4 text-[#111827] group-hover:text-orange transition-colors leading-tight">
                    {course.title}
                </h3>
                <p className="text-gray-500 text-sm line-clamp-2 mb-8 leading-relaxed font-medium">
                    {course.tagline || course.description}
                </p>

                <div className="flex items-center justify-between mt-auto">
                    <div className="flex flex-col">
                        <span className="text-[10px] text-gray-400 uppercase font-bold tracking-tighter">
                            Duration
                        </span>
                        <span className="text-sm font-bold text-gray-800">
                            {course.duration || "TBA"}
                        </span>
                    </div>
                    <div
                        className={`p-3.5 rounded-2xl bg-gray-50 border border-gray-100 transition-all shadow-sm ${
                            isDharmik
                                ? "text-orange group-hover:shadow-orange/20"
                                : "text-[#111827] group-hover:shadow-amber-100"
                        }`}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M5 12h14" />
                            <path d="m12 5 7 7-7 7" />
                        </svg>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export async function CoursePreview() {
    const courses = await getCourses()

    const dharmikCourses = courses
        .filter((c) => c.courseCategory === "dharmic")
        .slice(0, 3)
    const aiCourses = courses
        .filter((c) => c.courseCategory === "ai-tech" || !c.courseCategory)
        .slice(0, 3)

    return (
        <section id="courses" className="py-32 space-y-48 bg-white">
            {/* Dharmik Education Section */}
            {dharmikCourses.length > 0 && (
                <div className="container-custom">
                    <div className="flex flex-col md:flex-row items-center justify-between mb-20 gap-8">
                        <div className="space-y-4 text-center md:text-left">
                            <h2 className="text-5xl md:text-7xl font-serif font-bold italic text-[#111827]">
                                Dharmik{" "}
                                <span className="text-orange">
                                    Education
                                </span>
                            </h2>
                            <div className="w-24 h-2 bg-orange rounded-full mx-auto md:mx-0"></div>
                            <p className="text-gray-500 text-lg font-medium max-w-xl">
                                Deep exploration into Sanskrit literature,
                                Vedic philosophy, and the roots of Bharat.
                            </p>
                        </div>
                        <Link
                            href="/dharmic-courses"
                            className="text-orange-dark font-black uppercase tracking-widest text-sm hover:underline decoration-2 underline-offset-8"
                        >
                            View All Tracks &rarr;
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {dharmikCourses.map((course) => (
                            <CourseCard
                                key={course.id}
                                course={course}
                                isDharmik={true}
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* AI Tech Section */}
            {aiCourses.length > 0 && (
                <div className="container-custom">
                    <div className="flex flex-col md:flex-row items-center justify-between mb-20 gap-8">
                        <div className="space-y-4 text-center md:text-left">
                            <h2 className="text-5xl md:text-7xl font-serif font-bold italic text-[#111827]">
                                AI Tech{" "}
                                <span className="text-[#111827]">
                                    Education
                                </span>
                            </h2>
                            <div className="w-24 h-2 bg-[#111827] rounded-full mx-auto md:mx-0"></div>
                            <p className="text-gray-500 text-lg font-medium max-w-xl">
                                Building the sovereign technological future
                                of Bharat through AI and Engineering.
                            </p>
                        </div>
                        <Link
                            href="/ai-courses"
                            className="text-[#111827] font-black uppercase tracking-widest text-sm hover:underline decoration-2 underline-offset-8"
                        >
                            Explore Courses &rarr;
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {aiCourses.map((course) => (
                            <CourseCard
                                key={course.id}
                                course={course}
                                isDharmik={false}
                            />
                        ))}
                    </div>
                </div>
            )}
        </section>
    )
}
