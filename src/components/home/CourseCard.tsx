"use client"
import React, { useState } from 'react';
import Image from 'next/image';

// Types adapted from ModernisedHome/types.ts
export enum CourseCategory {
    DHARMIK = "Dharmik Leadership",
    AI_TECH = "AI & Technology"
}

export interface Course {
    id: number;
    title: string;
    description: string;
    category: CourseCategory;
    duration: string;
    level: string;
    image: string;
    link?: string;
}

interface CourseCardProps {
    course: Course;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
    const [imageError, setImageError] = useState(false);
    const isDharmik = course.category === CourseCategory.DHARMIK;

    return (
        <div className="bg-white group relative overflow-hidden rounded-[2.5rem] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-gray-100">
            {/* Category Badge */}
            <div className={`absolute top-5 right-5 z-10 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${isDharmik ? 'bg-orange/10 text-orange-dark' : 'bg-blue-100 text-blue-700'}`}>
                {course.level}
            </div>

            <div className="aspect-[4/3] overflow-hidden bg-gray-50 flex items-center justify-center relative">
                {!imageError ? (
                    <img
                        src={course.image}
                        alt={course.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        onError={() => setImageError(true)}
                    />
                ) : (
                    <div className={`w-full h-full flex flex-col items-center justify-center gap-2 ${isDharmik ? 'bg-orange/10' : 'bg-blue-50'}`}>
                        <svg className={`w-12 h-12 ${isDharmik ? 'text-orange/40' : 'text-blue-200'}`} fill="currentColor" viewBox="0 0 24 24"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" /></svg>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Image Unavailable</span>
                    </div>
                )}
            </div>

            <div className="p-8">
                <p className={`text-[11px] font-bold uppercase tracking-widest mb-3 ${isDharmik ? 'text-orange' : 'text-blue-600'}`}>
                    {course.category}
                </p>
                <h3 className="text-2xl font-bold mb-4 text-navy group-hover:text-orange transition-colors leading-tight">
                    {course.title}
                </h3>
                <p className="text-gray-500 text-sm line-clamp-2 mb-8 leading-relaxed font-medium">
                    {course.description}
                </p>

                <div className="flex items-center justify-between mt-auto">
                    <div className="flex flex-col">
                        <span className="text-[10px] text-gray-400 uppercase font-bold tracking-tighter">Duration</span>
                        <span className="text-sm font-bold text-gray-800">{course.duration}</span>
                    </div>
                    <button className={`p-3.5 rounded-2xl bg-gray-50 hover:bg-white border border-gray-100 transition-all shadow-sm ${isDharmik ? 'text-orange hover:shadow-orange/20' : 'text-blue-600 hover:shadow-blue-100'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                    </button>
                </div>
            </div>
        </div>
    );
};
