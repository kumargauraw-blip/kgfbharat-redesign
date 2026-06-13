"use client"

import { useEffect, useRef, useState } from "react"
import {
    Sparkles,
    Info,
    User,
    BookOpen,
    Calendar,
    PenLine,
    RefreshCw,
    RotateCcw,
    ShieldCheck,
    FileText,
    FileImage,
    Loader2,
    TrendingUp,
    Code2,
    BookMarked,
    X,
    LogOut,
} from "lucide-react"
import Certificate from "./Certificate"

// Natural certificate size (must match certificate.module.css).
const CERT_W = 1056
const CERT_H = 816

// ---- Presets / templates -------------------------------------------------
// Placeholder content — refine the wording/titles here any time.
type Preset = {
    key: string
    label: string
    icon: typeof TrendingUp
    course: string
    classification: string
}

const PRESETS: Preset[] = [
    {
        key: "ai-tools",
        label: "AI Tools Preset",
        icon: TrendingUp,
        course: "AI Fundamentals - Your Toolkit to 10X Productivity",
        classification: "comprehensive AI & Technology",
    },
    {
        key: "full-stack",
        label: "Full Stack Dev",
        icon: Code2,
        course: "Full Stack Web Development with Modern AI Tooling",
        classification: "intensive Full-Stack Engineering",
    },
    {
        key: "vedic-tech",
        label: "Vedic Sci-Tech",
        icon: BookMarked,
        course: "Vedic Science & Technology Foundations",
        classification: "interdisciplinary Vedic Science & Technology",
    },
]

const DEFAULTS = {
    studentName: "",
    courseName: PRESETS[0].course,
    classification: PRESETS[0].classification,
    startDate: "",
    endDate: "",
    certDate: "",
    sig1Name: "Sandeep Deo",
    sig1Title: "Founder & President, KGF Bharat",
    sig2Name: "Kumar Gauraw",
    sig2Title: "Head Coach & Lead AI Educator",
}

// Convert a yyyy-mm-dd input value into "Month D, YYYY" without timezone drift.
function formatDate(value: string): string {
    if (!value) return ""
    const [y, m, d] = value.split("-").map(Number)
    if (!y || !m || !d) return ""
    return new Date(y, m - 1, d).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    })
}

function fileBase(studentName: string): string {
    const slug = studentName.trim().replace(/[^a-z0-9]+/gi, "-").replace(/^-+|-+$/g, "")
    return `KGF-Certificate-${slug || "student"}`
}

// Build a decorative unique credential id, e.g. KGF-2026-AI-10492.
function makeCertId(year: number): string {
    const n = Math.floor(10000 + Math.random() * 90000)
    return `KGF-${year}-AI-${n}`
}

