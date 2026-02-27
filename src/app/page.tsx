import type { Metadata } from "next"
import { Hero } from "@/components/home/Hero"
import { CoursePreview } from "@/components/home/CoursePreview"
import { ValuesSection } from "@/components/home/ValuesSection"
import { MediaSection } from "@/components/home/MediaSection"
import AIAdvisor from "@/components/common/AIAdvisor"

export const metadata: Metadata = {
  title: "KGF Bharat | Ancient Wisdom Meets Modern Intelligence",
  description:
    "KGF Bharat prepares the visionaries of tomorrow by anchoring them in Sanatana ethics while mastering the most powerful technology of the 21st century. Explore AI courses, events, and community.",
  openGraph: {
    title: "KGF Bharat | Ancient Wisdom Meets Modern Intelligence",
    description:
      "KGF Bharat prepares the visionaries of tomorrow by anchoring them in Sanatana ethics while mastering AI and modern technology.",
  },
}

export default async function Home() {
  return (
    <main className="min-h-screen bg-off-white flex flex-col">
      <Hero />
      <ValuesSection />
      <CoursePreview />
      <MediaSection />
      <AIAdvisor />
    </main>
  )
}
