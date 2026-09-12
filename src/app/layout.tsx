import type { Metadata } from "next";
import { Outfit, Poppins, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { ToastProvider } from "@/contexts/ToastContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "SAHAKAR SEVA - Worker-First Cooperative Gig Services Marketplace",
  description: "A digital marketplace owned by worker cooperatives. Designed for workers, trusted by communities. 80% direct net wages, transparent pricing, and democratic governance.",
  keywords: ["cooperative marketplace", "gig workers", "fair wages", "home services", "electrician", "plumber", "cleaning", "worker empowerment"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${poppins.variable} ${mono.variable}`}>
      <body className="min-h-screen flex flex-col bg-white text-neutral-dark antialiased">
        <AuthProvider>
          <ToastProvider>
            <Header />
            <main className="flex-1 pt-20">
              {children}
            </main>
            <Footer />
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
