import Link from "next/link"

export function Footer() {
    return (
        <footer id="contact" className="pt-32 pb-16 bg-navy text-white">
            <div className="container-custom grid md:grid-cols-4 gap-20">
                <div className="col-span-2 space-y-10">
                    <div className="flex items-center gap-6">
                        <div className="bg-white p-2 rounded-2xl">
                            {/* Placeholder for SVG logo until image is available or we use the SVG component */}
                            <div className="h-14 w-14 flex items-center justify-center">
                                <img src="/kgf-logo.png" alt="KGF Logo" className="w-full h-full object-contain" />
                            </div>
                        </div>
                        <div>
                            <h4 className="text-4xl font-black tracking-tighter">KGF BHARAT</h4>
                            <p className="text-[10px] font-bold text-orange-light uppercase tracking-widest">Kurukshetra Gurukulam Foundation</p>
                        </div>
                    </div>
                    <p className="text-indigo-100/70 text-xl max-lg font-medium leading-relaxed">
                        We are not just a foundation; we are an ecosystem for those who refuse to choose between their roots and their potential.
                    </p>
                </div>

                <div>
                    <h5 className="font-black text-orange-light mb-10 uppercase tracking-[0.2em] text-xs">Knowledge Portal</h5>
                    <ul className="space-y-5 text-indigo-50 font-bold text-lg">
                        <li><Link href="/ai-courses" className="hover:text-orange-light transition-colors">Courses</Link></li>
                        <li><Link href="/about" className="hover:text-orange-light transition-colors">Vision 2030</Link></li>
                        <li><Link href="#" className="hover:text-orange-light transition-colors">Careers</Link></li>
                        <li><Link href="#" className="hover:text-orange-light transition-colors">Support Us</Link></li>
                    </ul>
                </div>

                <div>
                    <h5 className="font-black text-orange-light mb-10 uppercase tracking-[0.2em] text-xs">Reach Out</h5>
                    <ul className="space-y-5 text-indigo-50 font-bold">
                        <li>info@kgfbharat.org</li>
                        <li>Bengaluru HQ, Bharat</li>
                        <li className="flex gap-6 mt-10">
                            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center hover:bg-orange cursor-pointer transition-all border border-white/10">
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="container-custom mt-20 pt-10 border-t border-white/10 text-center text-xs text-indigo-200/40 font-black uppercase tracking-[0.3em]">
                © 2025 Kurukshetra Gurukulam Foundation. Sanatana. Sovereign. Smart.
            </div>
        </footer>
    )
}
