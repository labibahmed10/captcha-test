import { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { getUniqueRandomIndex } from "./helper/getUniqueRandomIndex";
import { ICaptchaSquareBox, ISquareShapePosition, IValidationSuccessType } from "./types";
import { CaptchaSquareBoxSize, usedIndexes, VideoCamDefaultHeight, VideoCamDefaultWidth, waterMarksShapes } from "./utils/constValues";
import CaptchaWebCamContainer from "./components/CaptchaWebCamContainer";
import CaptchaContainer from "./components/CaptchaContainer";
import CaptchaSectorsValidation from "./components/CaptchaSectorsValidation";
import Swal from "sweetalert2";

function App() {
  const webcamRef = useRef<Webcam>(null);
  const intervalRef = useRef<number | undefined>();
  const [imgSrc, setImageSrc] = useState<string | null>(null);
  const [shapeNameToValidate, setShapeNameToValidate] = useState<string>("");
  const [squareShapePosition, setSquareShapePosition] = useState<ISquareShapePosition>({ x: 0, y: 0 });
  const [allCaptchaSquareBoxs, setAllCaptchaSquareBoxs] = useState<ICaptchaSquareBox[]>([]);
  const [validateSuccess, setValidateSuccess] = useState<IValidationSuccessType>();

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

    // if there is box selected than no length, set -> false, message
    if (userSelectedCaptchaSquareBoxs.length <= 0) {
      setValidateSuccess({
        success: false,
        message: "Please select Shape name box's to validate captcha",
      });
    }

    // user selected 1/1+ captcha boxes, are every boxs are the same name of Shapename? -> true | false
    const isSelectedAreWaterMarks = userSelectedCaptchaSquareBoxs.every((captchaMiniBox) => captchaMiniBox.waterMarkType === shapeNameToValidate);

    // if user selected and whatever boxs are, same name as Shape!?
    if (userSelectedCaptchaSquareBoxs.length > 0 && isSelectedAreWaterMarks) {
      // if same name as Shapename and the length of all boxes are same -> true
      if (userSelectedCaptchaSquareBoxs.length === allSelectedCaptchaSquareBoxs.length) {
        setValidateSuccess({
          success: true,
          message: "Validation was successful",
        });
      }
    } else {
      // if no conditions meet the requirements then -> false
      setValidateSuccess({
        success: false,
        message: "Invalid selection was selected in the captcha box",
      });
    }
  };

  useEffect(() => {
    if (validateSuccess?.success && validateSuccess?.message) {
      Swal.fire({
        title: "Success!",
        text: validateSuccess?.message,
        icon: "success",
        confirmButtonText: "Thank you",
      });
    }
    if (!validateSuccess?.success && validateSuccess?.message) {
      Swal.fire({
        title: "Error!",
        text: validateSuccess?.message,
        icon: "error",
        confirmButtonText: "Try Again!",
      });
    }
  }, [validateSuccess]);

  return (
    <>
      {!imgSrc && !validateSuccess && (
        <CaptchaContainer handleFunction={handlePreValidationImgPosition} title="Take Selfie" action="Continue">
          <CaptchaWebCamContainer ref={webcamRef} allCaptchaSquareBoxs={allCaptchaSquareBoxs} squareShapePosition={squareShapePosition} />
        </CaptchaContainer>
      )}

      {imgSrc && !validateSuccess && (
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
