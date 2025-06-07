import { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, Locale, NextIntlClientProvider } from "next-intl";
import { ReactNode } from "react";
import NfcPortLibLoader from "@/app/components/NfcPortLibLoader";
import ReactQueryClientProvider from "@/app/components/ReactQueryClientProvider";
import { routing } from "@/i18n/routing";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: "EC Reception",
  description: "Engineer Cafe Reception Application",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: Locale }>;
}) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NfcPortLibLoader />
        <NextIntlClientProvider>
          <ReactQueryClientProvider>{children}</ReactQueryClientProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
