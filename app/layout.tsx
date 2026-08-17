import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import { siteConfig } from "./lib/site";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  display: "swap",
  variable: "--font-arabic",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),

  title: {
    default: `${siteConfig.name} | ${siteConfig.nameEn}`,
    template: `%s | ${siteConfig.nameEn}`,
  },

  description: siteConfig.description,

  keywords: [
    "كوكب الصين",
    "China Planet",
    "السفر إلى الصين",
    "السياحة في الصين",
    "الدراسة في الصين",
    "التجارة مع الصين",
    "الاستيراد من الصين",
    "مصانع الصين",
  ],

  authors: [
    {
      name: siteConfig.nameEn,
    },
  ],

  creator: siteConfig.nameEn,

  alternates: {
    canonical: "/",
    languages: {
      "ar-SA": "/",
    },
  },

  openGraph: {
    type: "website",
    locale: "ar_SA",
    siteName: siteConfig.nameEn,
    title: `${siteConfig.name} | ${siteConfig.nameEn}`,
    description: siteConfig.description,
    images: [
      {
        url: "/brand/china-planet-logo.svg",
        alt: "China Planet",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | ${siteConfig.nameEn}`,
    description: siteConfig.description,
  },

  icons: {
    icon: "/brand/china-planet-logo.svg",
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
    <html lang="ar" dir="rtl">
      <body className={cairo.variable}>{children}</body>
    </html>
  );
}