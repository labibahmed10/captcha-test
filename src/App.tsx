import { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { getUniqueRandomIndex } from "./helper/getUniqueRandomIndex";
import { ICaptchaSquareBox, ISquareShapePosition } from "./types";
import { CaptchaSquareBoxSize, usedIndexes, waterMarksShapes } from "./utils/constValues";
import CaptchaContainer from "./components/CaptchaContainer";
import CaptchaSectorsValidation from "./components/CaptchaSectorsValidation";
import CaptchaWebCamContainer from "./components/CaptchaWebCamContainer";
import showMessages from "./helper/showMessage";
import { startInterval } from "./helper/startInterval";

function App() {
  const webcamRef = useRef<Webcam>(null);
  const intervalRef = useRef<number | undefined>();
  const [imgSrc, setImageSrc] = useState<string | null>(null);
  const [shapeNameToValidate, setShapeNameToValidate] = useState<string>("");
  const [squareShapePosition, setSquareShapePosition] = useState<ISquareShapePosition>({ x: 0, y: 0 });
  const [allCaptchaSquareBoxs, setAllCaptchaSquareBoxs] = useState<ICaptchaSquareBox[]>([]);

  useEffect(() => {
    intervalRef.current = startInterval(setSquareShapePosition);
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
    const updatedBoxes = [...allCaptchaSquareBoxs];
    const selectedWatermarks = allCaptchaSquareBoxs?.find((captchaMiniBox) => captchaMiniBox.position === box.position);
    selectedWatermarks!.isClicked = !selectedWatermarks!.isClicked; // depending click, will toggle the isClicked flag
    updatedBoxes[box.position] = selectedWatermarks as ICaptchaSquareBox;
    setAllCaptchaSquareBoxs(updatedBoxes);
  };

  const handleSectorsValidation = () => {
    // depending on random shapename it will filtered every value that has corresponding Shapename
    const allSelectedCaptchaSquareBoxs = allCaptchaSquareBoxs.filter((captchaMiniBox) => captchaMiniBox.waterMarkType === shapeNameToValidate);

    // as user will select the watermark boxs those values are filtered here
    const userSelectedCaptchaSquareBoxs = allCaptchaSquareBoxs.filter((captchaMiniBox) => captchaMiniBox.isClicked);

    // user selected 1/1+ captcha boxes, are every boxs are the same name of Shapename? -> true | false
    const isSelectedAreWaterMarks = userSelectedCaptchaSquareBoxs.every((captchaMiniBox) => captchaMiniBox.waterMarkType === shapeNameToValidate);

    // if there is box selected than no length, set -> false, message
    if (userSelectedCaptchaSquareBoxs.length === 0) {
      return showMessages(false, `Please select ${shapeNameToValidate} box's to validate captcha`);
    }

    // if user selected and whatever boxs are, same name as Shape!?
    if (userSelectedCaptchaSquareBoxs.length > 0 && isSelectedAreWaterMarks) {
      // if same name as Shapename and the length of all boxes are same -> true
      if (userSelectedCaptchaSquareBoxs.length === allSelectedCaptchaSquareBoxs.length) {
        setImageSrc(null);
        setAllCaptchaSquareBoxs([]);
        setShapeNameToValidate("");
        intervalRef.current = startInterval(setSquareShapePosition);
        return showMessages(true, "Validation was successful");
      } else {
        // if no conditions meet the requirements then -> false
        return showMessages(false, "Invalid selection was selected in the captcha box");
      }
    } else {
      // if no conditions meet the requirements then -> false
      return showMessages(false, "Invalid selection was selected in the captcha box");
    }
  };

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
