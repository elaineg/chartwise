import type { Metadata } from "next";
import "./globals.css";

// metadataBase lets Next.js resolve relative og:image paths to absolute URLs.
// Override with NEXT_PUBLIC_BASE_URL env var in production.
const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ?? "https://chartwise.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "chartwise — Your birth chart, explained in plain English",
  description:
    "Free, no signup. Compute your natal chart and read every placement in plain English. Houses-as-rows table, element counts, and today's transit notes.",
  openGraph: {
    images: [{ url: "/og-default.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-default.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
