"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { Send, Users, CheckCircle, Loader2, Calendar, UserCheck, Award } from "lucide-react"
import { submitCustomBatchInquiry } from "@/app/actions"
import { Course } from "@/lib/types"

interface CustomBatchFormData {
    contactName: string
    email: string
    phone: string
    organizationName: string
    numberOfParticipants: string
    preferredCourse: string
    preferredSchedule: string
    additionalRequirements: string
}

const valueProps = [
    {
        icon: Calendar,
        title: "Customized Schedule",
        description: "Pick dates that work for your team - weekdays, weekends, or intensive workshops.",
    },
    {
        icon: UserCheck,
        title: "Dedicated Instructor",
        description: "Get a personal instructor focused entirely on your group's learning goals.",
    },
    {
        icon: Users,
        title: "Group Discounts",
        description: "Special pricing for batches of 15 or more participants from the same organization.",
    },
    {
        icon: Award,
        title: "Private Sessions",
        description: "Exclusive sessions tailored to your industry and use cases.",
    },
]

export function CustomBatchForm({ courses }: { courses: Course[] }) {
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CustomBatchFormData>()

    async function onSubmit(data: CustomBatchFormData) {
        setIsSubmitting(true)
        const formData = new FormData()
        Object.entries(data).forEach(([key, value]) => {
            formData.append(key, value)
        })

        const result = await submitCustomBatchInquiry(formData)
        if (result?.success) {
            setIsSubmitted(true)
        }
        setIsSubmitting(false)
    }

    if (isSubmitted) {
        return (
            <section className="bg-blue-50 py-20 px-4">
                <div className="max-w-2xl mx-auto text-center">
                    <div className="bg-white rounded-2xl p-12 shadow-lg">
                        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">
                            Thank You for Your Inquiry!
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                            We have received your custom batch request. Our team will review the details
                            and get back to you within 24-48 hours with a tailored proposal.
                        </p>
                    </div>
                </div>
            </section>
        )
    }

    return (
        <section id="custom-batch" className="bg-slate-50 py-20 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <span className="inline-block bg-blue-100 text-blue-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
                        For Organizations
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Request a Custom Batch
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        Looking to train your team? We offer private batches for groups of 15-20+ people
                        with customized schedules, dedicated instructors, and group pricing.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Value Props */}
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-6">
                            Why choose a custom batch?
                        </h3>
                        {valueProps.map((prop) => (
                            <div key={prop.title} className="flex items-start gap-4">
                                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                                    <prop.icon className="h-6 w-6 text-blue-600" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-1">{prop.title}</h4>
                                    <p className="text-sm text-gray-600 leading-relaxed">{prop.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Form */}
                    <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                    Contact Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    {...register("contactName", { required: "Contact name is required" })}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                                    placeholder="Your full name"
                                />
                                {errors.contactName && (
                                    <p className="text-red-500 text-xs mt-1">{errors.contactName.message}</p>
                                )}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                        Email <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        {...register("email", {
                                            required: "Email is required",
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message: "Invalid email address",
                                            },
                                        })}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                                        placeholder="you@company.com"
                                    />
                                    {errors.email && (
                                        <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                        Phone
                                    </label>
                                    <input
                                        type="text"
                                        {...register("phone")}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                                        placeholder="+91 98765 43210"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                    Organization Name
                                </label>
                                <input
                                    type="text"
                                    {...register("organizationName")}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                                    placeholder="Your company or organization"
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                        Number of Participants <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        {...register("numberOfParticipants", { required: "Please select the number of participants" })}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors bg-white"
                                    >
                                        <option value="">Select...</option>
                                        <option value="10-15">10-15</option>
                                        <option value="15-25">15-25</option>
                                        <option value="25-50">25-50</option>
                                        <option value="50+">50+</option>
                                    </select>
                                    {errors.numberOfParticipants && (
                                        <p className="text-red-500 text-xs mt-1">{errors.numberOfParticipants.message}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                        Preferred Course <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        {...register("preferredCourse", { required: "Please select a course" })}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors bg-white"
                                    >
                                        <option value="">Select a course...</option>
                                        {courses.map((course) => (
                                            <option key={course.id} value={course.title}>
                                                {course.title}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.preferredCourse && (
                                        <p className="text-red-500 text-xs mt-1">{errors.preferredCourse.message}</p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                    Preferred Schedule / Dates
                                </label>
                                <input
                                    type="text"
                                    {...register("preferredSchedule")}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                                    placeholder="e.g. March 2026, Weekends only"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                    Additional Requirements
                                </label>
                                <textarea
                                    {...register("additionalRequirements")}
                                    rows={3}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none"
                                    placeholder="Any specific topics, goals, or logistics to share..."
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="h-5 w-5 animate-spin" />
                                        Submitting...
                                    </>
                                ) : (
                                    <>
                                        <Send className="h-5 w-5" />
                                        Submit Inquiry
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
