import Link from 'next/link';
import { getNews } from '@/lib/data-source';
import type { News } from '@/lib/types';

const FALLBACK_MEDIA: News[] = [
    {
        id: "1",
        title: "Reviving the Gurukul System in the Age of AI",
        source: "The Times of India",
        date: "2025-09",
        description: "",
        url: "#",
        category: "Education",
        imageUrl: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=1000",
    },
    {
        id: "2",
        title: "How KGF Bharat is preserving Sanatan Dharma",
        source: "Republic World",
        date: "2025-08",
        description: "",
        url: "#",
        category: "Culture",
        imageUrl: "https://images.unsplash.com/photo-1582560475093-d09bc505f33d?auto=format&fit=crop&q=80&w=1000",
    },
    {
        id: "3",
        title: "The Fusion of Sanskrit and Silicon Valley",
        source: "OpIndia",
        date: "2025-07",
        description: "",
        url: "#",
        category: "Technology",
        imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1000",
    },
];

function formatNewsDate(dateStr: string): string {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;
    return date.toLocaleDateString('en-IN', { month: 'short', year: 'numeric' });
}

export async function MediaSection() {
    let newsItems = await getNews();

    // Use fallback media if no news from data source
    if (newsItems.length === 0) {
        newsItems = FALLBACK_MEDIA;
    }

    const displayItems = newsItems.slice(0, 3);

    return (
        <section id="media" className="py-24 bg-white relative">
            <div className="container-custom">
                <div className="text-center mb-20 relative">
                    <div className="inline-block relative">
                        <h2 className="text-5xl md:text-6xl font-black text-[#111827] relative z-10">
                            In The <span className="text-orange">Media</span>
                        </h2>
                        <div className="absolute -bottom-2 left-0 right-0 h-4 bg-orange/20 -rotate-1 -z-0"></div>
                    </div>
                    <p className="mt-6 text-gray-500 font-medium text-lg uppercase tracking-widest">
                        See KGF Bharat in action across various media platforms
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {displayItems.map((item) => (
                        <div key={item.id} className="group flex flex-col bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 transition-all duration-500 hover:shadow-[0_30px_60px_rgba(0,0,0,0.06)] hover:-translate-y-2">
                            <div className="aspect-[16/10] overflow-hidden relative">
                                {item.imageUrl ? (
                                    <img
                                        src={item.imageUrl}
                                        alt={item.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-orange-50 to-amber-100 flex items-center justify-center">
                                        <svg className="w-12 h-12 text-orange/30" fill="currentColor" viewBox="0 0 24 24"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" /></svg>
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            </div>

                            <div className="p-10 flex flex-col flex-1">
                                <div className="flex items-center gap-6 mb-6 text-[10px] font-black uppercase tracking-widest text-gray-400">
                                    <span className="flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                                        {formatNewsDate(item.date)}
                                    </span>
                                    <span className="flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                                        {item.source}
                                    </span>
                                </div>

                                <h3 className="text-2xl font-black text-[#111827] leading-tight mb-8 group-hover:text-orange transition-colors">
                                    {item.title}
                                </h3>

                                <div className="mt-auto">
                                    <a
                                        href={item.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-3 text-xs font-black uppercase tracking-widest text-[#111827] group-hover:text-orange"
                                    >
                                        Read Full Story
                                        <svg className="transition-transform group-hover:translate-x-2" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
