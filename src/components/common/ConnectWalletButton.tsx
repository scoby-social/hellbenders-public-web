/* eslint-disable react-hooks/exhaustive-deps */
import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import * as React from "react";
import { useAtom } from "jotai";

import { walletAddressShortener } from "lib/helpers/walletAddressShortener";
import {
  currentUser,
  currentWallet,
  isLoadingUser,
  userHasNoID,
} from "lib/store";
import { User } from "lib/models/user";
import { getOldestFakeIDInWallet } from "lib/web3/getOldestFakeIDInWallet";
import { getUserByFakeID } from "lib/axios/requests/users/getUserByFakeID";

interface WalletMultiButtonStyledProps {
  primaryColor: Boolean;
}

interface ConnectWalletButtonProps {
  primaryColor: Boolean;
  blackText?: Boolean;
}

const WalletButton = styled(WalletMultiButton)<WalletMultiButtonStyledProps>`
  max-height: 3vmax;
  background-color: ${(props) =>
    props.primaryColor ? "rgba(190, 239, 0, 1)" : "#5B6876"};
  line-height: 0 !important;
  padding: 1vmin 1vmax;
  border-radius: 8px;
`;

const ConnectWalletButton = ({
  primaryColor,
  blackText = false,
}: ConnectWalletButtonProps) => {
  const { publicKey } = useWallet();
  const [_, setWallet] = useAtom(currentWallet);
  const [__, setCurrentUser] = useAtom(currentUser);
  const [___, setLoadingUser] = useAtom(isLoadingUser);
  const [____, setUserHasNoID] = useAtom(userHasNoID);

  const getUserByWalletOrRemoveUser =
    React.useCallback(async (): Promise<void> => {
      if (publicKey) {
        setLoadingUser(true);
        setWallet(publicKey.toString());

        const walletFakeID = await getOldestFakeIDInWallet(publicKey);

        if (!walletFakeID) {
          setUserHasNoID(true);
          return;
        }

        const user = await getUserByFakeID(walletFakeID.mintAddress.toString());

        if (Object.keys(user).length === 0) {
          setUserHasNoID(true);
        } else {
          setUserHasNoID(false);
        }

        setLoadingUser(false);
        setCurrentUser(user);
        return;
      }

      setLoadingUser(false);
      setWallet("");
      setCurrentUser({} as User);
      setUserHasNoID(false);
    }, [publicKey]);

  React.useEffect(() => {
    getUserByWalletOrRemoveUser();
  }, [publicKey]);

  return (
    <WalletButton primaryColor={primaryColor}>
      <Typography sx={{ color: blackText ? "#000" : "#fff" }}>
        {publicKey
          ? walletAddressShortener(publicKey?.toString())
          : "Connect Wallet"}
      </Typography>
    </WalletButton>
  );
};

export default ConnectWalletButton;
