import type { Metadata } from "next";
import {
  Geist_Mono,
  IBM_Plex_Sans_Condensed,
  Dancing_Script,
  Inter,
} from "next/font/google";
import "./globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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

export const metadata: Metadata = {
  title: "HiVOOC",
  description: "",
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body
        className={`${inter.variable} ${geistMono.variable} ${ibmPlexSansCondensed.variable} ${dancingScript.variable}`}
      >
        <NextIntlClientProvider messages={messages}>
          <Header />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
