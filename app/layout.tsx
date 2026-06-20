import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ProDrive Garage | Premium Oil Change & Auto Service",
  description:
    "Full-synthetic oil changes, brake service, diagnostics, and complete vehicle maintenance. Certified technicians, transparent pricing.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#050608",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="min-h-full overflow-x-hidden bg-[#050608] font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
