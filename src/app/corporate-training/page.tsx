"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { Building2, Users, CheckCircle, Send, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { submitCorporateInquiry } from "@/app/actions"

interface CorporateForm {
    companyName: string
    contactName: string
    email: string
    phone: string
    studentCount: string
    message: string
    courses: string[]
}

export default function CorporateTrainingPage() {
    const [isSuccess, setIsSuccess] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm<CorporateForm>()

    const onSubmit = async (data: CorporateForm) => {
        setIsSubmitting(true)
        const formData = new FormData()
        Object.entries(data).forEach(([key, value]) => {
            formData.append(key, value as string)
        })

        await submitCorporateInquiry(formData)
        setIsSuccess(true)
        setIsSubmitting(false)
    }

    if (isSuccess) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-black flex items-center justify-center p-4">
                <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl max-w-lg w-full text-center space-y-6 border border-gray-100 dark:border-gray-700">
                    <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                    <h2 className="text-3xl font-heading font-bold text-charcoal">Inquiry Sent!</h2>
                    <p className="text-gray-600 dark:text-gray-300">
                        Thank you for your interest in KGF Bharat Corporate Training. Our team will review your requirements and get back to you within 24 hours.
                    </p>
                    <Button className="bg-saffron hover:bg-saffron-dark text-white" onClick={() => setIsSuccess(false)}>
                        Send Another Inquiry
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-white dark:bg-black">
            {/* Hero */}
            <div className="bg-charcoal text-white py-20">
                <div className="container-custom">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center space-x-2 bg-white/10 px-3 py-1 rounded-full text-saffron text-sm font-medium mb-6">
                            <Building2 className="h-4 w-4" />
                            <span>For Organizations</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
                            Empower Your Workforce with AI
                        </h1>
                        <p className="text-xl text-gray-200 leading-relaxed">
                            Customized AI training programs designed to upskill your team, boost productivity, and drive innovation.
                            Led by industry experts from KGF Bharat & Krishna Worldwide.
                        </p>
                    </div>
                </div>
            </div>

            <div className="container-custom py-16 grid grid-cols-1 lg:grid-cols-2 gap-16">
                {/* Value Props */}
                <div className="space-y-10">
                    <div>
                        <h3 className="text-2xl font-bold font-heading text-charcoal mb-4">Why Train with Us?</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                            We don't just teach tools; we teach workflows and strategic implementation. Our corporate programs are tailored to your industry needs.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                        <div className="flex items-start space-x-4">
                            <div className="bg-saffron/10 p-3 rounded-lg text-saffron shrink-0">
                                <Users className="h-6 w-6" />
                            </div>
                            <div>
                                <h4 className="font-bold text-lg">Customized Curriculum</h4>
                                <p className="text-sm text-gray-500">We adapt courses to fit your team's specific role (Engineering, Marketing, HR, etc.).</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <div className="bg-saffron/10 p-3 rounded-lg text-saffron shrink-0">
                                <CheckCircle className="h-6 w-6" />
                            </div>
                            <div>
                                <h4 className="font-bold text-lg">Flexible Delivery</h4>
                                <p className="text-sm text-gray-500">Online, On-site, or Hybrid training options available to suit your schedule.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800">
                    <h3 className="text-2xl font-bold font-heading mb-6">Request a Quote</h3>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Company / Organization *</label>
                            <input {...register("companyName", { required: true })} className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-black focus:ring-2 focus:ring-saffron focus:outline-none" placeholder="e.g. Acme Corp" />
                            {errors.companyName && <span className="text-xs text-red-500">Required</span>}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Contact Person *</label>
                                <input {...register("contactName", { required: true })} className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-black focus:ring-2 focus:ring-saffron focus:outline-none" placeholder="John Doe" />
                                {errors.contactName && <span className="text-xs text-red-500">Required</span>}
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Email *</label>
                                <input {...register("email", { required: true })} type="email" className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-black focus:ring-2 focus:ring-saffron focus:outline-none" placeholder="john@acme.com" />
                                {errors.email && <span className="text-xs text-red-500">Required</span>}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Expected Students *</label>
                                <select {...register("studentCount", { required: true })} className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-black focus:ring-2 focus:ring-saffron focus:outline-none">
                                    <option value="">Select range...</option>
                                    <option value="5-10">5-10 Employees</option>
                                    <option value="10-25">10-25 Employees</option>
                                    <option value="25-50">25-50 Employees</option>
                                    <option value="50+">50+ Employees</option>
                                </select>
                                {errors.studentCount && <span className="text-xs text-red-500">Required</span>}
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Phone</label>
                                <input {...register("phone")} className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-black focus:ring-2 focus:ring-saffron focus:outline-none" placeholder="+91..." />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Training Requirements</label>
                            <textarea {...register("message", { required: true })} className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-black focus:ring-2 focus:ring-saffron focus:outline-none min-h-[100px]" placeholder="Tell us about your team's current skill level and what you hope to achieve..." />
                            {errors.message && <span className="text-xs text-red-500">Required</span>}
                        </div>

                        <Button type="submit" disabled={isSubmitting} className="w-full bg-dark-red hover:bg-dark-red-light text-white text-lg h-12">
                            {isSubmitting ? <Loader2 className="animate-spin mr-2" /> : <Send className="mr-2 h-4 w-4" />}
                            Submit Request
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    )
}
