import type { Metadata } from "next";
import "./globals.css";
import { siteConfig } from "./lib/site";

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} | ${siteConfig.nameEn}`,
    template: `%s | ${siteConfig.nameEn}`,
  },

  description: siteConfig.description,

  keywords: [
    "كوكب الصين",
    "China Planet",
    "الصين",
    "السياحة في الصين",
    "السفر إلى الصين",
    "الدراسة في الصين",
    "الجامعات الصينية",
    "تعلم اللغة الصينية",
    "دورات اللغة الصينية",
    "الاستيراد من الصين",
    "التجارة مع الصين",
    "التجارة في الصين",
    "مصانع الصين",
    "التوريد من الصين",
    "خدمات الشركات",
    "خدمات الأفراد",
    "السعودية والصين",
  ],

  authors: [
    {
      name: siteConfig.nameEn,
    },
  ],

  creator: siteConfig.nameEn,

  metadataBase: siteConfig.url
    ? new URL(siteConfig.url)
    : undefined,

  alternates: {
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
        url: "/brand/china-planet-logo.png",
        width: 1254,
        height: 1254,
        alt: `${siteConfig.name} - ${siteConfig.nameEn}`,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | ${siteConfig.nameEn}`,
    description: siteConfig.description,
    images: ["/brand/china-planet-logo.png"],
  },

  icons: {
    icon: "/brand/china-planet-logo.png",
    shortcut: "/brand/china-planet-logo.png",
    apple: "/brand/china-planet-logo.png",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
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
      <body>{children}</body>
    </html>
  );
}
