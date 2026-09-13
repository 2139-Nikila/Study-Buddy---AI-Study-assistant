import { Geist, Geist_Mono } from "next/font/google";
import Sidebar from "@/components/Sidebar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "AI Study Buddy ✦",
  description:
    "Organize notes, practice quizzes, and learn with an AI tutor in one magical study dashboard.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#f8f1e8] text-[#382848]">
        <div className="magical-shell min-h-screen">
          <div className="magic-particles" aria-hidden="true" />

          <div className="relative z-10 flex min-h-screen flex-col md:flex-row">
            <Sidebar />

            <main className="min-w-0 flex-1">
              <div className="min-h-screen">{children}</div>
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}