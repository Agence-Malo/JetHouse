import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { Fira_Sans } from "next/font/google";
import "./globals.css";
import { ViewProvider } from "@/context/view";
import UIProvider from "@/context/UIProvider";

const fira = Fira_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "JetHouse",
  description: "Fly your way to the top",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <SpeedInsights />
      <Analytics />
      <UIProvider>
        <ViewProvider>
          <body className={fira.className}>{children}</body>
        </ViewProvider>
      </UIProvider>
    </html>
  );
}
