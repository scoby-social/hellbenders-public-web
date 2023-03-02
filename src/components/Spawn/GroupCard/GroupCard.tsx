import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { useWallet } from "@solana/wallet-adapter-react";
import * as React from "react";
import Image from "next/image";

import useCheckMobileScreen from "lib/hooks/useCheckMobileScreen";

import FooterCardInfo from "./FooterCardInfo/FooterCardInfo";
import {
  button,
  groupCardContainer,
  groupCardContent,
  groupCardTitle,
  imageAndButtonWrapper,
  supplyItem,
  supplyWrapper,
} from "./styles";
import { GroupCardProps } from "./types";
import { mintSpawn } from "lib/web3/spawn/mintSpawn";
import { getWalletBalance } from "lib/web3/common/getWalletBalance";

const GroupCard = ({
  highlight,
  title,
  supply,
  tokensMinted,
  imageURL,
  available,
  soldOut,
  discount,
  tokenName,
  hasFakeIDDiscount,
  redlist,
}: GroupCardProps) => {
  const isMobile = useCheckMobileScreen();
  const wallet = useWallet();
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState("");

  const getButtonLabel = () => {
    if (loading) return <CircularProgress />;
    if (soldOut) return "Sold out!";
    if (available) return "Mint now!";
    return "Not Available";
  };

  const getButtonColor = () => {
    if (soldOut) return "secondary";
    return "primary";
  };

  const executeMint = async () => {
    try {
      setLoading(true);

      const totalDiscount = hasFakeIDDiscount ? discount * 2 : discount;
      const discountAmount = totalDiscount / 100;
      const discountPrice = 6.66 * discountAmount;
      const resultingPrice = 6.66 - discountPrice;

      const walletBalance = await getWalletBalance(
        wallet.publicKey!.toString()
      );

      if (walletBalance.sol < resultingPrice) {
        setMessage(
          "Hey! We checked your wallet and you don't have enough crypto to mint. Come back later when you've earned some bread and try again."
        );
        setLoading(false);
        return;
      }

      setMessage("Please be patient, our machine elves are minting your Spawn");
      await mintSpawn(
        wallet,
        redlist,
        tokenName === "Fake ID" ? true : hasFakeIDDiscount
      );
      setLoading(false);
      setMessage(
        "Congrats! Your Spawn has been minted. Keep your eyes on this page to redeem your Spawn. 👀"
      );
    } catch (err) {
      setLoading(false);
      setMessage(
        "I dunno why, but the machine elves f*cked up your mint. Try again later"
      );
    }
  };

  return (
    <Box sx={groupCardContainer(highlight)}>
      <Box sx={groupCardTitle(available)}>
        <Typography variant="h6">{title}</Typography>
      </Box>
      <Box sx={groupCardContent}>
        <Box sx={supplyWrapper}>
          <Box sx={supplyItem}>
            <Typography variant="h2">{tokensMinted}</Typography>
            <Typography variant="subtitle2">{`Minted`}</Typography>
          </Box>
          <Box sx={supplyItem}>
            <Typography variant="h2">{supply}</Typography>
            <Typography variant="subtitle2">{`Supply`}</Typography>
          </Box>
        </Box>
        <Box sx={imageAndButtonWrapper}>
          <Image
            src={imageURL}
            width={isMobile ? 35 : 130}
            height={isMobile ? 35 : 130}
            alt={title}
          />
          <Button
            variant="contained"
            disabled={soldOut || !available || loading}
            color={getButtonColor()}
            onClick={executeMint}
            sx={button}
          >
            {getButtonLabel()}
          </Button>
          {message && <Typography variant="caption">{message}</Typography>}
        </Box>
        {!soldOut && (
          <FooterCardInfo
            discount={discount}
            available={available}
            tokenName={tokenName}
            hasFakeIDDiscount={hasFakeIDDiscount}
          />
        )}
      </Box>
    </Box>
  );
};

export default GroupCard;
