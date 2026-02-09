import { notFound } from "next/navigation"
import CourseForm from "@/components/admin/CourseForm"
import { getCourses } from "@/lib/courseService"

interface PageProps {
    params: Promise<{ id: string }>
}

export default async function EditCoursePage({ params }: PageProps) {
    const { id } = await params
    const courses = await getCourses()
    const course = courses.find((c) => c.id === id)

    if (!course) {
        notFound()
    }

    return <CourseForm initialData={course} />
}
