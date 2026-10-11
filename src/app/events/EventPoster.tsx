import Image from "next/image"
import { CalendarDays } from "lucide-react"
import { cn } from "@/lib/utils"

const LOCAL_POSTERS: Record<string, string> = {
    "ram-janmabhoomi-gatha-nyaaypeeth-to-balidaan-ki-vedi-tak": "/events/ayodhya-2026/banner.jpg",
}

export function posterSrc(slug: string, imageUrl?: string) {
    return imageUrl || LOCAL_POSTERS[slug]
}

/** Show the WordPress poster at its own proportions — no letterbox, no forced crop. */
export function EventPoster({ src, alt, sizes, priority, className }: { src?: string; alt: string; sizes: string; priority?: boolean; className?: string }) {
    if (!src) {
        return (
            <div className={cn("flex aspect-[16/9] items-center justify-center bg-gradient-to-br from-orange-600 to-red-700", className)}>
                <CalendarDays className="h-14 w-14 text-white/70" aria-hidden="true" />
            </div>
        )
    }

    return (
        <div className={cn("relative overflow-hidden bg-[#1a0f08] leading-none", className)}>
            <Image
                src={src}
                alt={alt}
                width={1600}
                height={900}
                sizes={sizes}
                priority={priority}
                className="h-auto w-full"
            />
        </div>
    )
}
