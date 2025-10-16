import type { Metadata, Viewport } from "next";
import type IEmergency from "@/types/emergency";

import { Fira_Sans } from "next/font/google";
import "./globals.css";
import { ViewProvider } from "@/context/view";
import UIProvider from "@/context/UIProvider";
import axios from "axios";
import Emergency from "@/components/emergency";

const fira = Fira_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "JetHouse",
  description: "Fly your way to the top",
};

export const viewport: Viewport = {
  themeColor: "#172554",
};

const RootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) =>
  await axios
    .get<IEmergency>(
      `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/globals/emergency`,
    )
    .then(({ data }) => (
      <html
        lang="en"
        className={`scroll-smooth${data.enabled && " bg-pattern bg-repeat"}`}
      >
        {data.enabled && (
          <div
            className={
              "w-full h-dvh bg-gradient-to-b from-white via-transparent to-white fixed -z-10 inset-0"
            }
          />
        )}
        <UIProvider>
          <ViewProvider>
            <body className={fira.className}>
              {!data.enabled ? children : <Emergency data={data} />}
            </body>
          </ViewProvider>
        </UIProvider>
      </html>
    ));

export default RootLayout;
