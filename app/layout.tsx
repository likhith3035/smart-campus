import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";

export const metadata: Metadata = {
  title: "CampusIQ | AI-Powered Student Analytics & Success Platform",
  description: "Turn student data into brighter futures. Identify at-risk students early, provide personalized support, and improve academic and placement outcomes.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#FAF7F2] text-[#121826] flex flex-col antialiased selection:bg-stone-900 selection:text-white">
        <Navbar />
        <main className="flex-1 w-full">
          {children}
        </main>
        <footer className="border-t border-[#EAE5DC] bg-[#FAF7F2] py-12 text-xs text-[#78716C]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base text-[#111827]">CampusIQ</span>
              <span className="text-stone-400">•</span>
              <span>KPMG in India AI-Powered Student Success Platform</span>
            </div>
            <div className="flex items-center gap-6 text-[#57534E]">
              <span>Academic</span>
              <span>Attendance</span>
              <span>LMS</span>
              <span>Placement</span>
              <span>Skills</span>
              <span>Feedback</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
