import { Check } from "lucide-react"
import { WhatsAppIcon } from "./WhatsAppIcon"
import { formatINR, type Ayodhya2026 } from "@/content/events/ayodhya-2026"
import { SectionHead, btn } from "./ui"
import { InquiryButton } from "./triggers"
import { BusSponsorship } from "./BusSponsorship"

export function Sponsorship({ event }: { event: Ayodhya2026 }) {
    const { sponsorship } = event
    const title = sponsorship.title
    return (
        <section id="sponsorship" className="scroll-mt-32 bg-ay-paper-2 py-20 md:py-28">
            <div className="container-custom">
                <SectionHead eyebrow="प्रायोजन" title={sponsorship.heading} />

                <ul className="mb-12 grid gap-x-10 gap-y-6 md:grid-cols-2">
                    {sponsorship.reasons.map((r) => (
                        <li key={r.slice(0, 20)} className="border-l-2 border-ay-gold pl-5 font-ay-sans text-[16px] leading-relaxed text-ay-ink-soft">
                            {r}
                        </li>
                    ))}
                </ul>

                <article className="relative mb-6 overflow-hidden rounded-3xl bg-ay-night p-7 text-ay-paper md:p-10">
                    <div aria-hidden="true" className="absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-ay-saffron/20 blur-3xl" />
                    <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:items-center">
                        <div>
                            <div className="flex flex-wrap items-center gap-3 font-ay-sans">
                                <span className="rounded-full bg-ay-gold px-3 py-1 text-xs font-semibold text-ay-night">EXCLUSIVE</span>
                                <span className="text-sm font-semibold text-ay-gold">सबसे अधिक दृश्यता · एक्सक्लूसिव</span>
                                <span className="rounded-full border border-ay-gold/40 px-3 py-1 text-xs font-semibold text-ay-gold-light">{title.availability}</span>
                            </div>
                            <h3 className="mt-3 font-ay-serif text-2xl md:text-3xl font-semibold tracking-normal text-ay-paper">{title.name}</h3>
                            <ul className="mt-5 space-y-2.5 font-ay-sans text-[16px] leading-relaxed text-ay-paper/85">
                                {title.benefits.map((b) => (
                                    <li key={b} className="flex gap-2.5">
                                        <Check className="mt-1 h-4 w-4 shrink-0 text-ay-gold" aria-hidden="true" />
                                        {b}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="flex flex-col gap-6 lg:items-end">
                            <p className="font-ay-serif text-4xl font-bold">{formatINR(title.price)}</p>
                            <InquiryButton item={title.name} group="sponsor" className={`${btn.primary} font-ay-sans`}>
                                पूछताछ करें →
                            </InquiryButton>
                        </div>
                    </div>
                </article>

                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                    {sponsorship.tiers.map((t) => (
                        <article key={t.name} className="flex flex-col rounded-2xl border border-ay-line bg-ay-paper p-6 md:p-7">
                            <div className="flex items-start justify-between gap-3">
                                <p className="font-ay-serif text-3xl font-bold text-ay-ink">{formatINR(t.price)}</p>
                                <span className="shrink-0 rounded-full bg-ay-maroon/10 px-3 py-1 font-ay-sans text-xs font-semibold text-ay-maroon">
                                    {t.availability}
                                </span>
                            </div>
                            <h3 className="mt-3 font-ay-serif text-lg font-semibold leading-snug tracking-normal text-ay-ink">{t.name}</h3>
                            <ul className="mt-5 flex-1 space-y-2.5 border-t border-ay-line pt-5 font-ay-sans text-[15px] leading-relaxed text-ay-ink-soft">
                                {t.benefits.map((b) => (
                                    <li key={b} className="flex gap-2.5">
                                        <Check className="mt-1 h-4 w-4 shrink-0 text-ay-saffron" aria-hidden="true" />
                                        {b}
                                    </li>
                                ))}
                            </ul>
                            <InquiryButton item={t.name} group="sponsor" className={`${btn.inkOutline} mt-7 w-full font-ay-sans`}>
                                पूछताछ करें →
                            </InquiryButton>
                        </article>
                    ))}
                </div>

                <div className="mt-12 flex flex-col items-start gap-5 rounded-3xl border border-ay-line bg-ay-paper p-7 md:flex-row md:items-center md:justify-between md:p-8">
                    <p className="font-ay-serif text-2xl font-semibold text-ay-ink">पहले बात करना चाहते हैं?</p>
                    <a
                        href={event.links.whatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 rounded-full bg-[#25D366] py-3.5 pl-4 pr-7 font-ay-sans text-lg font-bold text-[#052E16] shadow-[0_10px_28px_-12px_rgba(37,211,102,0.9)] transition-colors hover:bg-[#2EE873] active:translate-y-px"
                    >
                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
                            <WhatsAppIcon className="h-7 w-7 text-[#25D366]" />
                        </span>
                        व्हाट्सएप पर संदेश भेजें →
                    </a>
                </div>
            </div>

            <BusSponsorship bus={event.bus} />
        </section>
    )
}
