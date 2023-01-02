import { Box, Button, CircularProgress, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import * as React from "react";
import { useAtom } from "jotai";

import {
  allStepLayers,
  mergeInProcess,
  photoBoothStep,
  renderedSteps,
  selectedLayerIndexPerStep,
} from "lib/store";

import {
  actionButtonsWrapper,
  arrowIcons,
  arrowWrapper,
  layerBuilderWrapper,
  layersActionButtonsContainer,
  layersActionbuttonsWrapper,
  layersContainer,
  marginTopButton,
} from "./styles";
import {
  getIterableSteps,
  getStepLabel,
  getStepsLength,
} from "../utils/getSteps";
import LayerStep from "./LayerStep/LayerStep";

const LayerBuilder = () => {
  const maxStepNumber = getStepsLength();
  const [currentStep, setCurrentStep] = useAtom(photoBoothStep);
  const [processingMerge, setProcessingMerge] = useAtom(mergeInProcess);
  const [selectedLayerIdxPerStep, setSelectedLayerIdxPerStep] = useAtom(
    selectedLayerIndexPerStep
  );
  const [_, setStepsRendered] = useAtom(renderedSteps);
  const [allLayers] = useAtom(allStepLayers);

  const selectedLayer = selectedLayerIdxPerStep[currentStep];

  const changeStep = React.useCallback(
    (step: number) => {
      if (step > maxStepNumber) return;
      if (step < 0) return;

      setCurrentStep(step);
    },
    [maxStepNumber, setCurrentStep]
  );

  const returnOneStep = React.useCallback(() => {
    setStepsRendered((prev) => {
      const newSteps = [...prev];
      newSteps[currentStep] = false;
      return newSteps;
    });
    changeStep(currentStep - 1);
  }, [currentStep, changeStep, setStepsRendered]);

  const goToNextStep = () => {
    changeStep(currentStep + 1);
  };

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

  return (
    <Box sx={layerBuilderWrapper}>
      <Box sx={layersContainer}>
        {getIterableSteps().map((val) => (
          <LayerStep key={val} step={val} />
        ))}
      </Box>
      <Box sx={layersActionButtonsContainer}>
        <Box sx={layersActionbuttonsWrapper}>
          <Box sx={arrowWrapper}>
            <IconButton
              disabled={processingMerge}
              onClick={() => scrollLayers(selectedLayer - 1)}
            >
              {processingMerge ? (
                <CircularProgress size={20} />
              ) : (
                <ArrowBackIcon sx={arrowIcons} />
              )}
            </IconButton>
          </Box>
          <Box sx={actionButtonsWrapper}>
            <Button
              disabled={processingMerge}
              onClick={goToNextStep}
              variant="contained"
            >
              {processingMerge ? (
                <CircularProgress size={20} color="secondary" />
              ) : (
                `Select ${getStepLabel(currentStep)}`
              )}
            </Button>
            {currentStep > 1 && (
              <Button
                sx={marginTopButton}
                disabled={processingMerge}
                variant="outlined"
              >
                {processingMerge ? (
                  <CircularProgress size={20} color="secondary" />
                ) : (
                  `Don't add ${getStepLabel(currentStep)}`
                )}
              </Button>
            )}
          </Box>
          <Box sx={arrowWrapper}>
            <IconButton
              disabled={processingMerge}
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
      </Box>
      <Box>
        <Button
          onClick={returnOneStep}
          disabled={currentStep === 0 || processingMerge}
          variant="contained"
          color="secondary"
        >
          Go Back
        </Button>
      </Box>
    </Box>
  );
};

export default LayerBuilder;
