import { Metadata } from "next"
import { getGalleryItems, getGalleryCategories } from "@/lib/data-source"
import { GalleryPageClient } from "./GalleryPageClient"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
    title: "Gallery | KGF Bharat",
    description: "Browse photos and videos from KGF Bharat events, workshops, award ceremonies, and community gatherings.",
}

export default async function GalleryPage() {
    const items = await getGalleryItems()
    const categories = await getGalleryCategories()

    return <GalleryPageClient items={items} categories={categories} />
}
