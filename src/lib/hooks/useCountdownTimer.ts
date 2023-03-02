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

  const days = Math.floor(time / DAY);
  const hours = Math.floor((time / HOUR) % 24);
  const minutes = Math.floor((time / MINUTE) % 60);
  const seconds = Math.floor((time / SECOND) % 60);

  React.useEffect(() => {
    const interval = setInterval(
      () => setTime(parsedDeadline - Date.now()),
      1000
    );

    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, [deadline]);

  return {
    days: days < 0 ? 0 : days,
    hours: hours < 0 ? 0 : hours,
    minutes: minutes < 0 ? 0 : minutes,
    seconds: seconds < 0 ? 0 : seconds,
  };
};

export default useCountdownTimer;
