import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/layout/client-layout";
import { getSettings, seedIfEmpty } from "@/lib/json-store";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Techphase Solutions | Premier IT Solutions Provider in Ghana",
  description:
    "Techphase Solutions is Ghana's trusted IT partner offering computers, networking, CCTV, systems maintenance, repairs and office supplies in Accra since 2014.",
  keywords: [
    "Techphase Solutions",
    "IT Solutions Ghana",
    "Computer Sales Accra",
    "Networking Ghana",
    "CCTV Installation",
    "System Maintenance Ghana",
    "Office Supplies Accra",
  ],
  authors: [{ name: "Techphase Solutions" }],

  openGraph: {
    title: "Techphase Solutions | Premier IT Solutions Provider in Ghana",
    description:
      "Ghana's trusted IT partner offering computers, networking, CCTV, systems maintenance, repairs and office supplies in Accra since 2014.",
    siteName: "Techphase Solutions",
    locale: "en_GH",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Techphase Solutions | Premier IT Solutions Provider in Ghana",
    description:
      "Ghana's trusted IT partner offering computers, networking, CCTV, systems maintenance, repairs and office supplies in Accra since 2014.",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  seedIfEmpty();
  const settings = getSettings();

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ClientLayout settings={settings}>{children}</ClientLayout>
      </body>
    </html>
  );
}
