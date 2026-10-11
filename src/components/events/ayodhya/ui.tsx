import { cn } from "@/lib/utils"

const btnBase =
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full px-6 py-3 text-[15px] font-semibold transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50 active:translate-y-px"

export const btn = {
    primary: cn(btnBase, "bg-ay-saffron text-white shadow-[0_8px_24px_-10px_rgba(224,106,23,0.8)] hover:bg-ay-saffron-bright"),
    goldOutline: cn(btnBase, "border border-ay-gold/70 text-ay-gold-light hover:bg-ay-gold/15 hover:border-ay-gold-light"),
    inkOutline: cn(btnBase, "border border-ay-ink/25 text-ay-ink hover:border-ay-saffron hover:text-ay-saffron"),
    dark: cn(btnBase, "bg-ay-maroon-deep text-ay-paper hover:bg-ay-maroon"),
}

export function SectionHead({
    eyebrow,
    title,
    intro,
    tone = "light",
    align = "left",
    className,
}: {
    eyebrow?: string
    title: string
    intro?: React.ReactNode
    tone?: "light" | "dark"
    align?: "left" | "center"
    className?: string
}) {
    return (
        <div className={cn("mb-10 md:mb-14 max-w-6xl", align === "center" && "mx-auto text-center", className)}>
            {eyebrow && (
                <p
                    className={cn(
                        "mb-3 font-ay-sans text-sm font-semibold tracking-wide",
                        tone === "dark" ? "text-ay-gold" : "text-ay-saffron",
                    )}
                >
                    {eyebrow}
                </p>
            )}
            <h2
                className={cn(
                    "font-ay-serif text-[1.85rem] md:text-[2.6rem] font-bold leading-[1.3] tracking-normal [overflow-wrap:anywhere]",
                    tone === "dark" ? "text-ay-paper" : "text-ay-ink",
                )}
            >
                {title}
            </h2>
            {intro && (
                <div
                    className={cn(
                        "mt-4 max-w-3xl font-ay-sans text-lg leading-relaxed",
                        align === "center" && "mx-auto",
                        tone === "dark" ? "text-ay-paper/75" : "text-ay-ink-soft",
                    )}
                >
                    {intro}
                </div>
            )}
        </div>
    )
}

export function Ornament({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 120 12" aria-hidden="true" className={cn("h-3 w-28 text-ay-gold", className)}>
            <path d="M0 6h48M72 6h48" stroke="currentColor" strokeWidth="1" />
            <path d="M60 1l5 5-5 5-5-5z" fill="currentColor" />
            <circle cx="50" cy="6" r="1.5" fill="currentColor" />
            <circle cx="70" cy="6" r="1.5" fill="currentColor" />
        </svg>
    )
}
