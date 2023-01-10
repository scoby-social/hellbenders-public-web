import { Box, Button, CircularProgress, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import * as React from "react";
import { useAtom } from "jotai";

import {
  allStepLayers,
  combinedLayers,
  layerType,
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
  layerBuilderWrapper,
  layersActionButtonsContainer,
  layersActionbuttonsWrapper,
  layersContainer,
  marginTopButton,
} from "./styles";
import {
  getIterableSteps,
  getStepLabel,
  getStepLayerArticle,
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
  const [__, setAllCombinedLayers] = useAtom(combinedLayers);
  const [___, setSelectedLayerPerStep] = useAtom(selectedLayerPerStep);
  const [allLayers] = useAtom(allStepLayers);
  const [selectedLayerType] = useAtom(layerType);

  const [disabledButtons, setDisabledButtons] = React.useState(false);

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
    setDisabledButtons(false);
    changeStep(currentStep - 1);
  }, [currentStep, changeStep, setStepsRendered]);

  const goToNextStep = React.useCallback(() => {
    if (currentStep === maxStepNumber) {
      setDisabledButtons(true);
      return;
    }
    changeStep(currentStep + 1);
  }, [changeStep, currentStep, maxStepNumber]);

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

  const skipLayer = React.useCallback(() => {
    setAllCombinedLayers((prev) => {
      const newLayers = [...prev];
      newLayers[newLayers.length - 1].skipped = true;

      return newLayers;
    });
    setSelectedLayerPerStep((prev) => {
      const newLayers = [...prev];
      newLayers[newLayers.length - 1].skipped = true;

      return newLayers;
    });
    goToNextStep();
  }, [goToNextStep, setAllCombinedLayers, setSelectedLayerPerStep]);

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
          <Box sx={actionButtonsWrapper}>
            <Button
              disabled={processingMerge || disabledButtons}
              onClick={goToNextStep}
              variant="contained"
            >
              {processingMerge ? (
                <CircularProgress size={20} color="secondary" />
              ) : (
                `Choose this ${getStepLabel(selectedLayerType)}`
              )}
            </Button>
            {currentStep > 1 && (
              <Button
                sx={marginTopButton}
                disabled={processingMerge || disabledButtons}
                onClick={skipLayer}
                variant="outlined"
              >
                {processingMerge ? (
                  <CircularProgress size={20} color="secondary" />
                ) : (
                  `Don't add ${getStepLayerArticle(
                    selectedLayerType
                  )} ${getStepLabel(selectedLayerType)}`
                )}
              </Button>
            )}
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
