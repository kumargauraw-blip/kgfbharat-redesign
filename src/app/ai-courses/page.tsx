import type { Metadata } from "next"
import Link from "next/link"
import { MessageCircle, HelpCircle } from "lucide-react"
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

export const dynamic = 'force-dynamic'

export default async function CoursesPage() {
    const courses = await fetchCourses()

    return (
        <div className="min-h-screen bg-off-white pb-20">
            {/* Page Header */}
            <div className="bg-navy text-white py-24 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />

                <div className="container-custom relative z-10">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div className="max-w-2xl">
                            <span className="text-orange font-bold tracking-widest uppercase text-sm mb-2 block">
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
                                <p className="text-xs text-orange uppercase tracking-widest font-bold mb-1">Powered By</p>
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
                            <Card key={course.id} className="flex flex-col h-full hover:shadow-lg transition-shadow border-t-4 border-t-orange">
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
                                    <CardTitle className="text-xl line-clamp-2 min-h-[3.5rem]">{course.title}</CardTitle>
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
                                    <Button className="w-full bg-orange hover:bg-orange/90 text-white" asChild>
                                        <Link href={`/ai-courses/${course.slug}`}>View Details</Link>
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))
                    )}
                </div>

                {/* Not sure which course? CTA */}
                <div className="mt-16 bg-navy rounded-2xl p-8 md:p-12 text-center text-white relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy to-orange/20" />
                    <div className="relative z-10 max-w-2xl mx-auto">
                        <HelpCircle className="h-12 w-12 text-orange mx-auto mb-4" />
                        <h3 className="text-2xl md:text-3xl font-heading font-bold mb-4">
                            Not sure which course is right for you?
                        </h3>
                        <p className="text-gray-300 mb-8 leading-relaxed">
                            Our AI Advisor can help you find the perfect course based on your background, goals, and experience level. Or reach out to our team directly for personalized guidance.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button asChild className="bg-orange hover:bg-orange/90 text-white font-semibold px-8 h-12">
                                <Link href="/ai-advisor">
                                    <MessageCircle className="mr-2 h-4 w-4" />
                                    Talk to AI Advisor
                                </Link>
                            </Button>
                            <Button asChild variant="outline" className="border-white/30 text-white hover:bg-white/10 font-semibold px-8 h-12">
                                <Link href="/contact">
                                    Contact Us
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
