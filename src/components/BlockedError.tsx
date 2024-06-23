import { forwardRef } from "react";
import { IBlockedErrorProps } from "../types";
import useBlockCountdown from "../helper/useBlockCountdown";

const BlockedError = forwardRef<number | undefined, IBlockedErrorProps>((props, ref) => {
  const { secondsLeft, minuteLeft, handleReset } = useBlockCountdown({ props, ref });

  const formatTime = (time: number) => {
    return time < 10 ? `0${time}` : time;
  };

  return (
    <section className="flex items-center justify-center h-screen bg-[#03285D]">
      <div className="bg-slate-50 h-[50%] w-[60%] flex items-center justify-center flex-col gap-5 rounded-md">
        <h1 className="text-3xl text-blue-600/90 font-serif">
          You're blocked for {formatTime(minuteLeft)} miniute {formatTime(secondsLeft)} seconds
        </h1>

        <button
          onClick={handleReset}
          className="px-10 py-2 bg-blue-600/80 text-xl text-white font-serif rounded-lg active:scale-[0.90] active:transition-all duration-500"
        >
          Start Over
        </button>
      </div>
    </section>
  );
});

export default BlockedError;
