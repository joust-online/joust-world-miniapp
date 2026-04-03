import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Joust",
    short_name: "Joust",
    description: "Prediction markets powered by World ID",
    start_url: "/",
    display: "standalone",
    background_color: "#191919",
    theme_color: "#191919",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
