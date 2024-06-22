import { ICaptchaSectorsValidationProps } from "../types";
import { CaptchaSquareBoxSize } from "../utils/constValues";

const CaptchaSectorsValidation = ({
  imgSrc,
  allCaptchaSquareBoxs,
  squareShapePosition,
  handleSelectedWatermarks,
}: ICaptchaSectorsValidationProps) => {
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
                className={`p-0 m-0 border-[0.3px] bg-slate-400/20 z-10 flex items-center justify-center cursor-pointer ${
                  box.hasWaterMark ? "hover:bg-[#fafafa] " : ""
                }`}
                key={i}
                style={{
                  width: `${box?.width}px`,
                  height: `${box?.height}px`,
                  backgroundColor: box.isClicked ? "#fafafa" : "",
                }}
                onClick={() => handleSelectedWatermarks(box)}
              >
                {box.waterMarkType === "triangle" ? (
                  <div
                    style={{
                      // dynamic value for triangle wasn't working, that's why changed into custom style
                      borderColor: box.color ? box.color : "",
                      borderBottomWidth: "30px",
                      borderLeftWidth: "15px",
                      borderRightWidth: "15px",
                      borderLeftColor: "transparent",
                      borderRightColor: "transparent",
                    }}
                  />
                ) : box.waterMarkType === "circle" ? (
                  <div className="custom-circle" style={{ borderColor: box.color ? box.color : "" }} />
                ) : (
                  box.waterMarkType === "square" && <div className="custom-square" style={{ borderColor: box.color ? box.color : "" }} />
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
