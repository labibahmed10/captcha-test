// import { useEffect, useRef, useState } from "react";
// import Webcam from "react-webcam";
// import { getUniqueRandomIndex } from "./helper/getUniqueRandomIndex";
// import { ICaptchaSquareBox, IShapeName_Color, ISquareShapePosition } from "./types";
// import { CaptchaSquareBoxSize, waterMarksShapes } from "./utils/constValues";
// import CaptchaContainer from "./components/CaptchaContainer";
// import CaptchaSectorsValidation from "./components/CaptchaSectorsValidation";
// import CaptchaWebCamContainer from "./components/CaptchaWebCamContainer";
// import showMessages from "./helper/showMessage";
// import { startInterval } from "./helper/startInterval";
// import { generateRandomColorForRandomShapeName } from "./helper/generateRandomColorForRandomShapeName";
// import BlockedError from "./components/BlockedError";
// import useCameraPermission from "./hooks/useCameraPermission";

// function App() {
//   const webcamRef = useRef<Webcam>(null);
//   const intervalRef = useRef<number | undefined>();
//   const [imgSrc, setImageSrc] = useState<string | null>(null);
//   const [shapeNameAndColorValidate, setShapeNameAndColorValidate] = useState<IShapeName_Color | undefined>();
//   const [squareShapePosition, setSquareShapePosition] = useState<ISquareShapePosition>({ x: 0, y: 0 });
//   const [allCaptchaSquareBoxs, setAllCaptchaSquareBoxs] = useState<ICaptchaSquareBox[]>([]);
//   const [numOfWrongValidation, setNumOfWrongValidation] = useState<number>(
//     localStorage.getItem("numOfWrongValidation") ? JSON.parse(localStorage.getItem("numOfWrongValidation")!) : 0
//   );

//   // here getting the permission for camera access of your browser, if its not permitted
//   useCameraPermission();

//   useEffect(() => {
//     intervalRef.current = startInterval(setSquareShapePosition);
//     return () => clearInterval(intervalRef.current);
//   }, []);

//   const handlePreValidationImgPosition = () => {
//     if (webcamRef.current) {
//       const imageSrc = webcamRef.current.getScreenshot();
//       setImageSrc(imageSrc);
//     }
//     clearInterval(intervalRef.current);

//     const captchaMiniBoxs: ICaptchaSquareBox[] = [];
//     const rows = 5;
//     const cols = 5;

//     for (let i = 0; i < rows * cols; i++) {
//       captchaMiniBoxs[i] = {
//         position: i,
//         isClicked: false,
//         hasWaterMark: false,
//         width: CaptchaSquareBoxSize / rows,
//         height: CaptchaSquareBoxSize / cols,
//       };
//     }

//     const halfOfTheRandomAreaForRandomWatermarkPlace = Math.floor((rows * cols) / 2); // 12/25 box area

//     for (let i = 0; i < halfOfTheRandomAreaForRandomWatermarkPlace; i++) {
//       const randomIndexForWatermarkPlacement = getUniqueRandomIndex();
//       const waterMarkType = waterMarksShapes[Math.floor(Math.random() * 3)]; // triangle | circle | square
//       captchaMiniBoxs[randomIndexForWatermarkPlacement].waterMarkType = waterMarkType;
//       captchaMiniBoxs[randomIndexForWatermarkPlacement].hasWaterMark = true;
//     }

//     const randomWatermarkShapeName = waterMarksShapes[Math.floor(Math.random() * 3)]; // triangle | circle | square any of this shape will generate

//     //* here generating random color for watermark shapes and getting the tint color for validation
//     const { updatedBoxsWithColorTint, colorTint } = generateRandomColorForRandomShapeName(captchaMiniBoxs);
//     setAllCaptchaSquareBoxs(updatedBoxsWithColorTint);

//     //* here I'm using the color for the watermark shape randomly | it was the first approach
//     // captchaMiniBoxs.forEach((box) => (box.color = afterRandomColorAddingUpdatedBoxs[box["waterMarkType"]!]));

//     setShapeNameAndColorValidate({ randomWatermarkShapeName, colorTint });
//   };

//   const handleSelectedWatermarks = (box: ICaptchaSquareBox) => {
//     const updatedBoxes = [...allCaptchaSquareBoxs];
//     const selectedWatermarks = allCaptchaSquareBoxs?.find((captchaMiniBox) => captchaMiniBox.position === box.position);
//     selectedWatermarks!.isClicked = !selectedWatermarks!.isClicked; // depending on click, will toggle the isClicked flag
//     updatedBoxes[box.position] = selectedWatermarks as ICaptchaSquareBox;
//     setAllCaptchaSquareBoxs(updatedBoxes);
//   };

