import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/src/components/Footer";
import Navbar from "@/src/components/Navbar";
import { LanguageProvider } from "@/src/context/LanguageContext";
import ScrollIndicator from "@/src/components/ScrollIndicator";

export const metadata: Metadata = {
  title: "SKY PARKING UTAMA",
  description:
    "Perusahaan penyedia solusi perparkiran modern dan terintegrasi di Indonesia. Kami menghadirkan sistem parkir berbasis teknologi untuk meningkatkan efisiensi, keamanan, dan kenyamanan di berbagai area komersial dan publik",
  icons: {
    icon: "/images/logo.png",
  },
  // Open Graph meta tags untuk WhatsApp dan social media
  openGraph: {
    title: "SKY PARKING UTAMA",
    description:
      "Perusahaan penyedia solusi perparkiran modern dan terintegrasi di Indonesia. Sistem parkir berbasis teknologi untuk efisiensi, keamanan, dan kenyamanan.",
    images: [
      {
        url: "https://skyparking.co.id/images/logo.png", // URL ABSOLUT
        width: 1200,
        height: 630,
        alt: "SKY PARKING UTAMA",
      },
    ],
    url: "https://skyparking.co.id",
    type: "website",
    siteName: "SKY PARKING UTAMA",
    locale: "id_ID",
  },
  // Twitter Card meta tags
  twitter: {
    card: "summary_large_image",
    title: "SKY PARKING UTAMA",
    description:
      "Perusahaan penyedia solusi perparkiran modern dan terintegrasi di Indonesia. Sistem parkir berbasis teknologi untuk efisiensi, keamanan, dan kenyamanan.",
    images: ["https://skyparking.co.id/images/logo.png"], // URL ABSOLUT
  },
  // Additional meta tags
  keywords:
    "parkir, parking, solusi parkir, sistem parkir, teknologi parkir, Indonesia, Sky Parking",
  authors: [{ name: "SKY PARKING UTAMA" }],
  creator: "SKY PARKING UTAMA",
  publisher: "SKY PARKING UTAMA",
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <head>
        <link rel="icon" type="image/png" href="/images/logo.png" />
        {/* Meta tags tambahan untuk WhatsApp */}
        <meta property="og:image:type" content="image/png" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="theme-color" content="#ffffff" />

        {/* Open Graph Meta Tags dengan URL absolut */}
        <meta property="og:title" content="SKY PARKING UTAMA" />
        <meta
          property="og:description"
          content="Perusahaan penyedia solusi perparkiran modern dan terintegrasi di Indonesia. Sistem parkir berbasis teknologi untuk efisiensi, keamanan, dan kenyamanan."
        />
        <meta property="og:image" content="https://skyparking.co.id/images/logo.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="SKY PARKING UTAMA Logo" />
        <meta property="og:url" content="https://skyparking.co.id/" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="SKY PARKING UTAMA" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="SKY PARKING UTAMA" />
        <meta
          name="twitter:description"
          content="Perusahaan penyedia solusi perparkiran modern dan terintegrasi di Indonesia. Sistem parkir berbasis teknologi untuk efisiensi, keamanan, dan kenyamanan."
        />
        <meta
          name="twitter:image"
          content="https://skyparking.co.id/images/logo.png"
        />
      </head>
      <body>
        <LanguageProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow pt-16">
              {children}
              <ScrollIndicator />
            </main>
            <Footer />
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}