"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

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
    // const data = Object.fromEntries(formData.entries());
    // console.log("Corporate Inquiry Received:", data);

    // In a real app, use Resend/Nodemailer here
    await new Promise(resolve => setTimeout(resolve, 1000));
}

export async function saveCourseAction(data: any) {
    // Simulate DB save
    // console.log("Saving Course Data:", data);

    // In a real app, validate and save to Postgres/Prisma
    await new Promise(resolve => setTimeout(resolve, 500));

    return { success: true, message: "Course saved successfully" };
}

export async function fetchCourses() {
    // Simulate DB fetch
    await new Promise(resolve => setTimeout(resolve, 500));

    // Return dummy empty array or mock data for MVP
    return [
        {
            id: "1",
            title: "Demo Course",
            slug: "demo-course",
            tagline: "A demo course",
            description: "Description",
            targetAudience: ["Everyone"],
            status: "Active",
            price: "Free",
            duration: "1 hour",
            format: "Online",
            overview: "Overview",
            curriculum: [],
            learningOutcomes: [],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }
    ];
}

export async function fetchCourse(slug: string) {
    // Simulate DB fetch
    await new Promise(resolve => setTimeout(resolve, 500));

    // Return mock data
    return {
        id: "1",
        title: "Demo Course",
        slug: slug,
        tagline: "A demo course",
        description: "Description",
        targetAudience: ["Everyone"],
        status: "Active",
        price: "Free",
        duration: "1 hour",
        format: "Online",
        overview: "Overview",
        curriculum: [],
        learningOutcomes: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };
}
