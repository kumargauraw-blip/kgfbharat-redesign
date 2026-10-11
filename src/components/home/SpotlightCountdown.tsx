"use client"

import { useEffect, useState } from "react"

const UNITS = [
    { label: "Days", ms: 86_400_000 },
    { label: "Hours", ms: 3_600_000 },
    { label: "Mins", ms: 60_000 },
    { label: "Secs", ms: 1_000 },
] as const

function split(diff: number) {
    let rest = Math.max(diff, 0)
    return UNITS.map((u) => {
        const value = Math.floor(rest / u.ms)
        rest -= value * u.ms
        return String(value).padStart(2, "0")
    })
}

export function SpotlightCountdown({ target }: { target: string }) {
    const [values, setValues] = useState<string[] | null>(null)
    const targetMs = new Date(target).getTime()

    useEffect(() => {
        const tick = () => setValues(split(targetMs - Date.now()))
        tick()
        const id = setInterval(tick, 1000)
        return () => clearInterval(id)
    }, [targetMs])

    return (
        <div className="grid grid-cols-4 gap-2 sm:gap-3" role="timer" aria-label="Time left until the event">
            {UNITS.map((u, i) => (
                <div key={u.label} className="rounded-2xl border border-white/15 bg-white/10 px-2 py-2.5 text-center backdrop-blur-md">
                    <div className="text-2xl sm:text-3xl font-black tabular-nums leading-none text-white">{values ? values[i] : "--"}</div>
                    <div className="mt-1.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-amber-200/90">{u.label}</div>
                </div>
            ))}
        </div>
    )
}
