import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

interface WalletMultiButtonStyledProps {
  primaryColor: Boolean;
}

interface ConnectWalletButtonProps {
  primaryColor: Boolean;
}

const WalletButton = styled(WalletMultiButton)<WalletMultiButtonStyledProps>`
  max-height: 3vmax;
  background-color: ${(props) => (props.primaryColor ? "#5B6876" : "#A0C024")};
  line-height: 0 !important;
  padding: 1vmin 1.5vmax;
`;

const ConnectWalletButton = ({ primaryColor }: ConnectWalletButtonProps) => {
  return (
    <WalletButton primaryColor={primaryColor}>
      <Typography>Connect your wallet!</Typography>
    </WalletButton>
  );
};

export default ConnectWalletButton;
