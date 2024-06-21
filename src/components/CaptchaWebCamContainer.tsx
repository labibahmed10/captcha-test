import { forwardRef, RefObject } from "react";
import Webcam from "react-webcam";
import { CaptchaWebCamContainerProps } from "../types";
import { CaptchaSquareBoxSize } from "../utils/constValues";

// Using forwardRef to properly handle the ref value
const CaptchaWebCamContainer = forwardRef<Webcam, CaptchaWebCamContainerProps>((props, ref) => {
  const { allCaptchaSquareBoxs, squareShapePosition } = props;

  return (
    <>
      <Webcam
        audio={false}
        disablePictureInPicture={true}
        screenshotFormat="image/jpeg"
        videoConstraints={{ facingMode: "user" }}
        ref={ref} // webcam ref value attached here
      />

      {(ref as RefObject<Webcam>)?.current && !allCaptchaSquareBoxs && (
        <div
          className="absolute border-2 border-white"
          style={{
            top: `${squareShapePosition.y}px`,
            left: `${squareShapePosition.x}px`,
            width: `${CaptchaSquareBoxSize}px`,
            height: `${CaptchaSquareBoxSize}px`,
          }}
        />
      )}
    </>
  );
});

export default CaptchaWebCamContainer;