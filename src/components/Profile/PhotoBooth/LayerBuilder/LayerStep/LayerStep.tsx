import { Box, Typography } from "@mui/material";
import * as React from "react";
import { useAtom } from "jotai";
import Image from "next/image";

import {
  allStepLayers,
  combinedLayers,
  layerType,
  mergeInProcess,
  photoBoothStep,
  renderedSteps,
  selectedBodyType,
  selectedLayerIndexPerStep,
  selectedLayerPerStep,
} from "lib/store";
import useCheckMobileScreen from "lib/hooks/useCheckMobileScreen";

import { getLayersForCurrentStep } from "../utils/getLayersForCurrentStep";
import { scrollPhotoBoothLayers } from "../utils/scrollPhotoBoothLayer";
import {
  captionTextColor,
  layerWrapper,
  layerExceptionCaption,
  imageWrapper,
  imageStyle,
  layerCropSquare,
} from "./styles";
import { LayerStepProps } from "./types";
import { LayerInBuilder } from "../types";

const LayerStep = ({ step }: LayerStepProps) => {
  const isMobile = useCheckMobileScreen();
  const [currentStep] = useAtom(photoBoothStep);
  const [selectedLayersOnStep, setSelectedLayerOnStep] =
    useAtom(selectedLayerPerStep);
  const [allCombinedLayers, setAllCombinedLayers] = useAtom(combinedLayers);
  const [selectedLayerIdx] = useAtom(selectedLayerIndexPerStep);
  const [__, setAllStepLayers] = useAtom(allStepLayers);
  const [___, setProcessingMerge] = useAtom(mergeInProcess);
  const [____, setSelectedLayerType] = useAtom(layerType);
  const [bodyType, setBodyType] = useAtom(selectedBodyType);
  const [stepsRendered, setStepsRendered] = useAtom(renderedSteps);

  const [allLayers, setAllLayers] = React.useState<LayerInBuilder[]>([]);
  const [visibleLayers, setVisibleLayers] = React.useState<LayerInBuilder[]>(
    []
  );

  const addLayerToSelectedOne = React.useCallback(
    (combinedLayer: LayerInBuilder, stepLayer: LayerInBuilder) => {
      if (currentStep === step) {
        if (step === 1) {
          if (stepLayer.type.includes("FEMALE")) {
            setBodyType(1);
          } else if (stepLayer.type.includes("MALE")) {
            setBodyType(0);
          }
        }

        const selectedType = stepLayer.type;
        setSelectedLayerType(selectedType);

        setSelectedLayerOnStep((prevLayers) => {
          const newLayers = [...prevLayers];
          if (!newLayers[currentStep]) newLayers.push(stepLayer);
          else newLayers[currentStep] = stepLayer;

          return newLayers;
        });

        setAllCombinedLayers((prevLayers) => {
          const newLayers = [...prevLayers];
          if (!newLayers[currentStep]) newLayers.push(combinedLayer);
          else newLayers[currentStep] = combinedLayer;

          return newLayers;
        });
      }
    },
    // eslint-disable-next-line
    [currentStep, step]
  );

  const reverseLayerInStepByKey = React.useCallback((key: string | null) => {
    if (key) {
      setSelectedLayerOnStep((prev) => {
        return [...prev].map((val) => {
          if (val.key === key) return { ...val, reverse: true };

          return val;
        });
      });
    }
    // eslint-disable-next-line
  }, []);

  const getLayers = React.useCallback(async () => {
    setProcessingMerge(true);
    const {
      layersToShow,
      completeLayers,
      combinedLayer,
      stepLayer,
      reversedKey,
    } = await getLayersForCurrentStep({
      diff: isMobile ? 1 : 2,
      currentStep,
      layersToCombine: allCombinedLayers,
      step,
      selectedLayersOnStep,
      bodyType,
    });

    setProcessingMerge(false);
    reverseLayerInStepByKey(reversedKey);
    setAllLayers(completeLayers);
    setAllStepLayers(completeLayers);
    setVisibleLayers(layersToShow);
    addLayerToSelectedOne(combinedLayer, stepLayer);

    // eslint-disable-next-line
  }, [
    currentStep,
    isMobile,
    selectedLayersOnStep,
    allCombinedLayers,
    selectedLayerIdx,
    bodyType,
  ]);

  const scrollLayers = React.useCallback(async () => {
    if (currentStep === step) {
      const { layersToShow, combinedLayer, stepLayer, reversedKey } =
        await scrollPhotoBoothLayers({
          diff: isMobile ? 1 : 2,
          layerIndex: selectedLayerIdx[step],
          allStepLayers: allLayers,
          layersToCombine: allCombinedLayers,
          step,
          selectedLayersOnStep,
        });

      reverseLayerInStepByKey(reversedKey);
      addLayerToSelectedOne(combinedLayer, stepLayer);
      setProcessingMerge(false);
      setVisibleLayers(layersToShow);
    }
    // eslint-disable-next-line
  }, [
    currentStep,
    step,
    isMobile,
    selectedLayerIdx,
    allLayers,
    allCombinedLayers,
    selectedLayersOnStep,
  ]);

  /*------------------------------*/

  // Scrolls the Layers carousel when the layer index is changed
  // on arrow buttons press
  React.useEffect(() => {
    if (visibleLayers.length > 0) {
      scrollLayers();
    }
    // eslint-disable-next-line
  }, [selectedLayerIdx]);

  // Checks if this layer step is the same as the current step
  // and also if this step has been rendered in order to fetch the layers and mark it as rendered
  React.useEffect(() => {
    if (currentStep === step && !stepsRendered[step]) {
      setStepsRendered((prev) => {
        const newSteps = [...prev];
        newSteps[step] = true;
        return newSteps;
      });
      getLayers();
    }

    // eslint-disable-next-line
  }, [currentStep]);

  // Clear the state when this step is unmounted (User clicked the Go Back button)
  React.useEffect(() => {
    if (!stepsRendered[step]) {
      setAllLayers([]);
      setVisibleLayers([]);
    }
    // eslint-disable-next-line
  }, [stepsRendered]);

  React.useEffect(() => {
    if (visibleLayers.length > 0) {
      scrollLayers();
    }
    // eslint-disable-next-line
  }, [isMobile]);

  // Fills the store allStepLayers with all the layers of the current step
  // in order to be used in the parent component to scroll the carousel
  React.useEffect(() => {
    if (allLayers.length > 0 && step === currentStep) {
      setAllStepLayers(allLayers);

      setAllCombinedLayers((prev) => {
        const newLayers = [...prev];
        newLayers[newLayers.length - 1].skipped = false;

        return newLayers;
      });
    }
    // eslint-disable-next-line
  }, [currentStep, allLayers]);

  /*------------------------------*/

  if (currentStep !== step) return <></>;

  return (
    <>
      {visibleLayers.map((layer) => (
        <Box key={layer.key} sx={layerWrapper}>
          <Box sx={imageWrapper(layer.selected)}>
            {layer.selected && currentStep > 0 && <Box sx={layerCropSquare} />}
            <Image
              key={`${layer.index}-${layer.name}`}
              alt={layer.name}
              src={layer.image}
              fill
              style={imageStyle}
            />
          </Box>
          <Typography sx={captionTextColor} variant="caption">
            {layer.name.split(".")[0]}
          </Typography>
          <Typography sx={layerExceptionCaption} variant="caption">
            {layer.exception}
          </Typography>
        </Box>
      ))}
    </>
  );
};

export default LayerStep;
