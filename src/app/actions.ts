'use server'

import { revalidatePath } from 'next/cache';
import { Course } from '@/lib/types';
import { getCourses, upsertCourse, deleteCourse, getCourseBySlug } from '@/lib/courseService';

export async function fetchCourses() {
    return await getCourses();
}

export async function fetchCourse(slug: string) {
    return await getCourseBySlug(slug);
}

export async function saveCourseAction(course: Course) {
    try {
        await upsertCourse(course);
        revalidatePath('/admin/courses');
        revalidatePath('/ai-courses');
        return { success: true, message: 'Course saved successfully' };
    } catch (error) {
        return { success: false, message: 'Failed to save course' };
    }
}

export async function deleteCourseAction(id: string) {
    try {
        await deleteCourse(id);
        revalidatePath('/admin/courses');
        revalidatePath('/ai-courses');
        return { success: true, message: 'Course deleted successfully' };
    } catch (error) {
        return { success: false, message: 'Failed to delete course' };
    }
}

export async function submitCorporateInquiry(formData: FormData) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const rawData = {
        companyName: formData.get('companyName'),
        contactName: formData.get('contactName'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        studentCount: formData.get('studentCount'),
        message: formData.get('message'),
        courses: formData.getAll('courses'),
    };

    console.log("Corporate Inquiry Received:", rawData);
    return { success: true, message: "Inquiry received! Our team will contact you shortly." };
}
