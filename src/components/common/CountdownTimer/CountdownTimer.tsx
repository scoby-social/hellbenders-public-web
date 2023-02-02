import { Box, Typography } from "@mui/material";
import useCountdownTimer from "lib/hooks/useCountdownTimer";
import * as React from "react";

import { countdownContainer, timerContainer, timerWrapper } from "./styles";

const CountdownTimer = () => {
  const deadline = "Feb 24 2023 4:00 PM EST";
  const { days, hours, minutes, seconds } = useCountdownTimer(deadline);

  return (
    <Box sx={countdownContainer}>
      <Typography>{`Hellbenders DAO or DIE minting starts in`}</Typography>
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
