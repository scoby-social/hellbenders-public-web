import { checkIfUserHasRedlistTokens } from "lib/web3/spawn/checkIfUserHasRedlistToken";
import { getSpawnMintedCount } from "lib/web3/spawn/getSpawnSupply";
import { Group } from "./types";

export async function getGroupsWithData(
  wallet: any,
  hasFakeID: boolean
): Promise<Group[]> {
  const { legendary, gold, steel, black } = await checkIfUserHasRedlistTokens(
    wallet
  );

  const supply = {
    legendary: 103,
    gold: 103,
    steel: 103,
    black: 103,
    fake: 103,
    open: 103,
  };

  const counts = await getSpawnMintedCount(wallet);

  const groups = [
    {
      title: "Group 1: Legendary",
      highlight: !!legendary,
      supply: supply.legendary,
      tokensMinted: counts.legendary,
      imageURL:
        "https://shdw-drive.genesysgo.net/GUbAgSbgsg35ddrGN8vCuNBZ4tvEtZDmPasRL4hTTwVJ/0.png",
      soldOut: supply.legendary <= counts.legendary,
      available: !!legendary,
      discount: 50,
      tokenName: "Legendary",
      hasFakeIDDiscount: false,
      redlist: legendary,
    },
    {
      title: "Group 2: Redlist Gold",
      highlight: !!gold,
      supply: supply.gold,
      tokensMinted: counts.gold,
      imageURL:
        "https://shdw-drive.genesysgo.net/GUbAgSbgsg35ddrGN8vCuNBZ4tvEtZDmPasRL4hTTwVJ/1.png",
      soldOut: supply.gold <= counts.gold,
      available: !!gold,
      discount: 20,
      tokenName: "Redlist Gold",
      hasFakeIDDiscount: true,
      redlist: gold,
    },
    {
      title: "Group 3: Redlist Steel",
      highlight: !!steel,
      supply: supply.steel,
      tokensMinted: counts.steel,
      imageURL:
        "https://shdw-drive.genesysgo.net/GUbAgSbgsg35ddrGN8vCuNBZ4tvEtZDmPasRL4hTTwVJ/2.png",
      soldOut: supply.steel <= counts.steel,
      available: !!steel,
      discount: 15,
      tokenName: "Redlist Steel",
      hasFakeIDDiscount: true,
      redlist: steel,
    },
    {
      title: "Group 4: Redlist Black",
      highlight: !!black,
      supply: supply.black,
      tokensMinted: counts.black,
      imageURL:
        "https://shdw-drive.genesysgo.net/GUbAgSbgsg35ddrGN8vCuNBZ4tvEtZDmPasRL4hTTwVJ/3.png",
      soldOut: supply.black <= counts.black,
      available: !!black,
      discount: 10,
      tokenName: "Redlist Black",
      hasFakeIDDiscount: true,
      redlist: black,
    },
    {
      title: "Group 5: Fake ID Holders",
      highlight: false,
      supply: supply.fake,
      tokensMinted: counts.fake,
      imageURL:
        "https://shdw-drive.genesysgo.net/GUbAgSbgsg35ddrGN8vCuNBZ4tvEtZDmPasRL4hTTwVJ/4.png",
      soldOut: supply.fake <= counts.fake,
      available: hasFakeID,
      discount: 10,
      tokenName: "Fake ID",
      hasFakeIDDiscount: false,
      redlist: null,
    },
    {
      title: "Group 6: Open Mint",
      highlight: false,
      supply: supply.open,
      tokensMinted: counts.open,
      imageURL:
        "https://shdw-drive.genesysgo.net/GUbAgSbgsg35ddrGN8vCuNBZ4tvEtZDmPasRL4hTTwVJ/5.png",
      soldOut: supply.open <= counts.open,
      available: true,
      discount: 0,
      tokenName: "",
      hasFakeIDDiscount: false,
      redlist: null,
    },
  ];

  return groups;
}