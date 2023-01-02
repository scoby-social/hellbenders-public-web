import "../../styles/globals.css";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import { ConnectionProvider } from "@solana/wallet-adapter-react";
import { clusterApiUrl } from "@solana/web3.js";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { ThemeProvider } from "@mui/material";
import CustomTheme from "lib/theme";

export default function App({ Component, pageProps }: AppProps) {
  const network =
    process.env.NEXT_PUBLIC_SOLANA_CLUSTER === "devnet"
      ? WalletAdapterNetwork.Mainnet
      : "mainnet-beta";
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const WalletProvider = dynamic(
    () => import("../context/ClientWalletProvider"),
    {
      ssr: false,
    }
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider autoConnect>
        <ThemeProvider theme={CustomTheme()}>
          <Component {...pageProps} />
        </ThemeProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
