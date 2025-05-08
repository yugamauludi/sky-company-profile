import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/src/components/Footer";
import Navbar from "@/src/components/Navbar";
import { LanguageProvider } from '@/src/context/LanguageContext';
import ScrollIndicator from "@/src/components/ScrollIndicator";

export const metadata: Metadata = {
  title: "Sky Company",
  description: "Your trusted business partner",
  icons: {
    icon: "/images/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
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
