import Image from "next/image"
import type { Ayodhya2026 } from "@/content/events/ayodhya-2026"
import { SectionHead } from "./ui"

export function Speakers({ event }: { event: Ayodhya2026 }) {
    const { speakers, speakerGroups } = event
    return (
        <section id="speakers" className="scroll-mt-32 bg-ay-paper-2 py-20 md:py-24">
            <div className="container-custom">
                <SectionHead eyebrow="वक्ता" title="इस वर्ष के वक्ता" />

                {speakers.length > 0 ? (
                    <ul className="grid grid-cols-[repeat(auto-fill,minmax(14rem,1fr))] gap-6">
                        {speakers.map((s) => (
                            <li key={s.name} className="overflow-hidden rounded-2xl bg-ay-paper">
                                <div className="relative aspect-[4/5] bg-ay-line">
                                    {s.photo && <Image src={s.photo} alt={s.name} fill sizes="16rem" className="object-cover" />}
                                </div>
                                <div className="p-5">
                                    <p className="font-ay-serif text-lg font-semibold text-ay-ink">{s.name}</p>
                                    <p className="mt-1 font-ay-sans text-[15px] text-ay-ink-soft">{s.role}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="grid gap-8 rounded-3xl border border-ay-line bg-ay-paper p-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] md:p-12">
                        <div>
                            <p className="font-ay-serif text-2xl md:text-3xl font-semibold leading-snug text-ay-ink">
                                वक्ताओं की घोषणा शीघ्र
                            </p>
                            <p className="mt-3 font-ay-sans text-lg leading-relaxed text-ay-ink-soft">
                                वक्ताओं का चयन लोकप्रियता नहीं, विषय की गहराई और प्रामाणिकता के आधार पर किया जा रहा है।
                                नाम निश्चित होते ही यहाँ प्रकाशित किए जाएँगे।
                            </p>
                        </div>
                        <ul className="grid gap-3 sm:grid-cols-2">
                            {speakerGroups.map((g) => (
                                <li
                                    key={g}
                                    className="flex items-center gap-3 rounded-xl bg-ay-paper-2 px-5 py-4 font-ay-sans text-[17px] font-medium text-ay-ink"
                                >
                                    <span className="h-2 w-2 shrink-0 rotate-45 bg-ay-saffron" aria-hidden="true" />
                                    {g}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </section>
    )
}
