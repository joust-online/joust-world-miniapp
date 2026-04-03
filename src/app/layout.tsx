import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";
import { DevInfo } from "@/components/dev-info";
import { VerificationWall } from "@/components/verification-wall";
import { Eruda } from "@/components/eruda";

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
  themeColor: "#191919",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Eruda />
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
