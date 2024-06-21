import { ICaptchaContainerProps } from "../types";

const CaptchaContainer = ({ handleFunction, title, action, children }: ICaptchaContainerProps) => {
  return (
    <section className="flex items-center justify-center h-screen bg-[#03285D]">
      <div className="py-[2rem] px-[5rem] bg-slate-50 flex flex-col items-center justify-center gap-8">
        <h1 className="text-4xl text-blue-600/80 capitalize">{title}</h1>

        <div className="relative mx-auto">{children}</div>

        <button onClick={handleFunction} className="bg-[#FF8E20] px-12 py-2 text-lg font-semibold text-white uppercase leading-2">
          {action}
        </button>
      </div>
    </section>
  );
};

export default CaptchaContainer;
