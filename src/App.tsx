import { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { getUniqueRandomIndex } from "./helper/getUniqueRandomIndex";
import { ICaptchaSquareBox, ISquareShapePosition } from "./types";
import { CaptchaSquareBoxSize, usedIndexes, VideoCamDefaultHeight, VideoCamDefaultWidth, waterMarksShapes } from "./utils/constValues";
import CaptchaWebCamContainer from "./components/CaptchaWebCamContainer";
import CaptchaContainer from "./components/CaptchaContainer";

function App() {
  const webcamRef = useRef<Webcam>(null);
  const intervalRef = useRef<number | undefined>();
  const [imgSrc, setImageSrc] = useState<string | null>(null);
  const [squareShapePosition, setSquareShapePosition] = useState<ISquareShapePosition>({ x: 0, y: 0 });
  const [allCaptchaSquareBoxs, setAllCaptchaSquareBoxs] = useState<ICaptchaSquareBox[] | undefined>();

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setSquareShapePosition({
        x: Math.floor(Math.random() * (VideoCamDefaultWidth - CaptchaSquareBoxSize)),
        y: Math.floor(Math.random() * (VideoCamDefaultHeight - CaptchaSquareBoxSize)),
      });
    }, 1500);

    return () => clearInterval(intervalRef.current);
  }, []);

  const handlePreValidationImgPosition = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setImageSrc(imageSrc);
    }
    clearInterval(intervalRef.current);

    const captchaMiniBoxs: ICaptchaSquareBox[] = [];
    const rows = 5;
    const cols = 5;

    for (let i = 0; i < rows * cols; i++) {
      captchaMiniBoxs[i] = {
        isClicked: false,
        hasWaterMark: false,
        width: CaptchaSquareBoxSize / rows,
        height: CaptchaSquareBoxSize / cols,
      };
    }

    const halfOfTheRandomAreaForRandomWatermarkPlace = Math.floor((rows * cols) / 2); // 12/25 box area

    for (let i = 0; i < halfOfTheRandomAreaForRandomWatermarkPlace; i++) {
      const randomIndexForWatermarkPlacement = getUniqueRandomIndex(usedIndexes);
      const waterMarkType = waterMarksShapes[Math.floor(Math.random() * 3)]; // triangle | circle | square
      captchaMiniBoxs[randomIndexForWatermarkPlacement].waterMarkType = waterMarkType;
      captchaMiniBoxs[randomIndexForWatermarkPlacement].hasWaterMark = true;
    }

    setAllCaptchaSquareBoxs(captchaMiniBoxs);
  };

  return (
    <>
      <CaptchaContainer handleFunction={handlePreValidationImgPosition} title="Take Selfie" action="Continue">
        {imgSrc ? (
          <img src={imgSrc ? imgSrc : ""} alt="" />
        ) : (
          <CaptchaWebCamContainer ref={webcamRef} allCaptchaSquareBoxs={allCaptchaSquareBoxs} squareShapePosition={squareShapePosition} />
        )}
      </CaptchaContainer>
    </>
  );
}

export default App;
