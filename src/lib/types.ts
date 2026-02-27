export type CourseFormat = "Online" | "In-Person" | "Hybrid"
export type CourseStatus = "Active" | "Planned" | "Completed" | "Enrollment Closed"
export type TargetAudience = "Everyone" | "Creators" | "Engineers" | "Database Professionals" | "Marketers" | "Business Leaders"

export interface Batch {
    id: string
    courseId: string
    batchNumber: string
    startDate: string
    endDate: string
    format: CourseFormat
    location?: string
    price: string
    enrollmentUrl: string
    status: "Upcoming" | "Enrolling" | "In Progress" | "Completed"
    maxSeats?: number
    seatsRemaining?: number
}

export interface Course {
    id: string
    slug: string
    title: string
    tagline: string
    description: string
    targetAudience: TargetAudience[]
    status: CourseStatus
    price: string
    duration: string
    format: CourseFormat
    thumbnailUrl?: string

    // Detailed Content
    overview: string
    curriculum: string[]
    learningOutcomes: string[]
    instructorBio?: string

    // FAQ
    faq?: FAQ[]

    // Meta
    createdAt: string
    updatedAt: string
}

export interface Event {
    id: string
    title: string
    slug: string
    description: string
    date: string
    endDate?: string
    time: string
    location: string
    type: "upcoming" | "past"
    category: "conference" | "workshop" | "seminar" | "cultural" | "awards"
    imageUrl?: string
    registrationUrl?: string
    highlights?: string[]
}

export interface GalleryItem {
    id: string
    title: string
    description?: string
    type: "photo" | "video"
    url: string
    thumbnailUrl?: string
    category: string
    date: string
}

export interface TeamMember {
    name: string
    role: string
    initials: string
    description: string
    imageUrl?: string
}

export interface Testimonial {
    id: string
    name: string
    role: string
    company?: string
    content: string
    courseSlug?: string
    rating: number
    imageUrl?: string
}

export interface FAQ {
    question: string
    answer: string
}
