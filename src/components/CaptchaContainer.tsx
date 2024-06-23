import { ICaptchaContainerProps } from "../types";

const CaptchaContainer = ({ handleFunction, title, action, children, imgSrc, numOfWrongValidation }: ICaptchaContainerProps) => {
  return (
    <section className="flex items-center justify-center h-screen bg-[#03285D] rounded-lg">
      <div className="py-[2rem] px-[5rem] bg-slate-50 flex flex-col items-center justify-center gap-4 rounded-lg">
        <h1 className="text-4xl text-blue-600/80 capitalize font-serif">{title}</h1>

        <div className="relative mx-auto">{children}</div>

        {numOfWrongValidation ? (
          <p className="text-xl font-serif text-blue-600/90">You have failed to validate for the {numOfWrongValidation} times</p>
        ) : null}
        {imgSrc && <p className="text-xl font-serif text-blue-600/90">N.B -After 5 times wrong validation approach you will be blocked</p>}

        <button
          disabled={numOfWrongValidation! >= 5}
          onClick={handleFunction}
          className="bg-[#FF8E20] px-12 py-2 text-lg font-semibold text-white uppercase leading-2 rounded-md hover:bg-[#ff8420] active:scale-[0.88] active:transition-all duration-500 disabled:bg-[#5f4326] disabled:active:scale-[1] disabled:active:transition-none disabled:duration-0"
        >
          {action}
        </button>
      </div>
    </section>
  );
};

export default CaptchaContainer;
