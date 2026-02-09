import { Navbar } from "@/components/common/Navbar"
import { Footer } from "@/components/common/Footer"
import { Hero } from "@/components/home/Hero"
import { CoursePreview } from "@/components/home/CoursePreview"
import { ValuesSection } from "@/components/home/ValuesSection"
import { MediaSection } from "@/components/home/MediaSection"
import AIAdvisor from "@/components/common/AIAdvisor"

// Next.js App Router Page
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
