export const walletAddressShortener = (address: string, length = 4): string =>
  `${address?.slice(0, length)}....${address?.slice(-length)}`;
