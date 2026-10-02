import Footer from "@/app/_components/footer";
import Header from "@/app/_components/header";
import CalProvider from "@/app/_components/cal-provider";
import { LEGAL_NAME, SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE, SITE_URL } from "@/lib/constants";
import type { Metadata } from "next";
import { Figtree, Marcellus } from "next/font/google";
import cn from "classnames";

import "./globals.css";

// Marcellus, the face of the logo, for every heading and title. It has one
// weight and no italic.
const marcellus = Marcellus({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-heading",
  display: "swap",
});

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["400", "500"],
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
  // Not live yet: keep every page out of search engines. Remove at launch.
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
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
    <html lang="en" className={cn(marcellus.variable, figtree.variable)}>
      <head>
        <meta name="theme-color" content="#fffbf8" />
      </head>
      <body className="font-body bg-white text-navy antialiased">
        <CalProvider />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
