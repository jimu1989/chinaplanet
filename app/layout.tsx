import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "كوكب الصين | China Planet",
  description:
    "كوكب الصين — بوابتك إلى الصين. سياحة، دراسة، تعلم اللغة الصينية، تجارة واستيراد، وخدمات متكاملة للأفراد والشركات.",
  keywords: [
    "كوكب الصين",
    "China Planet",
    "السياحة في الصين",
    "الدراسة في الصين",
    "تعلم الصينية",
    "الاستيراد من الصين",
    "التجارة في الصين",
  ],
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