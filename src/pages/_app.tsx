import "../../styles/globals.css";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { ConnectionProvider } from "@solana/wallet-adapter-react";
import { ThemeProvider } from "@mui/material";
import CustomTheme from "lib/theme";

export default function App({ Component, pageProps }: AppProps) {
  const endpoint = process.env.NEXT_PUBLIC_SOLANA_CLUSTER!;

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
