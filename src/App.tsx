import { useCallback, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";

// default properties for further use [webcam height, width, captcha box size]
const VideoCamDefaultWidth = 640;
const VideoCamDefaultHeight = 480;
const CaptchaSquareBoxSize = 200;

interface ISquareShapePosition {
  x: number;
  y: number;
}

function App() {
  const webcamRef = useRef<Webcam>(null);
  const intervalRef = useRef<number | undefined>();
  const [imgSrc, setImageSrc] = useState<string | null>(null);
  const [squareShapePosition, setSquareShapePosition] = useState<ISquareShapePosition>({
    x: 0,
    y: 0,
  });

  console.log(imgSrc);

  const capture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setImageSrc(imageSrc);
    }
  }, [webcamRef]);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setSquareShapePosition({
        x: Math.floor(Math.random() * (VideoCamDefaultWidth - CaptchaSquareBoxSize)),
        y: Math.floor(Math.random() * (VideoCamDefaultHeight - CaptchaSquareBoxSize)),
      });
    }, 1500);

    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <>
      <section className="flex items-center justify-center h-screen bg-[#03285D]">
        <div className="py-[2rem] px-[5rem] bg-slate-50 flex flex-col items-center justify-center gap-8">
          <h1 className="text-4xl text-blue-600/80">Take Selfie</h1>

          <div className="relative mx-auto">
            <Webcam
              audio={false}
              disablePictureInPicture={true}
              minScreenshotHeight={320}
              minScreenshotWidth={320}
              screenshotFormat="image/jpeg"
              videoConstraints={{
                facingMode: "user",
              }}
              ref={webcamRef}
            />

            <div
              className="absolute border-2 border-white"
              style={{
                top: `${squareShapePosition.y}px`,
                left: `${squareShapePosition.x}px`,
                width: `${CaptchaSquareBoxSize}px`,
                height: `${CaptchaSquareBoxSize}px`,
              }}
            ></div>
          </div>

          <button onClick={capture} className="bg-amber-500 px-12 py-2 text-lg font-semibold text-white uppercase leading-2">
            Continue
          </button>
        </div>
      </section>
    </>
  );
}

export default App;
