import { Box, Typography } from "@mui/material";
import useCountdownTimer from "lib/hooks/useCountdownTimer";
import * as React from "react";

import { countdownContainer, timerContainer, timerWrapper } from "./styles";

const CountdownTimer = ({ callback }: { callback?: () => void }) => {
  const deadline = "Mar 03 2023 7:33 PM UTC";
  const { days, hours, minutes, seconds } = useCountdownTimer(deadline);

  if (days <= 0 && hours <= 0 && minutes <= 0 && seconds <= 0 && callback) {
    callback();
  }

  return (
    <Box sx={countdownContainer}>
      <Box sx={timerContainer}>
        <Box sx={timerWrapper}>
          <Typography variant="h2">{days}</Typography>
          <Typography variant="body2">Days</Typography>
        </Box>
        <Typography variant="h2">:</Typography>
        <Box sx={timerWrapper}>
          <Typography variant="h2">{hours}</Typography>
          <Typography variant="body2">Hours</Typography>
        </Box>
        <Typography variant="h2">:</Typography>
        <Box sx={timerWrapper}>
          <Typography variant="h2">{minutes}</Typography>
          <Typography variant="body2">Minutes</Typography>
        </Box>
        <Typography variant="h2">:</Typography>
        <Box sx={timerWrapper}>
          <Typography variant="h2">{seconds}</Typography>
          <Typography variant="body2">Seconds</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default CountdownTimer;
