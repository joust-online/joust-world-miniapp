"use client";

import { MiniKitProvider } from "@worldcoin/minikit-js/minikit-provider";
import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider, createConfig, http } from "wagmi";
import { worldchain } from "wagmi/chains";

const queryClient = new QueryClient();

const wagmiConfig = createConfig({
  chains: [worldchain],
  transports: {
    [worldchain.id]: http(),
  },
});

export function Providers({ children }: { children: ReactNode }) {
  return (
    <MiniKitProvider>
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      </WagmiProvider>
    </MiniKitProvider>
  );
}
