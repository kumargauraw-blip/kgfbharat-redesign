"use server";

import { getCourses as dsGetCourses, getCourseBySlug as dsGetCourseBySlug, getBatches as dsGetBatches } from "@/lib/data-source";
import { upsertCourse, deleteCourse } from "@/lib/courseService";
import { upsertBatch, deleteBatch } from "@/lib/batchService";
import { Batch, Course } from "@/lib/types";

export async function submitCustomBatchInquiry(formData: FormData) {
    const contactName = formData.get("contactName") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const organizationName = formData.get("organizationName") as string
    const numberOfParticipants = formData.get("numberOfParticipants") as string
    const preferredCourse = formData.get("preferredCourse") as string
    const preferredSchedule = formData.get("preferredSchedule") as string
    const additionalRequirements = formData.get("additionalRequirements") as string

    const res = await fetch("https://formspree.io/f/mlgwkkeo", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
            name: contactName,
            email,
            phone,
            organizationName,
            numberOfParticipants,
            preferredCourse,
            preferredSchedule,
            additionalRequirements,
            _subject: `[KGF Custom Batch] ${preferredCourse} - ${contactName}`,
        }),
    })

    if (!res.ok) {
        console.error("Formspree error:", await res.text())
        return { success: false }
    }

    return { success: true }
}

export async function submitContactForm(formData: FormData) {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const subject = formData.get("subject") as string;
    const message = formData.get("message") as string;

    const res = await fetch("https://formspree.io/f/mlgwkkeo", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
            name,
            email,
            subject,
            message,
            _subject: `[KGF Contact] ${subject}`,
        }),
    });

    if (!res.ok) {
        console.error("Formspree error:", await res.text());
        return { success: false, message: "Failed to send message. Please try again." };
    }

    return { success: true, message: "Contact form submitted successfully" };
}

// Course actions
export async function saveCourseAction(data: Course) {
    try {
        await upsertCourse(data);
        return { success: true, message: "Course saved successfully" };
    } catch (error) {
        console.error("Error saving course:", error);
        return { success: false, message: "Failed to save course" };
    }
}

export async function fetchCourses() {
    return dsGetCourses();
}

export async function fetchCourse(slug: string) {
    return dsGetCourseBySlug(slug);
}

export async function deleteCourseAction(courseId: string) {
    try {
        await deleteCourse(courseId);
        return { success: true, message: "Course deleted successfully" };
    } catch (error) {
        console.error("Error deleting course:", error);
        return { success: false, message: "Failed to delete course" };
    }
}

// Batch actions
export async function fetchBatches() {
    return dsGetBatches();
}

export async function saveBatchAction(data: Batch) {
    try {
        await upsertBatch(data);
        return { success: true, message: "Batch saved successfully" };
    } catch (error) {
        console.error("Error saving batch:", error);
        return { success: false, message: "Failed to save batch" };
    }
}

export async function deleteBatchAction(batchId: string) {
    try {
        await deleteBatch(batchId);
        return { success: true, message: "Batch deleted successfully" };
    } catch (error) {
        console.error("Error deleting batch:", error);
        return { success: false, message: "Failed to delete batch" };
    }
}
