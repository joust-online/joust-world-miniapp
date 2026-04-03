import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import { Providers } from "@/components/providers";
import { DevInfo } from "@/components/dev-info";

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
        {process.env.NODE_ENV === "development" && (
          <Script
            src="https://cdn.jsdelivr.net/npm/eruda"
            strategy="afterInteractive"
            onLoad={() => {
              // @ts-expect-error eruda global
              if (window.eruda) window.eruda.init();
            }}
          />
        )}
        <Providers>
          {children}
          <DevInfo />
        </Providers>
      </body>
    </html>
  );
}
