"use client"

export type InquiryGroup = "sponsor" | "bus" | "general"

export const INQUIRE_EVENT = "ayodhya:inquire"
export const TERMS_EVENT = "ayodhya:terms"

export function InquiryButton({
    item,
    group,
    className,
    children,
}: {
    item: string
    group: InquiryGroup
    className?: string
    children: React.ReactNode
}) {
    return (
        <button
            type="button"
            className={className}
            onClick={() => window.dispatchEvent(new CustomEvent(INQUIRE_EVENT, { detail: { item, group } }))}
        >
            {children}
        </button>
    )
}

export function TermsButton({ className, children }: { className?: string; children: React.ReactNode }) {
    return (
        <button type="button" className={className} onClick={() => window.dispatchEvent(new CustomEvent(TERMS_EVENT))}>
            {children}
        </button>
    )
}
