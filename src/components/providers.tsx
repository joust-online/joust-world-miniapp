"use client";

import { MiniKitProvider } from "@worldcoin/minikit-js/minikit-provider";
import { ReactNode, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider, createConfig, http } from "wagmi";
import { worldchain } from "wagmi/chains";

const wagmiConfig = createConfig({
  chains: [worldchain],
  transports: {
    [worldchain.id]: http(),
  },
});

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <MiniKitProvider>
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      </WagmiProvider>
    </MiniKitProvider>
  );
}
