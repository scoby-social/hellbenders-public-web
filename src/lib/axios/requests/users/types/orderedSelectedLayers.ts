import { LayerType } from "lib/models/layer";

export interface OrderedSelectedLayers {
  selectedLayers: SimpleLayer[];
  name: string;
}

interface SimpleLayer {
  type: LayerType;
  name: string;
}
