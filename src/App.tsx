import { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { getUniqueRandomIndex } from "./helper/getUniqueRandomIndex";
import { ICaptchaSquareBox, ISquareShapePosition } from "./types";
import { CaptchaSquareBoxSize, usedIndexes, VideoCamDefaultHeight, VideoCamDefaultWidth, waterMarksShapes } from "./utils/constValues";
import CaptchaWebCamContainer from "./components/CaptchaWebCamContainer";
import CaptchaContainer from "./components/CaptchaContainer";
import CaptchaSectorsValidation from "./components/CaptchaSectorsValidation";

function App() {
  const webcamRef = useRef<Webcam>(null);
  const intervalRef = useRef<number | undefined>();
  const [imgSrc, setImageSrc] = useState<string | null>(null);
  const [shapeNameToValidate, setShapeNameToValidate] = useState<string>("");
  const [squareShapePosition, setSquareShapePosition] = useState<ISquareShapePosition>({ x: 0, y: 0 });
  const [allCaptchaSquareBoxs, setAllCaptchaSquareBoxs] = useState<ICaptchaSquareBox[]>([]);

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
        position: i,
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

    const randomWatermarkShapeName = waterMarksShapes[Math.floor(Math.random() * 3)];
    setShapeNameToValidate(randomWatermarkShapeName);
    setAllCaptchaSquareBoxs(captchaMiniBoxs);
  };

  const handleSelectedWatermarks = (box: ICaptchaSquareBox) => {
    const selectedWatermarks = allCaptchaSquareBoxs?.find((captchaMiniBox) => captchaMiniBox.position === box.position);
    selectedWatermarks!.isClicked = !selectedWatermarks!.isClicked; // depending click, will toggle the isClicked flag
    const updatedBoxes = [...allCaptchaSquareBoxs];
    updatedBoxes[box.position] = selectedWatermarks as ICaptchaSquareBox;
    setAllCaptchaSquareBoxs(updatedBoxes);
  };

  const handleSectorsValidation = () => {};

  return (
    <>
      {!imgSrc && (
        <CaptchaContainer handleFunction={handlePreValidationImgPosition} title="Take Selfie" action="Continue">
          <CaptchaWebCamContainer ref={webcamRef} allCaptchaSquareBoxs={allCaptchaSquareBoxs} squareShapePosition={squareShapePosition} />
        </CaptchaContainer>
      )}

      {imgSrc && (
        <CaptchaContainer handleFunction={handleSectorsValidation} title={`Select ${shapeNameToValidate}`} action="Validate">
          <CaptchaSectorsValidation
            imgSrc={imgSrc}
            squareShapePosition={squareShapePosition}
            allCaptchaSquareBoxs={allCaptchaSquareBoxs}
            handleSelectedWatermarks={handleSelectedWatermarks}
          />
        </CaptchaContainer>
      )}
    </>
  );
}

export default App;
