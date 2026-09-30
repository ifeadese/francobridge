import Footer from "@/app/_components/footer";
import Header from "@/app/_components/header";
import CalProvider from "@/app/_components/cal-provider";
import { LEGAL_NAME, SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE, SITE_URL } from "@/lib/constants";
import type { Metadata } from "next";
import { Figtree, Fraunces } from "next/font/google";
import cn from "classnames";

import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  variable: "--font-heading",
  display: "swap",
});

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} · ${SITE_TAGLINE}`,
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: LEGAL_NAME,
  openGraph: {
    siteName: LEGAL_NAME,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(fraunces.variable, figtree.variable)}>
      <head>
        <meta name="theme-color" content="#0E397F" />
      </head>
      <body className="font-body bg-ivory text-ink antialiased">
        <CalProvider />
        <Header />
        <div className="min-h-screen">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
