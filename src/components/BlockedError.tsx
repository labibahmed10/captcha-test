import { forwardRef, MutableRefObject, useEffect, useRef, useState } from "react";
import { IBlockedErrorProps } from "../types";

const BlockedError = forwardRef<number | undefined, IBlockedErrorProps>((props, ref) => {
  const { setNumOfWrongValidation, setImageSrc, startInterval, setSquareShapePostion, setAllCaptchaSquareBoxs } = props;

  const [timeLeft, setTimeLeft] = useState(3600);
  const timeLeftRef = useRef<number | undefined>();

  useEffect(() => {
    timeLeftRef.current = setInterval(() => {
      setTimeLeft((prevSeconds) => {
        if (prevSeconds <= 0) {
          clearInterval(timeLeftRef.current);
          return 0;
        }
        return prevSeconds - 1;
      });
    }, 1000);

    if (timeLeft === 0) {
      setNumOfWrongValidation(0);
      setImageSrc(null);
      (ref as MutableRefObject<number | undefined>).current = startInterval(setSquareShapePostion);
      setAllCaptchaSquareBoxs([]);
    }

    return () => clearInterval(timeLeftRef.current);
  }, [timeLeft, setNumOfWrongValidation, setImageSrc, ref, setSquareShapePostion, startInterval, setAllCaptchaSquareBoxs]);

  const minuteLeft = Math.floor(timeLeft / 60);
  const secondsLeft = Math.floor(timeLeft % 60);

  const formatTime = (time: number) => {
    return time < 10 ? `0${time}` : time;
  };

  return (
    <section className="flex items-center justify-center h-screen bg-[#03285D] rounded-lg">
      <div className="bg-slate-50 h-[50%] w-[60%] flex items-center justify-center flex-col gap-5 rounded-md">
        <h1 className="text-3xl text-blue-600/90 font-serif">
          You're blocked for {formatTime(minuteLeft)} miniute {formatTime(secondsLeft)} seconds
        </h1>

        <button className="px-10 py-2 bg-blue-600/80 text-xl text-white font-serif rounded-lg active:scale-[0.90] active:transition-all duration-500">
          Start Over
        </button>
      </div>
    </section>
  );
});

export default BlockedError;
