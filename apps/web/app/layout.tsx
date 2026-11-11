import type { Metadata, Viewport } from "next";
import { Instrument_Sans, Newsreader } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";

const display = Newsreader({
  subsets: ["latin"],
  variable: "--font-display",
  axes: ["opsz"],
  style: ["normal", "italic"],
  display: "swap",
});

const body = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  applicationName: "Vendora",
  category: "software",
  openGraph: { type: "website", siteName: "Vendora" },
  other: { "application-category": "BusinessApplication" },
  title: "Vendora: turn customer conversations into trackable orders",
  description:
    "Vendora is in development for social sellers and small teams: customer context, product variants, stock and order progress in one record, from first message to fulfilment.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f3efe6",
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <a
          className="fixed top-[-80px] left-3 z-[100] bg-ink px-[18px] py-3 font-semibold text-paper focus:top-3"
          href="#main"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
