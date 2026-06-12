import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import {
  Geist_Mono,
  IBM_Plex_Sans_Condensed,
  Dancing_Script,
  Inter,
  Instrument_Serif,
  Alegreya,
} from "next/font/google";
import "./globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ImageProtection from "@/components/ImageProtection";

export const revalidate = 3600;

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const ibmPlexSansCondensed = IBM_Plex_Sans_Condensed({
  weight: ["400", "500", "600", "700"],
  variable: "--font-condensed",
  subsets: ["latin"],
});

const dancingScript = Dancing_Script({
  weight: ["400", "700"],
  variable: "--font-dancing-script",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  subsets: ["latin"],
});

const alegreya = Alegreya({
  weight: ["400", "500", "700"],
  variable: "--font-alegreya",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "HiVOOC",
    template: "%s | HiVOOC",
  },
  description:
    "Tailor-made primate tourism for conservation in Vietnam. Join expert-guided tours to encounter rare primates, birds, and biodiversity while supporting conservation.",
  openGraph: {
    siteName: "HiVOOC",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "HiVOOC – Primate Tourism for Conservation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-image.png"],
  },
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body
        className={`${inter.variable} ${geistMono.variable} ${ibmPlexSansCondensed.variable} ${dancingScript.variable} ${instrumentSerif.variable} ${alegreya.variable}`}
      >
        <NextIntlClientProvider messages={messages}>
          <ImageProtection />
          <Header />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
