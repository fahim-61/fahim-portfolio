import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import FrameBorder from "@/components/FrameBorder";
import { AOSInit } from "@/components/AOSInit";
import CustomCursor from "@/components/CustomCursor";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Md. Fahim Ferdous | Embedded Systems, IoT & ML Developer",
  description:
    "Portfolio of Md. Fahim Ferdous: CSE graduate of Daffodil International University working across embedded systems (ESP32, STM32), IoT, TinyML and machine learning. Chairperson, IEEE DIU Student Branch.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <body className="font-sans antialiased text-slate-200 bg-[#0a0f1d]">
        <AOSInit />
        <CustomCursor />
        <FrameBorder />
        {/* Main content wrapper with padding for the railway border (no z-index, so the navbar and viewers can sit above the frame) */}
        <main className="relative pt-20 pb-20 px-8 md:px-12">
          {children}
        </main>
      </body>
    </html>
  );
}
