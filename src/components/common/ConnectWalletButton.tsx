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
import { getUserByWallet } from "lib/firebase/firestore/users/getUsers";

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
  padding: 1vmin 1.5vmax;
`;

const ConnectWalletButton = ({
  primaryColor,
  blackText = false,
}: ConnectWalletButtonProps) => {
  const { publicKey } = useWallet();
  const [_, setWallet] = useAtom(currentWallet);
  const [__, setCurrentUser] = useAtom(currentUser);
  const [___, setLoadingUser] = useAtom(isLoadingUser);
  const [____, setUserHasNoWallet] = useAtom(userHasNoID);

  const getUserByWalletOrRemoveUser =
    React.useCallback(async (): Promise<void> => {
      if (publicKey) {
        setUserHasNoWallet(false);
        setWallet(publicKey.toString());
        const user = await getUserByWallet(publicKey.toString());
        setLoadingUser(true);

        if (Object.keys(user).length === 0) {
          setUserHasNoWallet(true);
        }

        setLoadingUser(false);
        setCurrentUser(user);
        return;
      }

      setWallet("");
      setCurrentUser({} as User);
      setUserHasNoWallet(false);
    }, [publicKey]);

  React.useEffect(() => {
    getUserByWalletOrRemoveUser();
  }, [publicKey]);

  return (
    <WalletButton primaryColor={primaryColor}>
      <Typography sx={{ color: blackText ? "#000" : "#fff" }}>
        {publicKey
          ? walletAddressShortener(publicKey?.toString())
          : "Connect your wallet!"}
      </Typography>
    </WalletButton>
  );
};

export default ConnectWalletButton;
