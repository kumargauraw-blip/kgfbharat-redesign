import Link from "next/link"
import { Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { fetchCourses } from "@/app/actions"

export const dynamic = 'force-dynamic'

export default async function CoursesPage() {
    const courses = await fetchCourses()

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black pb-20">
            {/* Page Header */}
            <div className="bg-charcoal text-white py-24 relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>

                <div className="container-custom relative z-10">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div className="max-w-2xl">
                            <span className="text-saffron font-bold tracking-widest uppercase text-sm mb-2 block">
                                Department of Technology
                            </span>
                            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6 text-white">
                                AI Curriculum
                            </h1>
                            <p className="text-xl text-gray-300 leading-relaxed font-serif">
                                Advanced technical training provided in partnership with <span className="text-white font-bold">Krishna Worldwide LLC</span>.
                                Designed to equip the Sattvic Technologist with state-of-the-art capabilities.
                            </p>
                        </div>

                        {/* Partner Badge */}
                        <div className="hidden md:block">
                            <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-4 rounded-sm text-center">
                                <p className="text-xs text-saffron uppercase tracking-widest font-bold mb-1">Powered By</p>
                                <p className="font-heading font-bold text-lg">Krishna Worldwide</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-custom mt-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {courses.length === 0 ? (
                        <div className="col-span-3 text-center py-20">
                            <h3 className="text-xl text-gray-500">No courses available at the moment. Please check back later.</h3>
                        </div>
                    ) : (
                        courses.map((course) => (
                            <Card key={course.id} className="flex flex-col h-full hover:shadow-lg transition-shadow border-t-4 border-t-saffron">
                                <CardHeader>
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="flex flex-wrap gap-1">
                                            {course.targetAudience.map((audience, idx) => (
                                                <span key={idx} className="inline-flex items-center rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700">
                                                    {audience}
                                                </span>
                                            ))}
                                        </div>
                                        <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset ${course.status === 'Active'
                                            ? 'bg-green-50 text-green-700 ring-green-600/20'
                                            : 'bg-gray-50 text-gray-600 ring-gray-500/10'
                                            }`}>
                                            {course.status}
                                        </span>
                                    </div>
                                    <CardTitle className="text-xl line-clamp-2 min-h-[3.5rem] text-charcoal">{course.title}</CardTitle>
                                    <CardDescription className="line-clamp-3">{course.tagline || course.description}</CardDescription>
                                </CardHeader>
                                <CardContent className="flex-grow">
                                    <div className="space-y-2 text-sm text-gray-500">
                                        <div className="flex items-center">
                                            <span className="font-semibold w-20">Format:</span>
                                            <span>{course.format}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <span className="font-semibold w-20">Duration:</span>
                                            <span>{course.duration}</span>
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter className="pt-4 border-t">
                                    <Button className="w-full bg-dark-red hover:bg-dark-red-light text-white" asChild>
                                        <Link href={`/ai-courses/${course.slug}`}>View Details</Link>
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}
