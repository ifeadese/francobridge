import Footer from "@/app/_components/footer";
import Header from "@/app/_components/header";
import { LEGAL_NAME, SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE, SITE_URL } from "@/lib/constants";
import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import cn from "classnames";

import "./globals.css";

// Figtree, the closest open face to the Avenir Next of the client's wordmark
// and print collateral: regular and medium for reading, semibold and bold
// for headings.
const figtree = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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
    <html lang="en" className={cn(figtree.variable)}>
      <head>
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className="font-body bg-white text-blue antialiased">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
