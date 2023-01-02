import { Box, Typography } from "@mui/material";
import * as React from "react";
import { useAtom } from "jotai";
import Image from "next/image";

import {
  allStepLayers,
  combinedLayers,
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
  imageWrapper,
  layerExceptionCaption,
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
          if (stepLayer.type.includes("WOMEN")) {
            setBodyType(1);
          } else if (stepLayer.type.includes("MEN")) {
            setBodyType(0);
          }
        }

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
    [
      currentStep,
      setAllCombinedLayers,
      setBodyType,
      setSelectedLayerOnStep,
      step,
    ]
  );

  const getLayers = React.useCallback(async () => {
    setProcessingMerge(true);
    const { layersToShow, completeLayers, combinedLayer, stepLayer } =
      await getLayersForCurrentStep(
        isMobile ? 1 : 2,
        currentStep,
        selectedLayerIdx[step],
        allCombinedLayers,
        step,
        selectedLayersOnStep,
        bodyType
      );
    setProcessingMerge(false);

    setAllLayers(completeLayers);
    setAllStepLayers(completeLayers);
    setVisibleLayers(layersToShow);
    addLayerToSelectedOne(combinedLayer, stepLayer);

    // eslint-disable-next-line
  }, [currentStep, isMobile]);

  const scrollLayers = React.useCallback(async () => {
    if (currentStep === step) {
      const { layersToShow, combinedLayer, stepLayer } =
        await scrollPhotoBoothLayers(
          isMobile ? 1 : 2,
          selectedLayerIdx[step],
          allLayers,
          allCombinedLayers,
          step,
          selectedLayersOnStep
        );

      addLayerToSelectedOne(combinedLayer, stepLayer);

      setProcessingMerge(false);

      setVisibleLayers(layersToShow);
    }
  }, [
    currentStep,
    step,
    isMobile,
    selectedLayerIdx,
    allLayers,
    allCombinedLayers,
    selectedLayersOnStep,
    addLayerToSelectedOne,
    setProcessingMerge,
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
      // setAllCombinedLayers((prevLayers) => {
      // const newLayers = [...prevLayers].slice(0, -1);

      // return newLayers;
      // });
      // setSelectedLayerOnStep((prevLayers) => {
      // const newLayers = [...prevLayers].slice(0, -1);

      // return newLayers;
      // });
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
    }
    // eslint-disable-next-line
  }, [currentStep, allLayers]);

  /*------------------------------*/

  if (currentStep !== step) return <></>;

  return (
    <>
      {visibleLayers.map((layer) => (
        <Box key={layer.key} sx={imageWrapper}>
          <Image
            width={layer.selected ? 250 : 150}
            height={layer.selected ? 250 : 150}
            key={`${layer.index}-${layer.name}`}
            alt={layer.name}
            src={layer.image}
          />
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
