"use client";

import React, { useState, useRef, useEffect } from 'react';
import { chatWithAI } from '@/app/actions';

// Ensure this matches the server action signature
interface ChatMessage {
    role: 'user' | 'model';
    content: string;
}

const AIAdvisor: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [chatHistory]);

    const handleSend = async () => {
        if (!message.trim() || isLoading) return;

        const userMsg = message.trim();
        setMessage('');

        // Add user message to local state immediately
        const newHistory = [...chatHistory, { role: 'user', content: userMsg } as ChatMessage];
        setChatHistory(newHistory);
        setIsLoading(true);

        try {
            // Call server action
            const responseText = await chatWithAI(newHistory, userMsg);

            setChatHistory(prev => [...prev, { role: 'model', content: responseText }]);
        } catch (error) {
            console.error("Chat Error:", error);
            setChatHistory(prev => [...prev, { role: 'model', content: "Sorry, I encountered an error connecting to the guru." }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-8 right-8 z-[100]">
            {isOpen && (
                <div className="bg-white absolute bottom-24 right-0 w-[350px] md:w-[450px] max-h-[600px] flex flex-col rounded-[2.5rem] shadow-[0_25px_60px_rgba(0,0,0,0.15)] overflow-hidden border border-gray-100 animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <div className="bg-gradient-to-r from-orange to-orange-dark p-7 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-md border border-white/20 shadow-inner">
                                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8V4H8" /><rect width="16" height="12" x="4" y="8" rx="2" /><path d="M2 14h2" /><path d="M20 14h2" /><path d="M15 13v2" /><path d="M9 13v2" /></svg>
                            </div>
                            <div>
                                <h4 className="font-extrabold text-white text-lg">Advisor GPT</h4>
                                <p className="text-[10px] text-orange-light font-bold uppercase tracking-widest">KGF Virtual Guru</p>
                            </div>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white bg-white/10 p-2 rounded-xl transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                        </button>
                    </div>

                    <div ref={scrollRef} className="flex-1 p-6 overflow-y-auto min-h-[350px] space-y-5 bg-gray-50/50">
                        {chatHistory.length === 0 && (
                            <div className="text-center py-10 space-y-4">
                                <div className="w-16 h-16 bg-orange/10 rounded-full flex items-center justify-center mx-auto text-orange">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 2v2" /><path d="M14 2v2" /><path d="M10 20v2" /><path d="M14 20v2" /><path d="M18 6h2" /><path d="M18 10h2" /><path d="M18 14h2" /><path d="M18 18h2" /><path d="M4 6h2" /><path d="M4 10h2" /><path d="M4 14h2" /><path d="M4 18h2" /><rect width="12" height="12" x="6" y="6" rx="2" /></svg>
                                </div>
                                <p className="text-gray-500 text-sm font-semibold max-w-[250px] mx-auto">Namaste! How can I guide you through our Dharmik and Tech curriculums today?</p>
                            </div>
                        )}
                        {chatHistory.map((msg, i) => (
                            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[85%] px-5 py-4 rounded-3xl text-sm font-medium shadow-sm leading-relaxed ${msg.role === 'user' ? 'bg-orange text-white' : 'bg-white border border-gray-100 text-gray-700'}`}>
                                    {msg.content}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-white border border-gray-100 px-5 py-3 rounded-2xl flex gap-1.5 items-center shadow-sm">
                                    <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce"></div>
                                    <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce delay-150"></div>
                                    <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce delay-300"></div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="p-5 bg-white border-t border-gray-100 flex gap-3">
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Ask me anything..."
                            className="flex-1 bg-gray-50 border border-gray-200 rounded-2xl px-5 py-3 text-sm font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange/20 focus:border-orange transition-all placeholder:text-gray-400"
                        />
                        <button
                            onClick={handleSend}
                            className="bg-orange p-3.5 rounded-2xl text-white hover:bg-orange-dark transition-all shadow-lg shadow-orange/20 active:scale-90"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" /></svg>
                        </button>
                    </div>
                </div>
            )}

            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-20 h-20 rounded-[2rem] bg-gradient-to-br from-orange to-orange-dark flex items-center justify-center text-white shadow-2xl shadow-orange/40 hover:scale-110 active:scale-95 transition-all duration-300 animate-float border-4 border-white"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8V4H8" /><rect width="16" height="12" x="4" y="8" rx="2" /><path d="M2 14h2" /><path d="M20 14h2" /><path d="M15 13v2" /><path d="M9 13v2" /></svg>
            </button>
        </div>
    );
};

export default AIAdvisor;
