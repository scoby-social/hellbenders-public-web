import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";

import useCheckMobileScreen from "lib/hooks/useCheckMobileScreen";

import {
  button,
  groupCardContainer,
  groupCardContent,
  groupCardTitle,
  imageAndButtonWrapper,
  supplyItem,
  supplyWrapper,
} from "./styles";
import { DODGroupCardProps } from "./types";
import CountdownTimer from "components/common/CountdownTimer/CountdownTimer";

const DODGroupCard = ({
  title,
  supply,
  tokensMinted,
  imageURL,
  available,
  totalOwned,
}: DODGroupCardProps) => {
  const isMobile = useCheckMobileScreen();

  const getButtonLabel = () => {
    if (available) return "Mint now!";
    return "Not Available";
  };

  return (
    <Box sx={groupCardContainer(false)}>
      <Box sx={groupCardTitle(available)}>
        <Typography variant="h6">{`${title} minting begins in`}</Typography>
      </Box>
      <Box sx={groupCardContent}>
        <CountdownTimer />
        <Box sx={imageAndButtonWrapper}>
          <Image
            src={imageURL}
            width={isMobile ? 35 : 130}
            height={isMobile ? 35 : 130}
            alt={title}
          />
          <Button variant="contained" disabled={!available} sx={button}>
            {getButtonLabel()}
          </Button>
        </Box>
        <Box sx={supplyWrapper}>
          <Box sx={supplyItem}>
            <Typography variant="subtitle2">{`Minted`}</Typography>
            <Typography variant="h2">{tokensMinted}</Typography>
          </Box>
          <Box sx={supplyItem}>
            <Typography variant="subtitle2">{`Supply`}</Typography>
            <Typography variant="h2">{supply}</Typography>
          </Box>
          <Box sx={supplyItem}>
            <Typography variant="subtitle2">{`Total Spawn`}</Typography>
            <Typography variant="h2">{totalOwned}</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default DODGroupCard;
