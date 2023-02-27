import { Box, Typography } from "@mui/material";
import {
  boldText,
  defaultInfoContainer,
  discountInfoContainer,
  highlightText,
  infoWrapper,
  titleText,
} from "./styles";
import { FooterCardInfoProps } from "./types";

const FooterCardInfo = ({
  discount,
  available,
  tokenName,
  hasFakeIDDiscount,
}: FooterCardInfoProps) => {
  if (!available) {
    return (
      <Box sx={defaultInfoContainer}>
        <Typography variant="subtitle2">{`${tokenName} Holders only`}</Typography>
      </Box>
    );
  }

  if (discount && available) {
    const totalDiscount = hasFakeIDDiscount ? discount * 2 : discount;
    const discountAmount = totalDiscount / 100;
    const discountPrice = 6.66 * discountAmount;
    const resultingPrice = 6.66 - discountPrice;

    return (
      <Box sx={discountInfoContainer}>
        <Box sx={infoWrapper}>
          <Typography
            sx={titleText}
            variant="caption"
          >{`Original Mint Price`}</Typography>
          <Typography sx={boldText} variant="caption">{`Price`}</Typography>
          <Typography sx={boldText} variant="caption">{`6.66 SOL`}</Typography>
        </Box>
        <Box sx={infoWrapper}>
          <Typography sx={titleText} variant="caption">{`Discount`}</Typography>
          <Typography variant="caption">{`${tokenName}: ${discount}%`}</Typography>
          {hasFakeIDDiscount && (
            <Typography variant="caption">{`Fake ID: 2x`}</Typography>
          )}
          <Typography
            sx={boldText}
            variant="caption"
          >{`Total Discount: ${totalDiscount}%`}</Typography>
        </Box>
        <Box sx={infoWrapper}>
          <Typography
            sx={titleText}
            variant="caption"
          >{`New Mint Price`}</Typography>
          <Typography sx={highlightText} variant="caption">{`Now!`}</Typography>
          <Typography
            sx={highlightText}
            variant="caption"
          >{`${resultingPrice.toFixed(4)} SOL`}</Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={defaultInfoContainer}>
      <Typography variant="subtitle2">{`Mint Price`}</Typography>
      <Typography variant="subtitle2">{`6.66 SOL`}</Typography>
    </Box>
  );
};

export default FooterCardInfo;
