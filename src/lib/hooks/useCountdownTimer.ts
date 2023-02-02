import * as React from "react";

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

const useCountdownTimer = (deadline: string) => {
  const parsedDeadline = React.useMemo(
    () => new Date(deadline).getTime(),
    [deadline]
  );
  const [time, setTime] = React.useState(parsedDeadline - Date.now());

  React.useEffect(() => {
    const interval = setInterval(
      () => setTime(parsedDeadline - Date.now()),
      1000
    );

    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, [deadline]);

  return {
    days: Math.floor(time / DAY),
    hours: Math.floor((time / HOUR) % 24),
    minutes: Math.floor((time / MINUTE) % 60),
    seconds: Math.floor((time / SECOND) % 60),
  };
};

export default useCountdownTimer;
