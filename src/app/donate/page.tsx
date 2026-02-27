import { Metadata } from "next"
import { DonatePageClient } from "./DonatePageClient"

export const metadata: Metadata = {
    title: "Donate | KGF Bharat",
    description: "Support KGF Bharat's mission to strengthen Dharmic education, skill development, and recognition of excellence across Bharat.",
}

export default function DonatePage() {
    return <DonatePageClient />
}
