import { BedDouble, Check, Info, Sun } from "lucide-react"
import { cn } from "@/lib/utils"
import { formatINR, type Ayodhya2026, type Pass } from "@/content/events/ayodhya-2026"
import { SectionHead, btn } from "./ui"
import { TermsButton } from "./triggers"

function Price({ pass, tone = "light" }: { pass: Pass; tone?: "light" | "dark" }) {
    return (
        <div className="font-ay-sans">
            <p className="flex items-baseline gap-2">
                <s className={cn("text-base", tone === "dark" ? "text-ay-paper/50" : "text-ay-ink-soft/60")}>
                    {formatINR(pass.originalPrice)}
                </s>
                <span className={cn("font-ay-serif text-3xl font-bold", tone === "dark" ? "text-ay-paper" : "text-ay-ink")}>
                    {formatINR(pass.price)}
                </span>
            </p>
            {pass.unit && <p className={cn("mt-1 text-sm", tone === "dark" ? "text-ay-paper/70" : "text-ay-ink-soft")}>{pass.unit}</p>}
        </div>
    )
}

function Benefits({ items, tone = "light" }: { items: Pass["benefits"]; tone?: "light" | "dark" }) {
    return (
        <ul className="space-y-2.5 font-ay-sans text-[16px] leading-relaxed">
            {items.map((b) => (
                <li key={b.text} className="flex gap-2.5">
                    <Check className={cn("mt-1 h-4 w-4 shrink-0", tone === "dark" ? "text-ay-gold" : "text-ay-saffron")} aria-hidden="true" />
                    <span className={tone === "dark" ? "text-ay-paper/85" : "text-ay-ink-soft"}>
                        {b.label && <strong className={cn("font-semibold", tone === "dark" ? "text-ay-paper" : "text-ay-ink")}>{b.label}: </strong>}
                        {b.text}
                    </span>
                </li>
            ))}
        </ul>
    )
}

function PassCard({ pass }: { pass: Pass }) {
    return (
        <article
            className={cn(
                "flex flex-col rounded-2xl border bg-white p-6 md:p-7",
                pass.featured ? "border-ay-saffron shadow-[0_18px_40px_-24px_rgba(224,106,23,0.6)]" : "border-ay-line",
            )}
        >
            <p
                className={cn(
                    "self-start rounded-full px-3 py-1 font-ay-sans text-xs font-semibold",
                    pass.featured ? "bg-ay-saffron text-white" : pass.isdMember ? "bg-ay-maroon/10 text-ay-maroon" : "bg-ay-paper-2 text-ay-ink-soft",
                )}
            >
                {pass.tag}
            </p>
            <h4 className="mt-4 font-ay-serif text-xl font-semibold leading-snug tracking-normal text-ay-ink">{pass.name}</h4>
            <div className="mt-4">
                <Price pass={pass} />
            </div>
            <div className="mt-5 flex-1 border-t border-ay-line pt-5">
                <Benefits items={pass.benefits} />
            </div>
            <a
                href={pass.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(pass.featured ? btn.primary : btn.inkOutline, "mt-7 w-full font-ay-sans")}
            >
                {pass.cta}
            </a>
        </article>
    )
}

function GroupHead({ icon: Icon, title, children }: { icon: typeof Sun; title: string; children?: React.ReactNode }) {
    return (
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <h3 className="flex items-center gap-3 font-ay-serif text-2xl font-semibold tracking-normal text-ay-ink">
                <Icon className="h-6 w-6 text-ay-saffron" aria-hidden="true" />
                {title}
            </h3>
            {children}
        </div>
    )
}

export function Passes({ event }: { event: Ayodhya2026 }) {
    const vip = event.vipPass
    return (
        <section id="passes" className="scroll-mt-32 bg-ay-paper py-20 md:py-28">
            <div className="container-custom">
                <SectionHead eyebrow={event.passesHead.eyebrow} title={event.passesHead.heading} />

                <GroupHead icon={BedDouble} title="आवासीय पास" />
                <div className="mb-6 rounded-2xl bg-ay-paper-2 p-6 md:p-7">
                    <p className="font-ay-sans text-[16px] font-semibold text-ay-ink">{event.passesHead.intro}</p>
                    <div className="mt-4 grid gap-x-8 gap-y-4 md:grid-cols-2">
                        {event.residentialIncludes.map((inc) => (
                            <p key={inc.label} className="font-ay-sans text-[16px] leading-relaxed text-ay-ink-soft">
                                <strong className="font-semibold text-ay-maroon">{inc.label}: </strong>
                                {inc.text}
                            </p>
                        ))}
                    </div>
                </div>

                <article className="relative mb-6 overflow-hidden rounded-3xl bg-ay-maroon-deep p-7 md:p-10">
                    <div aria-hidden="true" className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-ay-gold/15 blur-3xl" />
                    <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:items-center">
                        <div>
                            <div className="flex flex-wrap items-center gap-3">
                                <p className="rounded-full bg-ay-gold px-3 py-1 font-ay-sans text-xs font-semibold text-ay-night">{vip.tag}</p>
                                {vip.eyebrow && <p className="font-ay-sans text-sm font-semibold text-ay-gold-light">{vip.eyebrow}</p>}
                            </div>
                            <h4 className="mt-4 font-ay-serif text-2xl md:text-3xl font-semibold tracking-normal text-ay-paper">{vip.name}</h4>
                            <div className="mt-5">
                                <Benefits items={vip.benefits} tone="dark" />
                            </div>
                        </div>
                        <div className="flex flex-col gap-6 lg:items-end lg:text-right">
                            <Price pass={vip} tone="dark" />
                            <a href={vip.href} target="_blank" rel="noopener noreferrer" className={cn(btn.primary, "font-ay-sans")}>
                                {vip.cta}
                            </a>
                        </div>
                    </div>
                </article>

                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-[repeat(5,minmax(0,1fr))]">
                    {event.residentialPasses.map((p) => (
                        <PassCard key={p.id} pass={p} />
                    ))}
                </div>

                <div className="mt-16">
                    <GroupHead icon={Sun} title="गैर-आवासीय पास" />
                    <div className="grid gap-6 sm:grid-cols-2 lg:max-w-4xl">
                        {event.dayPasses.map((p) => (
                            <PassCard key={p.id} pass={p} />
                        ))}
                    </div>
                </div>

                <p className="mt-10 flex items-center gap-2 font-ay-sans text-[16px] text-ay-ink-soft">
                    <Info className="h-5 w-5 shrink-0 text-ay-maroon" aria-hidden="true" />
                    <TermsButton className="text-left font-semibold text-ay-maroon underline decoration-ay-gold underline-offset-4 hover:text-ay-saffron">
                        नियम व शर्तें पढ़ें
                    </TermsButton>
                </p>
            </div>
        </section>
    )
}
