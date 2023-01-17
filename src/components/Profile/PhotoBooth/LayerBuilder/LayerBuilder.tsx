import { Box, Button, CircularProgress, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import * as React from "react";
import Image from "next/image";
import { useAtom } from "jotai";

import {
  allStepLayers,
  combinedLayers,
  finalCroppedImage,
  mergeInProcess,
  photoBoothStep,
  renderedSteps,
  selectedLayerIndexPerStep,
  selectedLayerPerStep,
} from "lib/store";

import {
  actionButtonsWrapper,
  arrowIcons,
  arrowWrapper,
  imageStyle,
  imageWrapper,
  layerBuilderWrapper,
  layersActionButtonsContainer,
  layersActionbuttonsWrapper,
  layersContainer,
  layerWrapper,
} from "./styles";
import { getIterableSteps, getStepsLength } from "../utils/getSteps";
import LayerStep from "./LayerStep/LayerStep";
import { cropImage } from "./utils/cropImage";

const LayerBuilder = () => {
  const maxStepNumber = getStepsLength();
  const [currentStep, setCurrentStep] = useAtom(photoBoothStep);
  const [processingMerge, setProcessingMerge] = useAtom(mergeInProcess);
  const [selectedLayerIdxPerStep, setSelectedLayerIdxPerStep] = useAtom(
    selectedLayerIndexPerStep
  );
  const [_, setStepsRendered] = useAtom(renderedSteps);
  const [allCombinedLayers, setAllCombinedLayers] = useAtom(combinedLayers);
  const [selectedLayerOnStep, setSelectedLayerOnStep] =
    useAtom(selectedLayerPerStep);
  const [allLayers] = useAtom(allStepLayers);
  const [croppedImage, setCroppedImage] = useAtom(finalCroppedImage);

  const [disabledButtons, setDisabledButtons] = React.useState(false);

  const selectedLayer = selectedLayerIdxPerStep[currentStep];

  const changeStep = React.useCallback(
    (step: number) => {
      if (step < 0) return;

      setCurrentStep(step);
    },
    [setCurrentStep]
  );

  const returnOneStep = React.useCallback(() => {
    setStepsRendered((prev) => {
      const newSteps = [...prev];
      newSteps[currentStep] = false;
      return newSteps;
    });

    setDisabledButtons(false);

    setSelectedLayerOnStep((prevLayers) => {
      return [...prevLayers].slice(0, -1);
    });

    setAllCombinedLayers((prevLayers) => {
      return [...prevLayers].slice(0, -1);
    });

    setSelectedLayerIdxPerStep((prev) => {
      const newValues = [...prev];
      newValues[currentStep] = 0;
      return newValues;
    });

    changeStep(currentStep - 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStep, changeStep, allStepLayers, selectedLayerOnStep]);

  const goToNextStep = React.useCallback(() => {
    changeStep(currentStep + 1);
  }, [changeStep, currentStep]);

  const scrollLayers = React.useCallback(
    (index: number) => {
      const layerIndex = index < 0 ? allLayers.length + index : index;

      setProcessingMerge(true);
      setSelectedLayerIdxPerStep((prevLayerIdx) => {
        const newLayerIdx = [...prevLayerIdx];
        newLayerIdx[currentStep] = layerIndex;
        return newLayerIdx;
      });
    },
    [currentStep, setProcessingMerge, setSelectedLayerIdxPerStep, allLayers]
  );

  React.useEffect(() => {
    if (currentStep > maxStepNumber) {
      (async () => {
        const image = await cropImage(allCombinedLayers[maxStepNumber].image);
        setCroppedImage(image);
      })();
    }
    // eslint-disable-next-line
  }, [currentStep]);

  return (
    <Box sx={layerBuilderWrapper}>
      <Box sx={layersContainer}>
        {getIterableSteps().map((val) => (
          <LayerStep key={val} step={val} />
        ))}
        {currentStep > maxStepNumber && croppedImage && (
          <Box sx={layerWrapper}>
            <Box sx={imageWrapper}>
              <Image
                alt={allCombinedLayers[maxStepNumber].name}
                src={croppedImage}
                fill
                style={imageStyle}
              />
            </Box>
          </Box>
        )}
      </Box>
      <Box sx={layersActionButtonsContainer}>
        {currentStep <= maxStepNumber && (
          <Box sx={layersActionbuttonsWrapper}>
            <Box sx={arrowWrapper}>
              <IconButton
                disabled={processingMerge || disabledButtons}
                onClick={() => scrollLayers(selectedLayer - 1)}
              >
                {processingMerge ? (
                  <CircularProgress size={20} />
                ) : (
                  <ArrowBackIcon sx={arrowIcons} />
                )}
              </IconButton>
            </Box>
            <Box sx={arrowWrapper}>
              <IconButton
                disabled={processingMerge || disabledButtons}
                onClick={() =>
                  scrollLayers((selectedLayer + 1) % allLayers.length)
                }
              >
                {processingMerge ? (
                  <CircularProgress size={20} />
                ) : (
                  <ArrowForwardIcon sx={arrowIcons} />
                )}
              </IconButton>
            </Box>
          </Box>
        )}
      </Box>
      <Box sx={actionButtonsWrapper}>
        <Button
          onClick={returnOneStep}
          disabled={currentStep === 0 || processingMerge}
          variant="contained"
          color="secondary"
        >
          Go Back
        </Button>
        {currentStep <= maxStepNumber && (
          <Button
            disabled={processingMerge}
            onClick={goToNextStep}
            variant="contained"
            color="secondary"
          >
            {processingMerge ? (
              <CircularProgress size={20} color="primary" />
            ) : (
              "Next Trait"
            )}
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default LayerBuilder;
