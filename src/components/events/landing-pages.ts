import type { Metadata } from "next"
import type { ComponentType } from "react"
import { AyodhyaPage } from "./ayodhya/AyodhyaPage"
import { ayodhya2026 } from "@/content/events/ayodhya-2026"

type LandingPage = { Page: ComponentType; metadata: Metadata }

const SITE = "https://www.kgfbharat.org"

function landingMetadata(slug: string, title: string, description: string, image: string): Metadata {
    const url = `${SITE}/events/${slug}`
    const imageUrl = `${SITE}${image}`
    return {
        title: { absolute: title },
        description,
        alternates: { canonical: url },
        openGraph: {
            type: "website",
            url,
            title,
            description,
            locale: "hi_IN",
            siteName: "KGF Bharat - Kurukshetra Gurukulam Foundation",
            images: [{ url: imageUrl, width: 1200, height: 630 }],
        },
        twitter: { card: "summary_large_image", title, description, images: [imageUrl] },
    }
}

/** Events with a bespoke landing page instead of the generic WordPress-backed template. */
export const landingPages: Record<string, LandingPage> = {
    [ayodhya2026.slug]: {
        Page: AyodhyaPage,
        metadata: landingMetadata(ayodhya2026.slug, ayodhya2026.meta.title, ayodhya2026.meta.description, ayodhya2026.meta.ogImage),
    },
}
