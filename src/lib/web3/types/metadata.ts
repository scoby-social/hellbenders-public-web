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
  recruiter: string;
  twitter_handle: string;
  discord_handle: string;
  username: string;
}

export interface MetadataAttributes {
  trait_type: string;
  value: string;
}
