"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { SectionHead } from "./ui"

type Photo = { src: string; alt: string }

export function Gallery({
    intro,
    photos,
    previousEditions,
}: {
    intro: string
    photos: Photo[]
    previousEditions: { year: string; href: string }[]
}) {
    const dialogRef = useRef<HTMLDialogElement>(null)
    const [index, setIndex] = useState(0)

    const open = (i: number) => {
        setIndex(i)
        dialogRef.current?.showModal()
    }
    const step = useCallback((delta: number) => setIndex((i) => (i + delta + photos.length) % photos.length), [photos.length])

    useEffect(() => {
        const dialog = dialogRef.current
        if (!dialog) return
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "ArrowRight") step(1)
            if (e.key === "ArrowLeft") step(-1)
        }
        dialog.addEventListener("keydown", onKey)
        return () => dialog.removeEventListener("keydown", onKey)
    }, [step])

    const photo = photos[index]

    return (
        <section id="gallery" className="scroll-mt-32 bg-ay-paper py-20 md:py-28">
            <div className="container-custom">
                <SectionHead
                    eyebrow="गैलरी"
                    title="पिछले संस्करणों से"
                    intro={
                        <>
                            {intro}{" "}
                            <span className="whitespace-nowrap">पिछले संस्करण:</span>{" "}
                            {previousEditions.map((e, i) => (
                                <span key={e.year}>
                                    {i > 0 && " • "}
                                    <a href={e.href} target="_blank" rel="noopener noreferrer" className="font-semibold text-ay-maroon underline decoration-ay-gold underline-offset-4 hover:text-ay-saffron">
                                        {e.year}
                                    </a>
                                </span>
                            ))}
                        </>
                    }
                />

                <ul className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
                    {photos.map((p, i) => (
                        <li key={p.src} className={cn(i === 0 && "col-span-2 md:row-span-2")}>
                            <button
                                type="button"
                                onClick={() => open(i)}
                                className={cn(
                                    "group relative block aspect-[3/2] w-full overflow-hidden rounded-xl bg-ay-paper-2",
                                    i === 0 && "md:aspect-auto md:h-full",
                                )}
                                aria-label={`${p.alt} — बड़ा देखें`}
                            >
                                <Image
                                    src={p.src}
                                    alt={p.alt}
                                    fill
                                    sizes={i === 0 ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 25vw, 50vw"}
                                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                                />
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            <dialog
                ref={dialogRef}
                aria-label="तस्वीर"
                onClick={(e) => {
                    if (e.target === dialogRef.current) dialogRef.current.close()
                }}
                className="m-auto h-full max-h-none w-full max-w-none bg-transparent p-0 backdrop:bg-ay-night/90"
            >
                <div className="flex h-full w-full items-center justify-center p-4 md:p-12" onClick={(e) => e.target === e.currentTarget && dialogRef.current?.close()}>
                    <figure className="relative w-full max-w-6xl">
                        <div className="relative aspect-[3/2] max-h-[80vh] w-full">
                            <Image src={photo.src} alt={photo.alt} fill sizes="100vw" className="object-contain" />
                        </div>
                        <figcaption className="mt-3 text-center font-ay-sans text-sm text-ay-paper/70">
                            {photo.alt} · {index + 1} / {photos.length}
                        </figcaption>
                    </figure>
                </div>
                <button
                    type="button"
                    onClick={() => dialogRef.current?.close()}
                    className="fixed right-4 top-4 rounded-full bg-white/10 p-2.5 text-white hover:bg-white/20"
                    aria-label="बंद करें"
                >
                    <X className="h-6 w-6" />
                </button>
                <button
                    type="button"
                    onClick={() => step(-1)}
                    className="fixed left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2.5 text-white hover:bg-white/20"
                    aria-label="पिछली तस्वीर"
                >
                    <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                    type="button"
                    onClick={() => step(1)}
                    className="fixed right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2.5 text-white hover:bg-white/20"
                    aria-label="अगली तस्वीर"
                >
                    <ChevronRight className="h-6 w-6" />
                </button>
            </dialog>
        </section>
    )
}
