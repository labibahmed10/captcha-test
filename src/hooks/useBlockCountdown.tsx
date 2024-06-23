// import { ForwardedRef, MutableRefObject, useCallback, useEffect, useRef, useState } from "react";
// import { IBlockedErrorProps } from "../types";

// const useBlockCountdown = ({ props, ref }: { props: IBlockedErrorProps; ref: ForwardedRef<number | undefined> }) => {
//   const { setNumOfWrongValidation, setImageSrc, startInterval, setSquareShapePostion, setAllCaptchaSquareBoxs } = props;

//   const [timeLeft, setTimeLeft] = useState(3600);
//   const timeLeftRef = useRef<number | undefined>();

//   const handleReset = useCallback(() => {
//     localStorage.setItem("numOfWrongValidation", String(0));
//     clearInterval(timeLeftRef.current);
//     setNumOfWrongValidation(0);
//     setImageSrc(null);
//     (ref as MutableRefObject<number | undefined>).current = startInterval(setSquareShapePostion);
//     setAllCaptchaSquareBoxs([]);
//   }, [ref, setAllCaptchaSquareBoxs, setImageSrc, setNumOfWrongValidation, setSquareShapePostion, startInterval]);

//   useEffect(() => {
//     timeLeftRef.current = setInterval(() => {
//       setTimeLeft((prevSeconds) => {
//         if (prevSeconds <= 0) {
//           clearInterval(timeLeftRef.current);
//           return 0;
//         }
//         return prevSeconds - 1;
//       });
//     }, 1000);

//     if (timeLeft === 0) {
//       setNumOfWrongValidation(0);
//       localStorage.setItem("numOfWrongValidation", String(0));
//       setImageSrc(null);
//       (ref as MutableRefObject<number | undefined>).current = startInterval(setSquareShapePostion);
//       setAllCaptchaSquareBoxs([]);
//     }

//     return () => clearInterval(timeLeftRef.current);
//   }, [timeLeft, setNumOfWrongValidation, setImageSrc, ref, setSquareShapePostion, startInterval, setAllCaptchaSquareBoxs]);

//   const minuteLeft = Math.floor(timeLeft / 60);
//   const secondsLeft = Math.floor(timeLeft % 60);

//   return { minuteLeft, secondsLeft, timeLeftRef, handleReset };
// };

// export default useBlockCountdown;
