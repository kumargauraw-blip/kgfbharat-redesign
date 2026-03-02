import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getNewsBySlug } from '@/lib/data-source';

export const dynamic = 'force-dynamic';

function formatNewsDate(dateStr: string): string {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const news = await getNewsBySlug(slug);

    if (!news) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-white">
            {/* Hero */}
            <section className="relative" style={{ background: 'linear-gradient(to bottom, #cd5600 0%, #e07020 30%, #f0a060 60%, #fff5eb 90%, white 100%)' }}>
                <div className="container-custom pt-14 pb-28">
                    <div className="max-w-5xl mx-auto text-center">
                        <div className="flex items-center justify-center gap-4 mb-6">
                            {news.category && (
                                <span className="inline-block bg-white/20 backdrop-blur-sm text-yellow-300 text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full">
                                    {news.category}
                                </span>
                            )}
                            {news.source && (
                                <span className="inline-block bg-white/20 backdrop-blur-sm text-yellow-300 text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full">
                                    {news.source}
                                </span>
                            )}
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-6">
                            {news.title}
                        </h1>
                        {news.date && (
                            <p className="text-[#111827] text-lg font-medium">
                                {formatNewsDate(news.date)}
                            </p>
                        )}
                    </div>
                </div>
            </section>

            {/* Featured Image */}
            {news.imageUrl && (
                <section className="container-custom -mt-16 relative z-10 mb-12">
                    <div className="max-w-4xl mx-auto">
                        <div className="rounded-3xl overflow-hidden shadow-2xl">
                            <img
                                src={news.imageUrl}
                                alt={news.title}
                                className="w-full h-auto object-cover max-h-[500px]"
                            />
                        </div>
                    </div>
                </section>
            )}

            {/* Content */}
            <section className="container-custom py-12">
                <div className="max-w-3xl mx-auto">
                    {/* External source link */}
                    {news.url && (
                        <div className="mb-10 p-6 bg-orange-50 border border-orange-200 rounded-2xl flex items-center justify-between gap-4">
                            <div>
                                <p className="text-sm font-bold text-[#111827] uppercase tracking-wide mb-1">External Source</p>
                                <p className="text-gray-600 text-sm">
                                    {news.source ? `Originally published by ${news.source}` : 'Read the original article'}
                                </p>
                            </div>
                            <a
                                href={news.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 bg-[#DC2626] text-white text-sm font-bold uppercase tracking-wider px-6 py-3 rounded-full hover:bg-red-700 transition-colors whitespace-nowrap"
                            >
                                Visit Source
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                            </a>
                        </div>
                    )}

                    {/* WordPress content */}
                    {news.content ? (
                        <div
                            className="prose prose-lg max-w-none prose-headings:text-[#111827] prose-headings:font-black prose-p:text-gray-700 prose-a:text-orange-600 prose-img:rounded-2xl prose-img:shadow-lg"
                            dangerouslySetInnerHTML={{ __html: news.content }}
                        />
                    ) : (
                        <p className="text-gray-600 text-lg leading-relaxed">{news.description}</p>
                    )}

                    {/* Back link */}
                    <div className="mt-16 pt-8 border-t border-gray-100">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-[#111827] hover:text-orange-600 transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>
                            Back to Home
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