export default function CertificateStudioPage() {
    const [studentName, setStudentName] = useState(DEFAULTS.studentName)
    const [courseName, setCourseName] = useState(DEFAULTS.courseName)
    const [classification, setClassification] = useState(DEFAULTS.classification)
    const [startDate, setStartDate] = useState(DEFAULTS.startDate)
    const [endDate, setEndDate] = useState(DEFAULTS.endDate)
    const [certDate, setCertDate] = useState(DEFAULTS.certDate)
    const [certId, setCertId] = useState("")
    const [sig1Name, setSig1Name] = useState(DEFAULTS.sig1Name)
    const [sig1Title, setSig1Title] = useState(DEFAULTS.sig1Title)
    const [sig2Name, setSig2Name] = useState(DEFAULTS.sig2Name)
    const [sig2Title, setSig2Title] = useState(DEFAULTS.sig2Title)
    const [activePreset, setActivePreset] = useState<string>(PRESETS[0].key)

    const [busy, setBusy] = useState<"pdf" | "png" | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [scale, setScale] = useState(1)
    const [showHelp, setShowHelp] = useState(false)

    const certRef = useRef<HTMLDivElement>(null)
    const scaleBoxRef = useRef<HTMLDivElement>(null)

    // Defaults that depend on the client (avoid SSR hydration mismatch).
    useEffect(() => {
        const now = new Date()
        const iso = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(
            now.getDate()
        ).padStart(2, "0")}`
        setCertDate(iso)
        setCertId(makeCertId(now.getFullYear()))
    }, [])

    // Scale the preview down to fit the stage (capture is always full-size).
    useEffect(() => {
        const el = scaleBoxRef.current
        if (!el) return
        const update = () => setScale(Math.min(1, el.clientWidth / CERT_W))
        update()
        const ro = new ResizeObserver(update)
        ro.observe(el)
        return () => ro.disconnect()
    }, [])

    function applyPreset(p: Preset) {
        setActivePreset(p.key)
        setCourseName(p.course)
        setClassification(p.classification)
    }

    function regenerateId() {
        const year = certDate ? Number(certDate.slice(0, 4)) : new Date().getFullYear()
        setCertId(makeCertId(year))
    }

    function restoreDefaults() {
        setStudentName(DEFAULTS.studentName)
        setCourseName(DEFAULTS.courseName)
        setClassification(DEFAULTS.classification)
        setStartDate(DEFAULTS.startDate)
        setEndDate(DEFAULTS.endDate)
        setSig1Name(DEFAULTS.sig1Name)
        setSig1Title(DEFAULTS.sig1Title)
        setSig2Name(DEFAULTS.sig2Name)
        setSig2Title(DEFAULTS.sig2Title)
        setActivePreset(PRESETS[0].key)
        const now = new Date()
        setCertDate(
            `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(
                now.getDate()
            ).padStart(2, "0")}`
        )
        setCertId(makeCertId(now.getFullYear()))
        setError(null)
    }

    const data = {
        studentName,
        courseName,
        classification,
        certId,
        startDate: formatDate(startDate),
        endDate: formatDate(endDate),
        certificateDate: formatDate(certDate),
        sig1Name,
        sig1Title,
        sig2Name,
        sig2Title,
    }

    async function renderCanvas() {
        const node = certRef.current
        if (!node) throw new Error("Certificate not ready")
        if (typeof document !== "undefined" && "fonts" in document) {
            await document.fonts.ready
        }
        const { default: html2canvas } = await import("html2canvas-pro")
        return html2canvas(node, {
            scale: 2,
            useCORS: true,
            backgroundColor: "#ffffff",
            width: CERT_W,
            height: CERT_H,
        })
    }

    async function downloadPng() {
        setError(null)
        setBusy("png")
        try {
            const canvas = await renderCanvas()
            const link = document.createElement("a")
            link.download = `${fileBase(studentName)}.png`
            link.href = canvas.toDataURL("image/png")
            link.click()
        } catch (e) {
            console.error(e)
            setError("Could not generate the PNG. Please try again.")
        } finally {
            setBusy(null)
        }
    }

    async function downloadPdf() {
        setError(null)
        setBusy("pdf")
        try {
            const canvas = await renderCanvas()
            const imgData = canvas.toDataURL("image/png")
            const { jsPDF } = await import("jspdf")
            const pdf = new jsPDF({ orientation: "landscape", unit: "px", format: [CERT_W, CERT_H] })
            pdf.addImage(imgData, "PNG", 0, 0, CERT_W, CERT_H)
            pdf.save(`${fileBase(studentName)}.pdf`)
        } catch (e) {
            console.error(e)
            setError("Could not generate the PDF. Please try again.")
        } finally {
            setBusy(null)
        }
    }

    // ---- shared field styles ----
    const input =
        "w-full rounded-lg border border-gray-200 bg-gray-50/60 px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange focus:border-transparent transition"
    const label = "block text-xs font-medium text-gray-500 mb-1.5"
    const sectionHead = "flex items-center gap-2 text-sm font-semibold text-gray-800"

    return (
        <div className="min-h-screen bg-[#0b1220] text-gray-200 flex flex-col">
            {/* ---- Top bar ---- */}
            <header className="flex items-center justify-between gap-4 px-5 py-3 border-b border-white/5 bg-[#0e1626]">
                <div className="flex items-center gap-3">
                    <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-orange to-orange-light flex items-center justify-center shadow-lg shadow-orange/20">
                        <Sparkles className="h-6 w-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-lg font-bold text-white leading-tight">KGF Certificate Studio</h1>
                        <p className="text-xs text-gray-400 leading-tight">
                            Ancient Wisdom Meets Modern Intelligence · Digital Credential Builder
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2.5">
                    <button
                        type="button"
                        onClick={() => setShowHelp(true)}
                        className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3.5 py-2 text-xs font-medium text-gray-200 hover:bg-white/10 transition"
                    >
                        <Info className="h-4 w-4" />
                        Guidelines &amp; Printing Help
                    </button>
                    <span className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-gray-300">
                        <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                        Ready
                    </span>
                    <a
                        href="/api/auth/signout"
                        className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3.5 py-2 text-xs font-medium text-gray-200 hover:bg-white/10 transition"
                    >
                        <LogOut className="h-4 w-4" />
                        Sign Out
                    </a>
                </div>
            </header>

            {/* ---- Body ---- */}
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-5 p-5">
                {/* Left: form card */}
                <div className="bg-white rounded-2xl shadow-xl flex flex-col max-h-[calc(100vh-150px)] overflow-hidden">
                    <div className="overflow-y-auto px-5 py-5 space-y-6">
                        {/* Presets */}
                        <div>
                            <p className="text-[11px] font-semibold tracking-wider text-gray-400 mb-2.5">
                                PRESETS / TEMPLATES
                            </p>
                            <div className="grid grid-cols-3 gap-2">
                                {PRESETS.map((p) => {
                                    const PIcon = p.icon
                                    const active = activePreset === p.key
                                    return (
                                        <button
                                            key={p.key}
                                            type="button"
                                            onClick={() => applyPreset(p)}
                                            className={`flex flex-col items-center gap-1.5 rounded-xl border px-2 py-3 text-center transition ${
                                                active
                                                    ? "border-orange bg-orange/5 text-orange"
                                                    : "border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50"
                                            }`}
                                        >
                                            <PIcon className="h-5 w-5" />
                                            <span className="text-[11px] font-medium leading-tight">{p.label}</span>
                                        </button>
                                    )
                                })}
                            </div>
                        </div>

                        {/* Recipient */}
                        <div className="space-y-3">
                            <div className={sectionHead}>
                                <User className="h-4 w-4 text-orange" /> Recipient Details
                            </div>
                            <div>
                                <label className={label} htmlFor="studentName">Student Name</label>
                                <input
                                    id="studentName"
                                    className={input}
                                    value={studentName}
                                    onChange={(e) => setStudentName(e.target.value)}
                                    placeholder="Arjun Patel"
                                />
                            </div>
                        </div>

                        {/* Course */}
                        <div className="space-y-3">
                            <div className={sectionHead}>
                                <BookOpen className="h-4 w-4 text-orange" /> Course Details
                            </div>
                            <div>
                                <label className={label} htmlFor="courseName">Course / Certification Title</label>
                                <input
                                    id="courseName"
                                    className={input}
                                    value={courseName}
                                    onChange={(e) => setCourseName(e.target.value)}
                                    placeholder="Course title"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className={label} htmlFor="classification">Program Classification</label>
                                    <input
                                        id="classification"
                                        className={input}
                                        value={classification}
                                        onChange={(e) => setClassification(e.target.value)}
                                        placeholder="comprehensive AI"
                                    />
                                </div>
                                <div>
                                    <label className={label} htmlFor="certId">Unique Certificate ID</label>
                                    <div className="relative">
                                        <input
                                            id="certId"
                                            className={`${input} pr-9 font-mono text-xs`}
                                            value={certId}
                                            onChange={(e) => setCertId(e.target.value)}
                                            placeholder="KGF-2026-AI-10492"
                                        />
                                        <button
                                            type="button"
                                            onClick={regenerateId}
                                            title="Regenerate ID"
                                            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-orange transition"
                                        >
                                            <RefreshCw className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Dates */}
                        <div className="space-y-3">
                            <div className={sectionHead}>
                                <Calendar className="h-4 w-4 text-orange" /> Course Dates
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className={label} htmlFor="startDate">Start Date</label>
                                    <input id="startDate" type="date" className={input} value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                                </div>
                                <div>
                                    <label className={label} htmlFor="endDate">End Date</label>
                                    <input id="endDate" type="date" className={input} value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                                </div>
                            </div>
                            <div>
                                <label className={label} htmlFor="certDate">Certificate Signature / Issue Date</label>
                                <input id="certDate" type="date" className={input} value={certDate} onChange={(e) => setCertDate(e.target.value)} />
                            </div>
                        </div>

                        {/* Signatures */}
                        <div className="space-y-3">
                            <div className={sectionHead}>
                                <PenLine className="h-4 w-4 text-orange" /> Signatures &amp; Authority
                            </div>
                            <div className="grid grid-cols-1 gap-3">
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className={label} htmlFor="sig1Name">Left Signatory</label>
                                        <input id="sig1Name" className={input} value={sig1Name} onChange={(e) => setSig1Name(e.target.value)} />
                                    </div>
                                    <div>
                                        <label className={label} htmlFor="sig1Title">Title</label>
                                        <input id="sig1Title" className={input} value={sig1Title} onChange={(e) => setSig1Title(e.target.value)} />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className={label} htmlFor="sig2Name">Right Signatory</label>
                                        <input id="sig2Name" className={input} value={sig2Name} onChange={(e) => setSig2Name(e.target.value)} />
                                    </div>
                                    <div>
                                        <label className={label} htmlFor="sig2Title">Title</label>
                                        <input id="sig2Title" className={input} value={sig2Title} onChange={(e) => setSig2Title(e.target.value)} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Card footer */}
                    <div className="flex items-center justify-between border-t border-gray-100 px-5 py-3">
                        <button
                            type="button"
                            onClick={restoreDefaults}
                            className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-gray-800 transition"
                        >
                            <RotateCcw className="h-3.5 w-3.5" /> Restore Defaults
                        </button>
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-gray-400">
                            <ShieldCheck className="h-3.5 w-3.5 text-green-500" /> Verified Secure PDF Generator
                        </span>
                    </div>
                </div>

                {/* Right: preview + export */}
                <div className="flex flex-col gap-5 min-w-0">
                    <div className="flex-1 rounded-2xl border border-white/5 bg-[#0e1626] p-5 flex flex-col min-h-0">
                        <div className="flex items-center justify-between mb-4">
                            <span className="font-mono text-[11px] tracking-widest text-gray-500">PREVIEW_STAGE</span>
                            <span className="inline-flex items-center gap-1.5 rounded-full border border-orange/30 bg-orange/10 px-2.5 py-1 text-[11px] font-medium text-orange">
                                <span className="h-1.5 w-1.5 rounded-full bg-orange animate-pulse" />
                                Dynamic Sync Active
                            </span>
                        </div>

                        <div ref={scaleBoxRef} className="flex-1 w-full overflow-hidden flex items-center justify-center">
                            <div
                                style={{ width: CERT_W * scale, height: CERT_H * scale }}
                                className="shadow-2xl"
                            >
                                <div
                                    style={{
                                        transform: `scale(${scale})`,
                                        transformOrigin: "top left",
                                        width: CERT_W,
                                        height: CERT_H,
                                    }}
                                >
                                    <Certificate ref={certRef} data={data} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Export bar */}
                    <div className="rounded-2xl border border-white/5 bg-[#0e1626] px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <p className="flex items-center gap-2 text-sm font-semibold text-white">
                                <FileText className="h-4 w-4 text-orange" /> Select Export Format
                            </p>
                            <p className="text-xs text-gray-400 mt-0.5">
                                Ready to award credentials? Click below to compile and download high-resolution output files.
                            </p>
                            {error && <p className="text-xs text-red-400 mt-1">{error}</p>}
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                            <button
                                type="button"
                                onClick={downloadPng}
                                disabled={busy !== null}
                                className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold text-white hover:bg-white/10 transition disabled:opacity-60"
                            >
                                {busy === "png" ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileImage className="h-4 w-4 text-green-400" />}
                                DOWNLOAD PNG
                            </button>
                            <button
                                type="button"
                                onClick={downloadPdf}
                                disabled={busy !== null}
                                className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-orange to-orange-light px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-orange/20 hover:opacity-95 transition disabled:opacity-60"
                            >
                                {busy === "pdf" ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileText className="h-4 w-4" />}
                                DOWNLOAD PDF DOCUMENT
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* ---- Help modal ---- */}
            {showHelp && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
                    onClick={() => setShowHelp(false)}
                >
                    <div
                        className="w-full max-w-lg rounded-2xl bg-white text-gray-800 shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
                            <h2 className="flex items-center gap-2 font-semibold text-gray-900">
                                <Info className="h-5 w-5 text-orange" /> Guidelines &amp; Printing Help
                            </h2>
                            <button type="button" onClick={() => setShowHelp(false)} className="text-gray-400 hover:text-gray-700">
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                        <div className="px-5 py-4 space-y-3 text-sm text-gray-600">
                            <p><strong className="text-gray-800">1.</strong> Pick a preset or type the course title and program classification.</p>
                            <p><strong className="text-gray-800">2.</strong> Enter the student name, course start/end dates, and the issue date.</p>
                            <p><strong className="text-gray-800">3.</strong> A unique certificate ID is generated automatically — use the refresh icon to re-roll it, or type your own.</p>
                            <p><strong className="text-gray-800">4.</strong> Use <strong className="text-gray-800">Download PDF</strong> for sharing/printing and <strong className="text-gray-800">PNG</strong> for the web. Both are rendered at 2× resolution.</p>
                            <p className="text-xs text-gray-400 pt-2 border-t border-gray-100">For best print results, print the PDF at 100% scale (no “fit to page”) on Letter-size paper in landscape orientation.</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
