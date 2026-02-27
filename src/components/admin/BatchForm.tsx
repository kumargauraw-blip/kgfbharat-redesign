"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { ArrowLeft, Loader2, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Batch, Course } from "@/lib/types"
import { saveBatchAction, fetchCourses } from "@/app/actions"
import Link from "next/link"

export default function BatchForm({ initialData }: { initialData?: Partial<Batch> }) {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [courses, setCourses] = useState<Course[]>([])

    const { register, handleSubmit, formState: { errors } } = useForm<Batch>({
        defaultValues: initialData || {
            status: "Upcoming",
            format: "Online",
        }
    })

    useEffect(() => {
        fetchCourses().then(setCourses)
    }, [])

    const onSubmit = async (data: Batch) => {
        setIsSubmitting(true)
        try {
            if (!data.id) {
                data.id = `b${Date.now()}`
            }
            if (data.maxSeats) {
                data.maxSeats = Number(data.maxSeats)
            }
            if (data.seatsRemaining != null) {
                data.seatsRemaining = Number(data.seatsRemaining)
            }

            const result = await saveBatchAction(data)
            if (result.success) {
                router.push("/admin/batches")
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

    const inputClass = "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 max-w-4xl mx-auto pb-20">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href="/admin/batches"><ArrowLeft className="h-4 w-4" /></Link>
                    </Button>
                    <h1 className="text-2xl font-bold">{initialData?.id ? "Edit Batch" : "New Batch"}</h1>
                </div>
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    <Save className="mr-2 h-4 w-4" />
                    Save Batch
                </Button>
            </div>

            {initialData?.id && (
                <input type="hidden" {...register("id")} />
            )}

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow space-y-6 border border-gray-200 dark:border-gray-700">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Course *</label>
                        <select
                            {...register("courseId", { required: true })}
                            className={inputClass}
                        >
                            <option value="">Select a course...</option>
                            {courses.map(c => (
                                <option key={c.id} value={c.id}>{c.title}</option>
                            ))}
                        </select>
                        {errors.courseId && <span className="text-sm text-red-500">Required</span>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Batch Number *</label>
                        <input
                            {...register("batchNumber", { required: true })}
                            className={inputClass}
                            placeholder="e.g. Batch 1"
                        />
                        {errors.batchNumber && <span className="text-sm text-red-500">Required</span>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Start Date *</label>
                        <input
                            {...register("startDate", { required: true })}
                            type="date"
                            className={inputClass}
                        />
                        {errors.startDate && <span className="text-sm text-red-500">Required</span>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">End Date *</label>
                        <input
                            {...register("endDate", { required: true })}
                            type="date"
                            className={inputClass}
                        />
                        {errors.endDate && <span className="text-sm text-red-500">Required</span>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Format</label>
                        <select {...register("format")} className={inputClass}>
                            <option value="Online">Online</option>
                            <option value="In-Person">In-Person</option>
                            <option value="Hybrid">Hybrid</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Status</label>
                        <select {...register("status")} className={inputClass}>
                            <option value="Upcoming">Upcoming</option>
                            <option value="Enrolling">Enrolling</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Location</label>
                        <input
                            {...register("location")}
                            className={inputClass}
                            placeholder="e.g. Virtual (Zoom)"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Price *</label>
                        <input
                            {...register("price", { required: true })}
                            className={inputClass}
                            placeholder="e.g. 4,999"
                        />
                        {errors.price && <span className="text-sm text-red-500">Required</span>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Max Seats</label>
                        <input
                            {...register("maxSeats")}
                            type="number"
                            className={inputClass}
                            placeholder="e.g. 30"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Seats Remaining</label>
                        <input
                            {...register("seatsRemaining")}
                            type="number"
                            className={inputClass}
                            placeholder="e.g. 25"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Enrollment URL *</label>
                    <input
                        {...register("enrollmentUrl", { required: true })}
                        className={inputClass}
                        placeholder="https://..."
                    />
                    {errors.enrollmentUrl && <span className="text-sm text-red-500">Required</span>}
                </div>
            </div>
        </form>
    )
}
