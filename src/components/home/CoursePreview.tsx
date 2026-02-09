"use client"
import Link from "next/link"
import { CourseCard, Course, CourseCategory } from "@/components/home/CourseCard"

// Mock Data matching the ModernisedHome constants
const COURSES: Course[] = [
    {
        id: 1,
        title: "Vedic Leadership & Governance",
        description: "Master the art of leadership through the lens of Rajneeti and Arthashastra.",
        category: CourseCategory.DHARMIK,
        duration: "12 Weeks",
        level: "Intermediate",
        image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: 2,
        title: "Sanskrit for Computation",
        description: "Understanding the mathematical structure of Sanskrit and its relevance to coding.",
        category: CourseCategory.DHARMIK,
        duration: "8 Weeks",
        level: "Beginner",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: 3,
        title: "Itihasa: The True History",
        description: "A data-driven approach to understanding the timelines of Ramayana and Mahabharata.",
        category: CourseCategory.DHARMIK,
        duration: "10 Weeks",
        level: "All Levels",
        image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: 4,
        title: "Foundation of LLMs",
        description: "Build your own Large Language Models from scratch using Python and PyTorch.",
        category: CourseCategory.AI_TECH,
        duration: "16 Weeks",
        level: "Advanced",
        image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: 5,
        title: "AI Agents for Enterprise",
        description: "Deploy autonomous AI agents that can perform complex business tasks.",
        category: CourseCategory.AI_TECH,
        duration: "12 Weeks",
        level: "Intermediate",
        image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: 6,
        title: "Computer Vision Mastery",
        description: "Teach machines to 'see' and interpret the visual world with state-of-the-art models.",
        category: CourseCategory.AI_TECH,
        duration: "14 Weeks",
        level: "Advanced",
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800"
    }
];

export function CoursePreview() {
    const dharmikCourses = COURSES.filter(c => c.category === CourseCategory.DHARMIK);
    const aiCourses = COURSES.filter(c => c.category === CourseCategory.AI_TECH);

    return (
        <section id="courses" className="py-32 space-y-48 bg-white">
            {/* Dharmik Education Section */}
            <div className="container-custom">
                <div className="flex flex-col md:flex-row items-center justify-between mb-20 gap-8">
                    <div className="space-y-4 text-center md:text-left">
                        <h2 className="text-5xl md:text-7xl font-serif font-bold italic text-navy">
                            Dharmik <span className="text-orange">Education</span>
                        </h2>
                        <div className="w-24 h-2 bg-orange rounded-full mx-auto md:mx-0"></div>
                        <p className="text-gray-500 text-lg font-medium max-w-xl">
                            Deep exploration into Sanskrit literature, Vedic philosophy, and the roots of Bharat.
                        </p>
                    </div>
                    <Link href="/courses" className="text-orange-dark font-black uppercase tracking-widest text-sm hover:underline decoration-2 underline-offset-8">
                        View All Tracks &rarr;
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {dharmikCourses.map(course => (
                        <CourseCard key={course.id} course={course} />
                    ))}
                </div>
            </div>

            {/* AI Tech Section */}
            <div className="container-custom">
                <div className="flex flex-col md:flex-row items-center justify-between mb-20 gap-8">
                    <div className="space-y-4 text-center md:text-left">
                        <h2 className="text-5xl md:text-7xl font-serif font-bold italic text-navy">
                            AI-Tech <span className="text-blue-600">Innovation</span>
                        </h2>
                        <div className="w-24 h-2 bg-blue-600 rounded-full mx-auto md:mx-0"></div>
                        <p className="text-gray-500 text-lg font-medium max-w-xl">
                            Building the sovereign technological future of Bharat through AI and Engineering.
                        </p>
                    </div>
                    <Link href="/ai-courses" className="text-blue-600 font-black uppercase tracking-widest text-sm hover:underline decoration-2 underline-offset-8">
                        Explore Lab &rarr;
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {aiCourses.map(course => (
                        <CourseCard key={course.id} course={course} />
                    ))}
                </div>
            </div>
        </section>
    )
}
