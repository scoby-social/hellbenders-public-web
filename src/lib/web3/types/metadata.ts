export interface Metadata {
  name: string;
  symbol: string;
  description: string;
  image: string;
  seniority: number;
  pronouns: string;
  external_link: string;
  collection_name: string;
  family_name: string;
  parent: string;
  mint_wallet: string;
  twitter_handle: string;
  discord_handle: string;
  username: string;
  birthday: string;
  time_of_birth: string;
  season: string;
}

export interface MetadataAttributes {
  trait_type: string;
  value: string;
}
