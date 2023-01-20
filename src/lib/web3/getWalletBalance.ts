import { getAssociatedTokenAddress } from "@solana/spl-token";
import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { GetWalletBalanceReturnType } from "./types/getWalletBalanceReturnType";

export async function getWalletBalance(
  wallet: string
): Promise<GetWalletBalanceReturnType> {
  const conn = new Connection(process.env.NEXT_PUBLIC_SOLANA_CLUSTER!);
  const usdcToken = new PublicKey(process.env.NEXT_PUBLIC_USDC_TOKEN_ADDRESS!);

  const usdcTokenAccount = await getAssociatedTokenAddress(
    usdcToken,
    new PublicKey(wallet)
  );

  const solBalance = await conn.getBalance(new PublicKey(wallet));

  try {
    const tokenAmount = await conn.getTokenAccountBalance(usdcTokenAccount);

    return {
      sol: solBalance / LAMPORTS_PER_SOL,
      usdc: tokenAmount.value.uiAmount || 0,
    };
  } catch (error) {
    return {
      sol: solBalance / LAMPORTS_PER_SOL,
      usdc: 0,
    };
  }
}
