import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Corporate Training",
    description:
        "Customized AI training programs by KGF Bharat and Krishna Worldwide Technology. Empower your workforce with expert-led courses designed to boost productivity and drive innovation.",
    openGraph: {
        title: "Corporate AI Training | KGF Bharat",
        description:
            "Customized AI training programs designed to upskill your team. Led by industry experts from KGF Bharat and Krishna Worldwide Technology.",
    },
}

export default function CorporateTrainingLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}
