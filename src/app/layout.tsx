// Patch BigInt serialization globally for API responses
(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};

import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Fira_Code, Jacquard_24 } from "next/font/google";
import localFont from "next/font/local";
import { Providers } from "@/components/providers";
import { DevInfo } from "@/components/dev-info";
import { VerificationWall } from "@/components/verification-wall";
import { Eruda } from "@/components/eruda";
import SplashBackground from "@/components/splash-background";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Joust",
  description: "Prediction markets powered by World ID",
  metadataBase: new URL("https://joust-online.com"),
  openGraph: {
    title: "Joust",
    description: "Prediction markets powered by World ID",
    url: "https://joust-online.com",
    siteName: "Joust",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

const jacquard = Jacquard_24({
  variable: "--font-jacquard",
  subsets: ["latin"],
  weight: ["400"],
  preload: true,
  display: "swap",
});

const jeju = localFont({
  src: "../fonts/JejuGothic.woff",
  variable: "--font-jeju",
});

const firaMono = Fira_Code({
  variable: "--font-fira-mono",
  subsets: ["latin"],
  preload: false,
  display: "optional",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(jacquard.variable, jeju.variable, firaMono.variable, "dark")}>
        <Eruda />
        <SplashBackground />
        <Providers>
          <VerificationWall>
            {children}
            <DevInfo />
          </VerificationWall>
        </Providers>
      </body>
    </html>
  );
}
