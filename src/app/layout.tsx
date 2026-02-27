import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google"; // Using Google Fonts
import "./globals.css";
import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "KGF Bharat | AI & Technology Education",
    template: "%s | KGF Bharat",
  },
  description:
    "Master AI and transform your career with KGF Bharat and Krishna Worldwide Technology. Bridging ancient Dharmic wisdom with modern artificial intelligence.",
  keywords: [
    "KGF Bharat",
    "Kurukshetra Gurukulam Foundation",
    "AI courses",
    "technology education",
    "Krishna Worldwide",
    "Dharmic wisdom",
    "artificial intelligence training",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "KGF Bharat - Kurukshetra Gurukulam Foundation",
    title: "KGF Bharat | AI & Technology Education",
    description:
      "Master AI and transform your career with KGF Bharat and Krishna Worldwide Technology.",
  },
  twitter: {
    card: "summary_large_image",
    title: "KGF Bharat | AI & Technology Education",
    description:
      "Master AI and transform your career with KGF Bharat and Krishna Worldwide Technology.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfair.variable} antialiased min-h-screen flex flex-col`}
      >
        <Navbar />
        <main className="flex-1 pt-28">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
