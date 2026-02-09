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
