import Image from "next/image"
import { Users, BookOpen, Award } from "lucide-react"

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-black">
            {/* Hero */}
            <div className="relative py-20 bg-gray-50 dark:bg-gray-900 overflow-hidden">
                <div className="container-custom relative z-10 text-center">
                    <h1 className="text-4xl md:text-6xl font-heading font-bold text-charcoal dark:text-white mb-6">
                        The Sattvic Technologist
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        We are building a new generation of creators and engineers who blend modern AI technology with ancient Dharmic wisdom.
                    </p>
                </div>
                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-64 h-64 bg-saffron/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-saffron/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
            </div>

            {/* Mission Pillars */}
            <div className="container-custom py-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                    <div className="space-y-4">
                        <div className="mx-auto w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-charcoal">
                            <BookOpen className="h-8 w-8" />
                        </div>
                        <h3 className="text-2xl font-bold font-heading">Shiksha</h3>
                        <p className="text-gray-500">Education that liberates. We provide world-class technical training rooted in ethical foundations.</p>
                    </div>
                    <div className="space-y-4">
                        <div className="mx-auto w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center text-saffron">
                            <Users className="h-8 w-8" />
                        </div>
                        <h3 className="text-2xl font-bold font-heading">Nirman</h3>
                        <p className="text-gray-500">Building for society. We foster a community of builders who create tools for the betterment of Bharat.</p>
                    </div>
                    <div className="space-y-4">
                        <div className="mx-auto w-16 h-16 bg-yellow-50 rounded-full flex items-center justify-center text-yellow-600">
                            <Award className="h-8 w-8" />
                        </div>
                        <h3 className="text-2xl font-bold font-heading">Puraskar</h3>
                        <p className="text-gray-500">Honoring excellence. Recognizing internal and external achievements in the field of Dharmic technology.</p>
                    </div>
                </div>
            </div>

            {/* Team Section */}
            <div className="bg-gray-50 dark:bg-gray-900 py-20">
                <div className="container-custom">
                    <h2 className="text-3xl font-heading font-bold text-center mb-16">Leadership & Mentors</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Sandeep Deo */}
                        <div className="bg-white dark:bg-black p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 text-center">
                            <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 overflow-hidden">
                                {/* Placeholder for Sandeep Deo image */}
                                <div className="w-full h-full bg-charcoal flex items-center justify-center text-white text-2xl font-bold">SD</div>
                            </div>
                            <h3 className="font-bold text-lg">Sandeep Deo</h3>
                            <p className="text-saffron text-sm font-medium mb-2">Founder</p>
                            <p className="text-xs text-gray-500">Visionary behind KGF Bharat and the movement for Dharmic renaissance.</p>
                        </div>

                        {/* Kumar Gauraw */}
                        <div className="bg-white dark:bg-black p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 text-center">
                            <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 overflow-hidden">
                                {/* Placeholder for Kumar Gauraw image */}
                                <div className="w-full h-full bg-charcoal flex items-center justify-center text-white text-2xl font-bold">KG</div>
                            </div>
                            <h3 className="font-bold text-lg">Kumar Gauraw</h3>
                            <p className="text-saffron text-sm font-medium mb-2">Lead AI Instructor</p>
                            <p className="text-xs text-gray-500">Founder of Krishna Worldwide LLC. AI Expert & Architect.</p>
                        </div>

                        {/* Shweta Deo */}
                        <div className="bg-white dark:bg-black p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 text-center">
                            <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 overflow-hidden">
                                <div className="w-full h-full bg-charcoal flex items-center justify-center text-white text-2xl font-bold">SD</div>
                            </div>
                            <h3 className="font-bold text-lg">Shweta Deo</h3>
                            <p className="text-saffron text-sm font-medium mb-2">Director</p>
                            <p className="text-xs text-gray-500">Managing operations and institutional strategy.</p>
                        </div>

                        {/* Kamal Rawat */}
                        <div className="bg-white dark:bg-black p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 text-center">
                            <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 overflow-hidden">
                                <div className="w-full h-full bg-charcoal flex items-center justify-center text-white text-2xl font-bold">KR</div>
                            </div>
                            <h3 className="font-bold text-lg">Kamal Rawat</h3>
                            <p className="text-saffron text-sm font-medium mb-2">Course Controller</p>
                            <p className="text-xs text-gray-500">Overseeing academic rigor and student success.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
