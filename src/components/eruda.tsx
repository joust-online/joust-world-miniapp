"use client";

import Script from "next/script";

export function Eruda() {
  if (process.env.NODE_ENV !== "development") return null;

  return (
    <Script
      src="https://cdn.jsdelivr.net/npm/eruda"
      strategy="afterInteractive"
      onLoad={() => {
        // @ts-expect-error eruda global
        if (window.eruda) window.eruda.init();
      }}
    />
  );
}
