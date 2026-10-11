import Image from "next/image"
import { formatINR, type Ayodhya2026 } from "@/content/events/ayodhya-2026"
import { btn } from "./ui"

export function Book({ event }: { event: Ayodhya2026 }) {
    const { book } = event
    return (
        <section className="relative overflow-hidden bg-ay-maroon-deep py-20 md:py-24">
            <div
                aria-hidden="true"
                className="absolute left-1/4 top-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-ay-saffron/20 blur-3xl"
            />
            <div className="container-custom relative grid items-center gap-12 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
                <div className="mx-auto w-full max-w-sm">
                    <Image
                        src={event.assets.bookCover}
                        alt={`${event.title}: ${event.subtitle} — पुस्तक का आवरण`}
                        width={900}
                        height={1125}
                        sizes="(min-width: 768px) 24rem, 80vw"
                        className="h-auto w-full drop-shadow-[0_30px_40px_rgba(0,0,0,0.5)]"
                    />
                </div>
                <div className="text-ay-paper">
                    <p className="font-ay-sans text-sm font-semibold tracking-wide text-ay-gold">
                        {book.ribbon} · {book.eyebrow}
                    </p>
                    <h2 className="mt-3 font-ay-serif text-[1.85rem] md:text-[2.6rem] font-bold leading-[1.3] tracking-normal text-ay-paper">
                        {book.heading}
                    </h2>
                    <p className="mt-5 font-ay-sans text-lg leading-relaxed text-ay-paper/80">{book.text}</p>
                    <p className="mt-4 font-ay-sans text-lg leading-relaxed text-ay-paper/80">
                        <strong className="font-semibold text-ay-paper">उद्देश्य — </strong>
                        {book.purpose}
                    </p>

                    <dl className="mt-8 grid grid-cols-3 gap-6 border-y border-ay-gold/25 py-6 font-ay-sans">
                        <div>
                            <dt className="text-sm text-ay-paper/60">संपादक</dt>
                            <dd className="mt-1 text-lg font-semibold">{book.editor}</dd>
                        </div>
                        <div>
                            <dt className="text-sm text-ay-paper/60">प्रकाशक</dt>
                            <dd className="mt-1 text-lg font-semibold">{book.publisher}</dd>
                        </div>
                        <div>
                            <dt className="text-sm text-ay-paper/60">{book.priceLabel}</dt>
                            <dd className="mt-1 text-lg font-semibold">
                                <s className="mr-2 text-ay-paper/50 font-normal">{formatINR(book.originalPrice)}</s>
                                {formatINR(book.price)}
                            </dd>
                        </div>
                    </dl>

                    <a href={event.links.book} target="_blank" rel="noopener noreferrer" className={`${btn.primary} mt-8 font-ay-sans`}>
                        {book.cta}
                    </a>
                </div>
            </div>
        </section>
    )
}
