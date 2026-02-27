"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { getCourses, getCourseBySlug, upsertCourse, deleteCourse } from "@/lib/courseService";
import { getBatches, upsertBatch, deleteBatch } from "@/lib/batchService";
import { Batch, Course } from "@/lib/types";

const apiKey = process.env.GEMINI_API_KEY;

const SYSTEM_INSTRUCTION = `You are the KGF Bharat AI Advisor. Your goal is to help students bridge the gap between Dharmik wisdom and modern AI technology.
You recommend courses from KGF Bharat's catalog (Dharmik Education and AI-Tech).
Always be polite, culturally respectful, and insightful.
If a student asks about tradition, link it to how technology can preserve it.
If they ask about tech, link it to the ethics and values of Sanatana Dharma.`;

export async function chatWithAI(history: any[], message: string) {
    if (!apiKey) {
        console.error("Missing Gemini API Key in server environment.");
        return "I apologize, my connection to the knowledge source is currently limited. Please try again later.";
    }

    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            systemInstruction: SYSTEM_INSTRUCTION
        });

        const chat = model.startChat({
            history: history.map(msg => ({
                role: msg.role === 'user' ? 'user' : 'model',
                parts: [{ text: msg.content }],
            })),
        });

        const result = await chat.sendMessage(message);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error("Gemini API Error:", error);
        return "The light of knowledge is currently flickering. Please check back in a moment.";
    }
}

export async function submitCorporateInquiry(formData: FormData) {
    // Simulate email sending or DB storage
    await new Promise(resolve => setTimeout(resolve, 1000));
}

export async function submitContactForm(formData: FormData) {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const subject = formData.get("subject") as string;
    const message = formData.get("message") as string;

    // TODO: Integrate with email service or database
    console.log("Contact form submission:", { name, email, subject, message });
    await new Promise(resolve => setTimeout(resolve, 1000));

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
    return getCourses();
}

export async function fetchCourse(slug: string) {
    return getCourseBySlug(slug);
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
    return getBatches();
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
