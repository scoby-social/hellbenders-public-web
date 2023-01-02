export enum LayerType {
  ACCESORY = "ACCESORY",
  BACKGROUND = "BACKGROUND",
  BEARD = "BEARD",
  EYE = "EYE",
  HAT = "HAT",
  HAIR = "HAIR",
  HELMET = "HELMET",
  LASERS = "LASERS",
  MASK = "MASK",
  MOUTH = "MOUTH",
  MEN_BODY = "MEN_BODY",
  MEN_SHIRT = "MEN_SHIRT",
  MEN_JACKET = "MEN_JACKET",
  WOMEN_BODY = "WOMEN_BODY",
  WOMEN_TOP = "WOMEN_TOP",
  WOMEN_JACKET = "WOMEN_JACKET",
}

export interface LayerException {
  name: string;
  type: LayerType;
  exceptions: Exception[];
}

export interface Exception {
  type: LayerType;
  items: string[] | "*";
  reverse: boolean;
}

export interface Layer {
  image: string;
  name: string;
  type: LayerType;
  exceptions: Exception[];
}