//   const handleSectorsValidation = () => {
//     //* depending on random shapename it will filtered every value that has corresponding Shapename
//     const allSelectedCaptchaSquareBoxs = allCaptchaSquareBoxs.filter(
//       (captchaMiniBox) => captchaMiniBox.waterMarkType === shapeNameAndColorValidate?.randomWatermarkShapeName
//     );

//     //* as user will select the watermark boxs those values are filtered here
//     const userSelectedCaptchaSquareBoxs = allCaptchaSquareBoxs.filter((captchaMiniBox) => captchaMiniBox.isClicked);

//     //* user selected 1/1+ captcha boxes, are every boxs are the same name of Shapename? -> true | false
//     const isSelectedAreWaterMarks = userSelectedCaptchaSquareBoxs.every(
//       (captchaMiniBox) => captchaMiniBox.waterMarkType === shapeNameAndColorValidate?.randomWatermarkShapeName
//     );

//     //* if there is box selected than no length, set -> false, message
//     if (userSelectedCaptchaSquareBoxs.length === 0) {
//       localStorage.setItem("numOfWrongValidation", String(numOfWrongValidation + 1));
//       setNumOfWrongValidation((prev) => prev + 1);
//       return showMessages(
//         false,
//         `Please select ${shapeNameAndColorValidate?.randomWatermarkShapeName} & ${shapeNameAndColorValidate?.colorTint} box's to validate captcha!`
//       );
//     }

//     //* if user selected and whatever boxs are, same name as Shape!?
//     if (userSelectedCaptchaSquareBoxs.length > 0 && isSelectedAreWaterMarks) {
//       //* if same name as Shapename and the length of all boxes are same -> true
//       if (userSelectedCaptchaSquareBoxs.length === allSelectedCaptchaSquareBoxs.length) {
//         setImageSrc(null);
//         setAllCaptchaSquareBoxs([]);
//         setShapeNameAndColorValidate(undefined);
//         intervalRef.current = startInterval(setSquareShapePosition);
//         localStorage.setItem("numOfWrongValidation", String(0));
//         setNumOfWrongValidation(0);
//         return showMessages(true, "Validation was successful");
//       } else {
//         //* if no conditions meet the requirements then -> false
//         localStorage.setItem("numOfWrongValidation", String(numOfWrongValidation + 1));
//         setNumOfWrongValidation((prev) => prev + 1);
//         return showMessages(false, "You probably have not selected required boxs!");
//       }
//     } else {
//       //* if no conditions meet the requirements then -> false
//       localStorage.setItem("numOfWrongValidation", String(numOfWrongValidation + 1));
//       setNumOfWrongValidation((prev) => prev + 1);
//       return showMessages(false, "Invalid selection in the captcha box!");
//     }
//   };

//   return (
//     <>
//       {!imgSrc && !(numOfWrongValidation >= 5) && (
//         <CaptchaContainer handleFunction={handlePreValidationImgPosition} title="Take Selfie" action="Continue">
//           <CaptchaWebCamContainer ref={webcamRef} allCaptchaSquareBoxs={allCaptchaSquareBoxs} squareShapePosition={squareShapePosition} />
//         </CaptchaContainer>
//       )}

//       {imgSrc && !(numOfWrongValidation >= 5) && (
//         <CaptchaContainer
//           handleFunction={handleSectorsValidation}
//           title={`Select '${shapeNameAndColorValidate?.randomWatermarkShapeName} - ${shapeNameAndColorValidate?.colorTint} box's'`}
//           action="Validate"
//           imgSrc={imgSrc}
//           numOfWrongValidation={numOfWrongValidation}
//         >
//           <CaptchaSectorsValidation
//             imgSrc={imgSrc}
//             squareShapePosition={squareShapePosition}
//             allCaptchaSquareBoxs={allCaptchaSquareBoxs}
//             handleSelectedWatermarks={handleSelectedWatermarks}
//           />
//         </CaptchaContainer>
//       )}

//       {numOfWrongValidation >= 5 && (
//         <BlockedError
//           setNumOfWrongValidation={setNumOfWrongValidation}
//           setImageSrc={setImageSrc}
//           setAllCaptchaSquareBoxs={setAllCaptchaSquareBoxs}
//           ref={intervalRef}
//           startInterval={startInterval}
//           setSquareShapePostion={setSquareShapePosition}
//         />
//       )}
//     </>
//   );
// }

// export default App;
