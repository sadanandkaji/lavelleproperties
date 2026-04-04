import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AnimatedBackground from "./components/AnimatedBackground";
import Navbar from "./components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Lavelle Venture",
    template: "%s | Lavelle Venture",
  },
  description: "Luxury real estate platform",

  // ✅ Icons (Browser tab, mobile, etc.)
  icons: {
    icon: "/lavellelogo.svg",
    shortcut: "/lavellelogo.svg",
    apple: "/lavellelogo.svg",
  },

  // ✅ Open Graph (WhatsApp, Facebook, LinkedIn)
  openGraph: {
    title: "Lavelle Venture",
    description: "Luxury real estate platform",
    url: "https://properties.lavelleventure.com/", // 🔥 replace this
    siteName: "Lavelle Venture",
    images: [
      {
        url: "/og-lavelleimage.png", // ✅ IMPORTANT (PNG, not SVG)
        width: 1200,
        height: 630,
        alt: "Lavelle Venture",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  // ✅ Twitter Preview
  twitter: {
    card: "summary_large_image",
    title: "Lavelle Venture",
    description: "Luxury real estate platform",
    images: ["/og-image.png"],
  },

  // ✅ Theme color (mobile browser UI)
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-black -mt-14">
        
        {/* Navbar */}
        <Navbar />

        {/* Background (keep behind content) */}
        <AnimatedBackground />

        {/* Page Content */}
        <main className="flex-1 relative z-10">
          {children}
        </main>

      </body>
    </html>
  );
}