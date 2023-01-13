export enum LayerType {
  ACCESORY = "ACCESORY",
  BACKGROUND = "BACKGROUND",
  BEARD = "BEARD",
  EYES = "EYES",
  HAT = "HAT",
  HAIR = "HAIR",
  HELMET = "HELMET",
  LASERS = "LASERS",
  MASK = "MASK",
  MOUTH = "MOUTH",
  MALE_BODY = "MALE_BODY",
  MALE_SHIRT = "MALE_SHIRT",
  MALE_JACKET = "MALE_JACKET",
  FEMALE_BODY = "FEMALE_BODY",
  FEMALE_TOP = "FEMALE_TOP",
  FEMALE_JACKET = "FEMALE_JACKET",
}

export interface LayerException {
  name: string;
  type: LayerType;
  exceptions: Exception[];
}

export interface Exception {
  type: LayerType | "*";
  items: string[] | "*";
  reverse: boolean;
}

export interface Layer {
  image: string;
  name: string;
  type: LayerType;
  exceptions: Exception[];
}
