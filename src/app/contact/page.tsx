import { Metadata } from "next"
import { ContactPageClient } from "./ContactPageClient"

export const metadata: Metadata = {
    title: "Contact Us | KGF Bharat",
    description: "Get in touch with KGF Bharat for course inquiries, corporate training, partnerships, or general questions.",
}

export default function ContactPage() {
    return <ContactPageClient />
}
