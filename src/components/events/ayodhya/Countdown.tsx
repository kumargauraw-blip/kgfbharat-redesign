"use client"

import { useEffect, useState } from "react"

const UNITS = [
    { key: "d", label: "दिन", ms: 86_400_000 },
    { key: "h", label: "घंटे", ms: 3_600_000 },
    { key: "m", label: "मिनट", ms: 60_000 },
    { key: "s", label: "सेकंड", ms: 1_000 },
] as const

function split(diff: number) {
    let rest = Math.max(diff, 0)
    return UNITS.map((u) => {
        const value = Math.floor(rest / u.ms)
        rest -= value * u.ms
        return String(value).padStart(2, "0")
    })
}

export function Countdown({ target }: { target: string }) {
    const [values, setValues] = useState<string[] | null>(null)
    const targetMs = new Date(target).getTime()

    useEffect(() => {
        const tick = () => setValues(split(targetMs - Date.now()))
        tick()
        const id = setInterval(tick, 1000)
        return () => clearInterval(id)
    }, [targetMs])

    return (
        <div className="flex items-end gap-5 sm:gap-8" role="timer" aria-label="आयोजन में शेष समय">
            {UNITS.map((u, i) => (
                <div key={u.key} className="text-center">
                    <div className="font-ay-serif text-4xl sm:text-5xl font-bold tabular-nums text-ay-paper">
                        {values ? values[i] : "--"}
                    </div>
                    <div className="mt-1 font-ay-sans text-sm sm:text-base font-semibold text-ay-gold-light">{u.label}</div>
                </div>
            ))}
        </div>
    )
}
