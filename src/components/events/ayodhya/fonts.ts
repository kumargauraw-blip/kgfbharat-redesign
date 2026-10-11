import { Mukta, Noto_Serif_Devanagari, Rozha_One } from "next/font/google"

export const rozha = Rozha_One({
    weight: "400",
    subsets: ["devanagari", "latin"],
    variable: "--font-ay-rozha",
    display: "swap",
})

export const notoSerif = Noto_Serif_Devanagari({
    weight: ["500", "600", "700"],
    subsets: ["devanagari", "latin"],
    variable: "--font-ay-noto-serif",
    display: "swap",
})

export const mukta = Mukta({
    weight: ["400", "500", "600", "700"],
    subsets: ["devanagari", "latin"],
    variable: "--font-ay-mukta",
    display: "swap",
})

export const ayodhyaFontVars = `${rozha.variable} ${notoSerif.variable} ${mukta.variable}`
