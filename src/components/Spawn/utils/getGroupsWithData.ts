import { checkIfUserHasRedlistTokens } from "lib/web3/spawn/checkIfUserHasRedlistToken";
import { getSpawnMintedCount } from "lib/web3/spawn/getSpawnSupply";
import { Groups } from "./types";

export async function getGroupsWithData(
  wallet: any,
  hasFakeID: boolean
): Promise<Groups> {
  const { legendary, gold, steel, black } = await checkIfUserHasRedlistTokens(
    wallet
  );

  const counts = await getSpawnMintedCount(wallet);

  const groups = {
    legendary: {
      title: "Group 1: Legendary",
      highlight: !!legendary,
      supply: counts.legendary,
      tokensMinted: counts.legendary,
      imageURL:
        "https://shdw-drive.genesysgo.net/GUbAgSbgsg35ddrGN8vCuNBZ4tvEtZDmPasRL4hTTwVJ/0.png",
      soldOut: true,
      available: !!legendary,
      discount: 50,
      tokenName: "Legendary",
      hasFakeIDDiscount: false,
      redlist: legendary,
    },
    gold: {
      title: "Group 2: Redlist Gold",
      highlight: !!gold,
      supply: counts.gold,
      tokensMinted: counts.gold,
      imageURL:
        "https://shdw-drive.genesysgo.net/GUbAgSbgsg35ddrGN8vCuNBZ4tvEtZDmPasRL4hTTwVJ/1.png",
      soldOut: true,
      available: !!gold,
      discount: 20,
      tokenName: "Redlist Gold",
      hasFakeIDDiscount: hasFakeID,
      redlist: gold,
    },
    steel: {
      title: "Group 3: Redlist Steel",
      highlight: !!steel,
      supply: counts.steel,
      tokensMinted: counts.steel,
      imageURL:
        "https://shdw-drive.genesysgo.net/GUbAgSbgsg35ddrGN8vCuNBZ4tvEtZDmPasRL4hTTwVJ/2.png",
      soldOut: true,
      available: !!steel,
      discount: 15,
      tokenName: "Redlist Steel",
      hasFakeIDDiscount: hasFakeID,
      redlist: steel,
    },
    black: {
      title: "Group 4: Redlist Black",
      highlight: !!black,
      supply: counts.black,
      tokensMinted: counts.black,
      imageURL:
        "https://shdw-drive.genesysgo.net/GUbAgSbgsg35ddrGN8vCuNBZ4tvEtZDmPasRL4hTTwVJ/3.png",
      soldOut: true,
      available: !!black,
      discount: 10,
      tokenName: "Redlist Black",
      hasFakeIDDiscount: hasFakeID,
      redlist: black,
    },
    fake: {
      title: "Group 5: Fake ID Holders",
      highlight: hasFakeID,
      supply: counts.fake,
      tokensMinted: counts.fake,
      imageURL:
        "https://shdw-drive.genesysgo.net/GUbAgSbgsg35ddrGN8vCuNBZ4tvEtZDmPasRL4hTTwVJ/4.png",
      soldOut: true,
      available: hasFakeID,
      discount: 10,
      tokenName: "Fake ID",
      hasFakeIDDiscount: false,
      redlist: null,
    },
    open: {
      title: "Group 6: Open Mint",
      highlight: true,
      supply: counts.open,
      tokensMinted: counts.open,
      imageURL:
        "https://shdw-drive.genesysgo.net/GUbAgSbgsg35ddrGN8vCuNBZ4tvEtZDmPasRL4hTTwVJ/5.png",
      soldOut: true,
      available: true,
      discount: 0,
      tokenName: "",
      hasFakeIDDiscount: false,
      redlist: null,
    },
  };

  return groups;
}
