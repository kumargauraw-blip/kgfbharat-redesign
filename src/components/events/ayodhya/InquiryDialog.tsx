"use client"

import { useEffect, useRef, useState } from "react"
import { CheckCircle2, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { formatINR } from "./format"
import { btn } from "./ui"
import { INQUIRE_EVENT, TERMS_EVENT, type InquiryGroup } from "./triggers"

type Option = { name: string; price: number }
type Status = "preparing" | "ready" | "sending" | "success"

const ENDPOINT = "/api/events/inquiry"
const MIN_FILL_MS = 2000

const fieldClass =
    "mt-1.5 w-full rounded-xl border border-ay-line bg-white px-4 py-2.5 font-ay-sans text-[16px] text-ay-ink outline-none transition-colors focus:border-ay-saffron focus-visible:ring-2 focus-visible:ring-ay-saffron/40"

export function InquiryDialog({
    sponsorOptions,
    busOptions,
    terms,
}: {
    sponsorOptions: Option[]
    busOptions: Option[]
    terms: { title: string; text: string }[]
}) {
    const dialogRef = useRef<HTMLDialogElement>(null)
    const termsRef = useRef<HTMLDialogElement>(null)
    const formRef = useRef<HTMLFormElement>(null)
    const openedAt = useRef(0)

    const [group, setGroup] = useState<InquiryGroup>("sponsor")
    const [item, setItem] = useState("")
    const [status, setStatus] = useState<Status>("preparing")
    const [note, setNote] = useState("")

    useEffect(() => {
        const prepare = async () => {
            setStatus("preparing")
            try {
                const res = await fetch(ENDPOINT, { cache: "no-store" })
                const json = await res.json()
                if (!json.success) throw new Error()
                setStatus("ready")
            } catch {
                setStatus("preparing")
                setNote("कृपया पेज को पुनः लोड करके फिर प्रयास करें।")
            }
        }
        const onInquire = (e: Event) => {
            const detail = (e as CustomEvent<{ item: string; group: InquiryGroup }>).detail
            setGroup(detail.group)
            setItem(detail.item)
            setNote("")
            formRef.current?.reset()
            openedAt.current = Date.now()
            dialogRef.current?.showModal()
            prepare()
        }
        const onTerms = () => termsRef.current?.showModal()
        window.addEventListener(INQUIRE_EVENT, onInquire)
        window.addEventListener(TERMS_EVENT, onTerms)
        return () => {
            window.removeEventListener(INQUIRE_EVENT, onInquire)
            window.removeEventListener(TERMS_EVENT, onTerms)
        }
    }, [])

    const options = group === "bus" ? busOptions : sponsorOptions

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (status !== "ready") {
            setNote("कृपया कुछ क्षण प्रतीक्षा करें और फिर प्रयास करें।")
            return
        }
        const data = new FormData(e.currentTarget)
        if (data.get("company_website")) {
            setNote("कुछ गड़बड़ हो गई — कृपया पुनः प्रयास करें।")
            return
        }
        if (Date.now() - openedAt.current < MIN_FILL_MS) {
            setNote("भेजने से पहले कृपया फ़ॉर्म भरने के लिए थोड़ा समय लें।")
            return
        }
        if (group === "general") data.set("plan", item)

        setStatus("sending")
        setNote("")
        try {
            const res = await fetch(ENDPOINT, { method: "POST", body: data })
            const json = await res.json()
            if (json.success) {
                setStatus("success")
            } else {
                setStatus("ready")
                setNote(json.message || "कुछ गड़बड़ हो गई — कृपया पुनः प्रयास करें या सीधे हमें ईमेल करें।")
            }
        } catch {
            setStatus("ready")
            setNote("भेजा नहीं जा सका — अपना कनेक्शन जांचें और पुनः प्रयास करें।")
        }
    }

    return (
        <>
            <dialog
                ref={dialogRef}
                aria-labelledby="inquiry-title"
                onClick={(e) => e.target === dialogRef.current && dialogRef.current.close()}
                className="m-auto w-[min(36rem,calc(100vw-2rem))] max-h-[calc(100svh-2rem)] rounded-3xl bg-ay-paper p-0 shadow-2xl backdrop:bg-ay-night/75 backdrop:backdrop-blur-sm"
            >
                <div className="relative p-6 md:p-8">
                    <button
                        type="button"
                        onClick={() => dialogRef.current?.close()}
                        className="absolute right-4 top-4 rounded-full p-2 text-ay-ink-soft hover:bg-ay-paper-2 hover:text-ay-ink"
                        aria-label="बंद करें"
                    >
                        <X className="h-5 w-5" />
                    </button>

                    {status === "success" ? (
                        <div className="py-8 text-center font-ay-sans" role="status">
                            <CheckCircle2 className="mx-auto h-14 w-14 text-ay-saffron" aria-hidden="true" />
                            <h3 id="inquiry-title" className="mt-4 font-ay-serif text-2xl font-semibold tracking-normal text-ay-ink">
                                धन्यवाद
                            </h3>
                            <p className="mt-2 text-lg text-ay-ink-soft">आपका संदेश भेज दिया गया है — हम एक कार्यदिवस के भीतर संपर्क करेंगे।</p>
                            <button type="button" onClick={() => dialogRef.current?.close()} className={cn(btn.inkOutline, "mt-8")}>
                                बंद करें
                            </button>
                        </div>
                    ) : (
                        <>
                            <p className="font-ay-sans text-sm font-semibold text-ay-saffron">पूछताछ</p>
                            <h3 id="inquiry-title" className="mt-1 pr-10 font-ay-serif text-2xl font-semibold leading-snug tracking-normal text-ay-ink">
                                {group === "general" ? item : "प्रायोजन पूछताछ"}
                            </h3>
                            <p className="mt-2 font-ay-sans text-[15px] text-ay-ink-soft">
                                हमें अपने बारे में थोड़ा बताएं, हम एक कार्यदिवस के भीतर संपर्क करेंगे।
                            </p>

                            <form ref={formRef} onSubmit={onSubmit} className="mt-6 space-y-4 font-ay-sans text-[15px] font-medium text-ay-ink">
                                {group !== "general" && (
                                    <label className="block">
                                        योजना / स्लॉट जिसमें आपकी रुचि है
                                        <select name="plan" required key={item} defaultValue={item} className={fieldClass}>
                                            {options.map((o) => (
                                                <option key={o.name} value={o.name}>
                                                    {o.name} — {formatINR(o.price)}
                                                </option>
                                            ))}
                                        </select>
                                    </label>
                                )}
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <label className="block">
                                        नाम
                                        <input type="text" name="name" required maxLength={120} autoComplete="name" className={fieldClass} />
                                    </label>
                                    <label className="block">
                                        संस्था <span className="font-normal text-ay-ink-soft">(वैकल्पिक)</span>
                                        <input type="text" name="organisation" maxLength={160} autoComplete="organization" className={fieldClass} />
                                    </label>
                                </div>
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <label className="block">
                                        ईमेल
                                        <input type="email" name="email" required maxLength={160} autoComplete="email" className={fieldClass} />
                                    </label>
                                    <label className="block">
                                        फ़ोन
                                        <input
                                            type="tel"
                                            name="phone"
                                            inputMode="numeric"
                                            pattern="[0-9]*"
                                            maxLength={15}
                                            autoComplete="tel"
                                            onInput={(e) => {
                                                e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, "")
                                            }}
                                            className={fieldClass}
                                        />
                                    </label>
                                </div>
                                <label className="block">
                                    संदेश
                                    <textarea name="message" rows={3} maxLength={2000} placeholder="कुछ खास बताना चाहें तो यहां लिखें" className={fieldClass} />
                                </label>
                                <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
                                    <label>
                                        इस फ़ील्ड को खाली छोड़ें
                                        <input type="text" name="company_website" tabIndex={-1} autoComplete="off" />
                                    </label>
                                </div>
                                <label className="flex items-start gap-3 font-normal text-ay-ink-soft">
                                    <input type="checkbox" name="agree_terms" required className="mt-1 h-4 w-4 accent-ay-saffron" />
                                    <span>
                                        मैं{" "}
                                        <button
                                            type="button"
                                            onClick={() => termsRef.current?.showModal()}
                                            className="font-semibold text-ay-maroon underline decoration-ay-gold underline-offset-4"
                                        >
                                            नियम व शर्तों
                                        </button>{" "}
                                        से सहमत हूं
                                    </span>
                                </label>
                                <button type="submit" disabled={status === "sending"} className={cn(btn.primary, "w-full")}>
                                    {status === "sending" ? "भेजा जा रहा है…" : "पूछताछ भेजें →"}
                                </button>
                                <p aria-live="polite" className="min-h-[1.25rem] text-center text-sm font-normal text-ay-maroon">
                                    {note}
                                </p>
                            </form>
                        </>
                    )}
                </div>
            </dialog>

            <dialog
                ref={termsRef}
                aria-labelledby="terms-title"
                onClick={(e) => e.target === termsRef.current && termsRef.current.close()}
                className="m-auto w-[min(44rem,calc(100vw-2rem))] max-h-[calc(100svh-2rem)] rounded-3xl bg-ay-paper p-0 shadow-2xl backdrop:bg-ay-night/75"
            >
                <div className="relative p-6 md:p-8">
                    <button
                        type="button"
                        onClick={() => termsRef.current?.close()}
                        className="absolute right-4 top-4 rounded-full p-2 text-ay-ink-soft hover:bg-ay-paper-2 hover:text-ay-ink"
                        aria-label="बंद करें"
                    >
                        <X className="h-5 w-5" />
                    </button>
                    <p className="font-ay-sans text-sm font-semibold text-ay-saffron">नियम व शर्तें</p>
                    <h3 id="terms-title" className="mt-1 pr-10 font-ay-serif text-2xl font-semibold tracking-normal text-ay-ink">
                        कार्यक्रम टिकट — नियम एवं शर्तें
                    </h3>
                    <ol className="mt-6 space-y-4 font-ay-sans text-[15px] leading-relaxed text-ay-ink-soft">
                        {terms.map((t, i) => (
                            <li key={t.title}>
                                <strong className="font-semibold text-ay-ink">
                                    {i + 1}. {t.title}।
                                </strong>{" "}
                                {t.text}
                            </li>
                        ))}
                    </ol>
                </div>
            </dialog>
        </>
    )
}
