import Image from "next/image"

export function CollaborationBanner() {
    return (
        <section className="py-16 border-y border-saffron/20 bg-saffron/5">
            <div className="container-custom text-center">
                <p className="font-serif text-charcoal/70 italic mb-10 text-lg">
                    "Uniting Ancient Wisdom with Modern Innovation"
                </p>

                <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24">
                    {/* KGF Bharat */}
                    <div className="text-center group">
                        <h3 className="font-heading text-3xl font-bold text-charcoal group-hover:text-dark-red transition-colors duration-300">KGF Bharat</h3>
                        <div className="h-1 w-12 bg-saffron mx-auto my-3 rounded-full"></div>
                        <p className="text-xs text-charcoal/60 uppercase tracking-widest font-bold">Guardian of Dharma</p>
                    </div>

                    {/* Decorative Divider */}
                    <div className="hidden md:flex items-center text-saffron/40 px-4">
                        <span className="text-4xl">×</span>
                    </div>

                    {/* Krishna Worldwide */}
                    <div className="text-center group">
                        <h3 className="font-heading text-3xl font-bold text-charcoal group-hover:text-dark-red transition-colors duration-300">Krishna Worldwide</h3>
                        <div className="h-1 w-12 bg-saffron mx-auto my-3 rounded-full"></div>
                        <p className="text-xs text-charcoal/60 uppercase tracking-widest font-bold">Technology Partner</p>
                    </div>
                </div>

                <p className="mt-10 text-sm text-charcoal/50 max-w-xl mx-auto">
                    A strategic alliance to deliver world-class AI education within the framework of the Sanatan Gurukul system.
                </p>
            </div>
        </section>
    )
}
