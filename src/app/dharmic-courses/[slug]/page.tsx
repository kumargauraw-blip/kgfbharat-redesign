import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { getCourseBySlug, getBatchesByCourseId, getTestimonialsByCourseSlug } from "@/lib/data-source"
import { CourseDetail } from "@/components/courses/CourseDetail"
import { coursePlainExcerpt, isDharmicCourse } from "@/lib/course-paths"

export const dynamic = "force-dynamic"

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params
    const course = await getCourseBySlug(slug)
    if (!course || !isDharmicCourse(course)) return { title: "Course Not Found" }
    return {
        title: `${course.title} | KGF Bharat Dharmik Courses`,
        description: coursePlainExcerpt(course),
    }
}

export default async function DharmicCourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const course = await getCourseBySlug(slug)

    if (!course || !isDharmicCourse(course)) {
        notFound()
    }

    const [batches, testimonials] = await Promise.all([
        getBatchesByCourseId(course.id),
        getTestimonialsByCourseSlug(course.slug),
    ])

    return <CourseDetail course={course} batches={batches} testimonials={testimonials} />
}
