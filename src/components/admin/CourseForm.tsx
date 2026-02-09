"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { ArrowLeft, Loader2, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Course, CourseFormat, CourseStatus, TargetAudience } from "@/lib/types"
import { saveCourseAction } from "@/app/actions"
import Link from "next/link"

// Simple UI for the form (using standard HTML/Tailwind for speed without extra UI libs)
export default function CourseForm({ initialData }: { initialData?: Partial<Course> }) {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)

    const { register, handleSubmit, formState: { errors } } = useForm<Course>({
        defaultValues: initialData || {
            status: "Planned",
            format: "Online",
            targetAudience: ["Everyone"],
            curriculum: [],
            learningOutcomes: []
        }
    })

    const onSubmit = async (data: Course) => {
        setIsSubmitting(true)
        try {
            // Generate ID/Slug if new
            if (!data.id) {
                data.id = crypto.randomUUID()
                data.slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
                data.createdAt = new Date().toISOString()
            }
            data.updatedAt = new Date().toISOString()

            // Handle array fields (simple comma separation for MVP)
            if (typeof data.targetAudience === 'string') {
                data.targetAudience = (data.targetAudience as string).split(',').map((s: string) => s.trim()) as TargetAudience[]
            }
            // Ensure these are arrays (if coming from text inputs)
            // For a real app, use FieldArrays. For MVP, we'll assume text input with newlines/commas? 
            // Actually simpler: let's just save basic fields first.

            const result = await saveCourseAction(data)
            if (result.success) {
                router.push("/admin/courses")
                router.refresh()
            } else {
                alert(result.message)
            }
        } catch (error) {
            console.error(error)
            alert("An error occurred")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 max-w-4xl mx-auto pb-20">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href="/admin/courses"><ArrowLeft className="h-4 w-4" /></Link>
                    </Button>
                    <h1 className="text-2xl font-bold">{initialData?.id ? "Edit Course" : "New Course"}</h1>
                </div>
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    <Save className="mr-2 h-4 w-4" />
                    Save Course
                </Button>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow space-y-6 border border-gray-200 dark:border-gray-700">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Course Title</label>
                        <input
                            {...register("title", { required: true })}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="e.g. AI Fundamentals..."
                        />
                        {errors.title && <span className="text-sm text-red-500">Required</span>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Tagline / Short Desc</label>
                        <input
                            {...register("tagline", { required: true })}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                        {errors.tagline && <span className="text-sm text-red-500">Required</span>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Target Audience (Comma separated)</label>
                        <input
                            {...register("targetAudience", { required: true })}
                            placeholder="Everyone, Creators, Engineers"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Status</label>
                            <select
                                {...register("status")}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            >
                                <option value="Active">Active</option>
                                <option value="Planned">Planned</option>
                                <option value="Enrollment Closed">Enrollment Closed</option>
                                <option value="Completed">Completed</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Format</label>
                            <select
                                {...register("format")}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            >
                                <option value="Online">Online</option>
                                <option value="In-Person">In-Person</option>
                                <option value="Hybrid">Hybrid</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Full Description</label>
                    <textarea
                        {...register("description", { required: true })}
                        className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                    {errors.description && <span className="text-sm text-red-500">Required</span>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Price Info</label>
                        <input
                            {...register("price")}
                            placeholder="e.g. ₹4,999 or Contact for pricing"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Duration</label>
                        <input
                            {...register("duration")}
                            placeholder="e.g. 4 Weeks / 20 Hours"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                    </div>
                </div>
            </div>
        </form>
    )
}
