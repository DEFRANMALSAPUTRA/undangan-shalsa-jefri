import type { Metadata } from "next";
import { Playfair_Display, Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Wedding of Shalsa & Jefri | Undangan Pernikahan",
  description: "Dengan memohon rahmat dan ridho Allah SWT, kami mengundang Anda untuk menghadiri pernikahan Shalsa Zya Salman & Jefri Oktafio.",
  keywords: ["undangan pernikahan", "wedding invitation", "shalsa & jefri", "baralek gadang", "pernikahan minang"],
  openGraph: {
    title: "The Wedding of Shalsa & Jefri",
    description: "Undangan Pernikahan Digital Shalsa & Jefri - 09 Oktober 2026",
    url: "https://undangan-pernikahan.vercel.app",
    siteName: "Undangan Pernikahan Shalsa & Jefri",
    images: [
      {
        url: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "The Wedding of Shalsa & Jefri",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning className={`${playfair.variable} ${cormorant.variable} ${jakarta.variable}`}>
      <body suppressHydrationWarning className="antialiased selection:bg-minang-300 selection:text-minangGelap-700 bg-minangPutih-100">
        {children}
      </body>
    </html>
  );
}
