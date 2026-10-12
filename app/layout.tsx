import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { StudentDataProvider } from "@/components/context/StudentDataContext";
import { NetworkStatusWatcher } from "@/components/error/NetworkStatusWatcher";

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
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className="min-h-screen bg-[#FAF7F2] text-[#121826] flex flex-col antialiased selection:bg-stone-900 selection:text-white"
      >
        <StudentDataProvider>
          <NetworkStatusWatcher />
          <Navbar />
          <main className="flex-1 w-full">
            {children}
          </main>
          <Footer />
        </StudentDataProvider>
      </body>
    </html>
  );
}
