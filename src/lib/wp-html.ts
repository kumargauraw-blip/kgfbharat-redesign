/** Strip tags for excerpts, cards, and metadata. */
export function stripHtml(html: string): string {
    return html
        .replace(/<[^>]*>/g, " ")
        .replace(/&nbsp;/gi, " ")
        .replace(/&hellip;/gi, "…")
        .replace(/&#8230;/g, "…")
        .replace(/&amp;/gi, "&")
        .replace(/&lt;/gi, "<")
        .replace(/&gt;/gi, ">")
        .replace(/&quot;/gi, '"')
        .replace(/&#39;/g, "'")
        .replace(/\s+/g, " ")
        .trim()
}

export function looksLikeHtml(value: string): boolean {
    return /<\/?[a-z][\s\S]*>/i.test(value)
}

/**
 * WordPress classic editor stores headings/lists/tables as HTML
 * but leaves ordinary paragraphs as bare text. Wrap those so the
 * course page keeps blog spacing without a plugin change.
 */
export function formatWpHtml(html: string): string {
    let source = html.replace(/\r\n?/g, "\n").trim()
    if (!source) return ""

    const blocks: string[] = []
    const stash = (match: string) => {
        blocks.push(match)
        return `\n\n<!--KGFBLOCK${blocks.length - 1}-->\n\n`
    }

    source = source.replace(/<(table|ul|ol|blockquote|pre|figure)[\s\S]*?<\/\1>/gi, stash)
    source = source.replace(/<h([1-6])[^>]*>[\s\S]*?<\/h\1>/gi, stash)
    source = source.replace(/<hr\s*\/?>/gi, stash)

    const formatted = source
        .split(/\n\s*\n/)
        .map((chunk) => {
            const text = chunk.trim()
            if (!text || text === "&nbsp;") return ""
            const token = text.match(/^<!--KGFBLOCK(\d+)-->$/)
            if (token) return blocks[Number(token[1])]
            if (/^<(p|div|h[1-6]|ul|ol|table|blockquote)\b/i.test(text)) return text
            return `<p>${text.replace(/\n/g, "<br />")}</p>`
        })
        .filter(Boolean)
        .join("\n")

    return formatted
}
