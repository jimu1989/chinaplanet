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

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  verification: {
    google: "GsP5vqFrX_AijENiXUZvUjllC3-fapG6cXx5qUwnDgA",
  },
  metadataBase: new URL(siteUrl),

  title: {
    default: "كوكب الصين | China Planet",
    template: "%s | China Planet",
  },

  description:
    "كوكب الصين | China Planet — شريكك في السفر إلى الصين، الدراسة، التجارة، الاستيراد، التوريد، والمصانع الصينية.",

  keywords: [
    "كوكب الصين",
    "China Planet",
    "السفر إلى الصين",
    "السياحة في الصين",
    "الدراسة في الصين",
    "التجارة مع الصين",
    "الاستيراد من الصين",
    "التصدير من الصين",
    "مصانع الصين",
    "المصانع الصينية",
    "التوريد من الصين",
    "موردين من الصين",
    "شركات الصين",
  ],

  authors: [{ name: siteConfig.nameEn }],
  creator: siteConfig.nameEn,

  alternates: {
    canonical: "https://chinaplanet.vercel.app/",
    languages: {
      "ar-SA": "/ar",
      "en": "/en",
      "zh-CN": "/zh",
      "x-default": "/ar",
    },
  },

  openGraph: {
    type: "website",
    locale: "ar_SA",
    alternateLocale: ["en_US", "zh_CN"],
    siteName: "China Planet",
    title: "كوكب الصين | China Planet",
    description:
      "شريكك في السفر والدراسة والتجارة والاستيراد والتوريد من الصين.",
    url: "/ar",
    images: [
      {
        url: "/brand/china-planet-logo.svg",
        alt: "China Planet",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "كوكب الصين | China Planet",
    description:
      "شريكك في السفر والدراسة والتجارة والاستيراد والتوريد من الصين.",
  },

  icons: {
    icon: "/brand/china-planet-logo.svg",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
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
