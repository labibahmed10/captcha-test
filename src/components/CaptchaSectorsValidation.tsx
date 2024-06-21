import { ICaptchaSectorsValidationProps } from "../types";
import { CaptchaSquareBoxSize } from "../utils/constValues";

const CaptchaSectorsValidation = ({ imgSrc, allCaptchaSquareBoxs, squareShapePosition }: ICaptchaSectorsValidationProps) => {
  return (
    <>
      {/* the image that was taken as a screenshot */}
      <img src={imgSrc ? imgSrc : ""} alt="" />

      {/* right after the screenshot img, random half of the sectors will be fill up with random watermark types like - triangle | circle | square - 12/25*/}
      {allCaptchaSquareBoxs && (
        <div
          className="absolute border border-white flex flex-wrap box-content"
          style={{
            top: `${squareShapePosition.y}px`,
            left: `${squareShapePosition.x}px`,
            width: `${CaptchaSquareBoxSize}px`,
            height: `${CaptchaSquareBoxSize}px`,
          }}
        >
          {allCaptchaSquareBoxs?.map((box, i) => {
            return (
              <div
                className={`p-0 m-0 border-[0.3px] bg-slate-400/20 z-10 flex items-center justify-center 
                 ${box.hasWaterMark ? "hover:bg-[#03285D] cursor-pointer" : ""}`}
                key={i}
                style={{
                  width: `${box?.width}px`,
                  height: `${box?.height}px`,
                }}
              >
                {box.waterMarkType === "triangle" ? (
                  <div className="custom-triangle" />
                ) : box.waterMarkType === "circle" ? (
                  <div className="custom-circle" />
                ) : (
                  box.waterMarkType === "square" && <div className="custom-square" />
                )}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default CaptchaSectorsValidation;
