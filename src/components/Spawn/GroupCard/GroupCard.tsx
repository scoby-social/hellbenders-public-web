import { Box, Button, Typography } from "@mui/material";
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
}: GroupCardProps) => {
  const isMobile = useCheckMobileScreen();

  const getButtonLabel = () => {
    if (soldOut) return "Sold out!";
    if (available) return "Mint now!";
    return "Not Available";
  };

  const getButtonColor = () => {
    if (soldOut) return "secondary";
    return "primary";
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
            disabled={soldOut || !available}
            color={getButtonColor()}
            sx={button}
          >
            {getButtonLabel()}
          </Button>
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
