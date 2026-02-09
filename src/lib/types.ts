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
    curriculum: string[] // List of modules or topics
    learningOutcomes: string[]
    instructorBio?: string

    // Meta
    createdAt: string
    updatedAt: string
}
