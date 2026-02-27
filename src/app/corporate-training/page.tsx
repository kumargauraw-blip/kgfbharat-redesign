"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { Building2, Users, CheckCircle, Send, Loader2, Award, TrendingUp, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { submitCorporateInquiry } from "@/app/actions"

interface CorporateForm {
    companyName: string
    contactName: string
    email: string
    phone: string
    companySize: string
    trainingTopics: string[]
    preferredFormat: string
    budgetRange: string
    message: string
}

const TRAINING_TOPICS = [
    "AI Fundamentals and Productivity",
    "Prompt Engineering",
    "AI for Content Creation",
    "AI for Engineering Teams",
    "AI for Marketing",
    "AI for Database Professionals",
    "AI Strategy for Leadership",
    "Custom Topic",
]

export default function CorporateTrainingPage() {
    const [isSuccess, setIsSuccess] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm<CorporateForm>()

    const onSubmit = async (data: CorporateForm) => {
        setIsSubmitting(true)
        const formData = new FormData()
        Object.entries(data).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                formData.append(key, value.join(", "))
            } else {
                formData.append(key, value as string)
            }
        })

        await submitCorporateInquiry(formData)
        setIsSuccess(true)
        setIsSubmitting(false)
    }

    if (isSuccess) {
        return (
            <div className="min-h-screen bg-off-white flex items-center justify-center p-4">
                <div className="bg-white p-8 rounded-2xl shadow-xl max-w-lg w-full text-center space-y-6 border border-gray-100">
                    <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                    <h2 className="text-3xl font-heading font-bold text-navy">Inquiry Sent!</h2>
                    <p className="text-gray-600">
                        Thank you for your interest in KGF Bharat Corporate Training. Our team will review your requirements and get back to you within 24 hours.
                    </p>
                    <Button className="bg-orange hover:bg-orange/90 text-white" onClick={() => setIsSuccess(false)}>
                        Send Another Inquiry
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Hero */}
            <div className="bg-navy text-white py-20">
                <div className="container-custom">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center space-x-2 bg-white/10 px-3 py-1 rounded-full text-orange text-sm font-medium mb-6">
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

            {/* Trust Indicators */}
            <div className="bg-off-white border-b border-gray-200">
                <div className="container-custom py-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                        <div>
                            <p className="text-3xl font-bold text-navy">50+</p>
                            <p className="text-sm text-gray-600">Companies Trained</p>
                        </div>
                        <div>
                            <p className="text-3xl font-bold text-navy">2,000+</p>
                            <p className="text-sm text-gray-600">Professionals Upskilled</p>
                        </div>
                        <div>
                            <p className="text-3xl font-bold text-navy">98%</p>
                            <p className="text-sm text-gray-600">Satisfaction Rate</p>
                        </div>
                        <div>
                            <p className="text-3xl font-bold text-navy">4.9/5</p>
                            <p className="text-sm text-gray-600">Average Rating</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-custom py-16 grid grid-cols-1 lg:grid-cols-2 gap-16">
                {/* Value Props */}
                <div className="space-y-10">
                    <div>
                        <h3 className="text-2xl font-bold font-heading text-navy mb-4">Why Train with Us?</h3>
                        <p className="text-gray-600">
                            We don't just teach tools; we teach workflows and strategic implementation. Our corporate programs are tailored to your industry needs.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                        <div className="flex items-start space-x-4">
                            <div className="bg-orange/10 p-3 rounded-lg text-orange shrink-0">
                                <Users className="h-6 w-6" />
                            </div>
                            <div>
                                <h4 className="font-bold text-lg text-navy">Customized Curriculum</h4>
                                <p className="text-sm text-gray-500">We adapt courses to fit your team's specific role (Engineering, Marketing, HR, etc.).</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <div className="bg-orange/10 p-3 rounded-lg text-orange shrink-0">
                                <Globe className="h-6 w-6" />
                            </div>
                            <div>
                                <h4 className="font-bold text-lg text-navy">Flexible Delivery</h4>
                                <p className="text-sm text-gray-500">Online, On-site, or Hybrid training options available to suit your schedule.</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <div className="bg-orange/10 p-3 rounded-lg text-orange shrink-0">
                                <TrendingUp className="h-6 w-6" />
                            </div>
                            <div>
                                <h4 className="font-bold text-lg text-navy">Measurable Outcomes</h4>
                                <p className="text-sm text-gray-500">Pre and post assessments to track skill improvement and ROI for your organization.</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <div className="bg-orange/10 p-3 rounded-lg text-orange shrink-0">
                                <Award className="h-6 w-6" />
                            </div>
                            <div>
                                <h4 className="font-bold text-lg text-navy">Certified Training</h4>
                                <p className="text-sm text-gray-500">Every participant receives a KGF Bharat certificate upon successful completion.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <div className="bg-off-white p-8 rounded-2xl shadow-lg border border-gray-100">
                    <h3 className="text-2xl font-bold font-heading text-navy mb-6">Request a Quote</h3>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-navy">Company / Organization *</label>
                            <input
                                {...register("companyName", { required: "Company name is required" })}
                                className="w-full p-3 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-orange focus:border-orange focus:outline-none"
                                placeholder="e.g. Acme Corp"
                            />
                            {errors.companyName && <span className="text-xs text-red-500">{errors.companyName.message}</span>}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-navy">Contact Person *</label>
                                <input
                                    {...register("contactName", { required: "Contact name is required" })}
                                    className="w-full p-3 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-orange focus:border-orange focus:outline-none"
                                    placeholder="John Doe"
                                />
                                {errors.contactName && <span className="text-xs text-red-500">{errors.contactName.message}</span>}
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-navy">Email *</label>
                                <input
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email address" }
                                    })}
                                    type="email"
                                    className="w-full p-3 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-orange focus:border-orange focus:outline-none"
                                    placeholder="john@acme.com"
                                />
                                {errors.email && <span className="text-xs text-red-500">{errors.email.message}</span>}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-navy">Phone</label>
                                <input
                                    {...register("phone")}
                                    className="w-full p-3 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-orange focus:border-orange focus:outline-none"
                                    placeholder="+91..."
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-navy">Company Size *</label>
                                <select
                                    {...register("companySize", { required: "Please select company size" })}
                                    className="w-full p-3 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-orange focus:border-orange focus:outline-none"
                                >
                                    <option value="">Select size...</option>
                                    <option value="1-50">1 to 50 employees</option>
                                    <option value="51-200">51 to 200 employees</option>
                                    <option value="201-1000">201 to 1,000 employees</option>
                                    <option value="1000+">1,000+ employees</option>
                                </select>
                                {errors.companySize && <span className="text-xs text-red-500">{errors.companySize.message}</span>}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-navy">Training Topics of Interest *</label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {TRAINING_TOPICS.map((topic) => (
                                    <label key={topic} className="flex items-center space-x-2 text-sm text-gray-700 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            value={topic}
                                            {...register("trainingTopics", { required: "Select at least one topic" })}
                                            className="rounded border-gray-300 text-orange focus:ring-orange"
                                        />
                                        <span>{topic}</span>
                                    </label>
                                ))}
                            </div>
                            {errors.trainingTopics && <span className="text-xs text-red-500">{errors.trainingTopics.message}</span>}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-navy">Preferred Format</label>
                                <select
                                    {...register("preferredFormat")}
                                    className="w-full p-3 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-orange focus:border-orange focus:outline-none"
                                >
                                    <option value="">Select format...</option>
                                    <option value="Online">Online (Virtual)</option>
                                    <option value="In-Person">In-Person (On-site)</option>
                                    <option value="Hybrid">Hybrid</option>
                                    <option value="Flexible">Flexible / No Preference</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-navy">Budget Range</label>
                                <select
                                    {...register("budgetRange")}
                                    className="w-full p-3 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-orange focus:border-orange focus:outline-none"
                                >
                                    <option value="">Select range...</option>
                                    <option value="under-1L">Under 1 Lakh</option>
                                    <option value="1L-5L">1 to 5 Lakhs</option>
                                    <option value="5L-10L">5 to 10 Lakhs</option>
                                    <option value="above-10L">Above 10 Lakhs</option>
                                    <option value="discuss">Prefer to Discuss</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-navy">Additional Notes</label>
                            <textarea
                                {...register("message")}
                                className="w-full p-3 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-orange focus:border-orange focus:outline-none min-h-[100px]"
                                placeholder="Tell us about your team's current skill level, goals, timeline, or any other requirements..."
                            />
                        </div>

                        <Button type="submit" disabled={isSubmitting} className="w-full bg-orange hover:bg-orange/90 text-white text-lg h-12 font-semibold">
                            {isSubmitting ? <Loader2 className="animate-spin mr-2" /> : <Send className="mr-2 h-4 w-4" />}
                            Submit Request
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    )
}
