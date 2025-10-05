"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";

const navItems = [
  { href: "/", label: "nav.marketplace", icon: "🛍️" },
  { href: "/staking", label: "nav.stakingPools", icon: "💰" },
  { href: "/provider", label: "nav.serviceProvider", icon: "⚙️" },
  { href: "/dashboard", label: "nav.myDashboard", icon: "📊" },
];

export default function Navigation() {
  const pathname = usePathname();
  const { t } = useTranslation();

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="text-3xl">🔷</div>
              <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
                Stakelona
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    px-4 py-2 rounded-lg font-medium transition-all duration-200
                    ${
                      isActive
                        ? "bg-primary-600 text-white shadow-md"
                        : "text-gray-600 hover:bg-gray-100"
                    }
                  `}
                >
                  <span className="mr-2">{item.icon}</span>
                  {t(item.label)}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center space-x-2">
            <LanguageSwitcher />
            <WalletMultiButton className="!bg-primary-600 hover:!bg-primary-700" />
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden pb-4">
          <div className="flex flex-wrap gap-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200
                    ${
                      isActive
                        ? "bg-primary-600 text-white"
                        : "text-gray-600 hover:bg-gray-100"
                    }
                  `}
                >
                  <span className="mr-1">{item.icon}</span>
                  {t(item.label)}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
