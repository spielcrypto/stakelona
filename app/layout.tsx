import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import WalletProvider from "@/components/WalletProvider";
import Navigation from "@/components/Navigation";
import { AppProvider } from "@/context/AppContext";
import I18nProvider from "@/components/I18nProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Stakelona - Stake, Earn, and Access Premium Services",
  description:
    "A Solana-based platform for staking SOL tokens and accessing premium services with rewards",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <I18nProvider>
          <WalletProvider>
            <AppProvider>
              <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
                <Navigation />
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                  {children}
                </main>
              </div>
            </AppProvider>
          </WalletProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
