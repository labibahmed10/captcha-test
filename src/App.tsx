import { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";

// default properties for further use [webcam height, width, captcha box size]
const VideoCamDefaultWidth = 640;
const VideoCamDefaultHeight = 480;
const CaptchaSquareBoxSize = 200;

interface ISquareShapePosition {
  x: number;
  y: number;
}

interface ICaptchaSquareBox {
  position: number;
  isClicked: boolean;
  hasWaterMark: boolean;
  width: number;
  height: number;
}

function App() {
  const webcamRef = useRef<Webcam>(null);
  const intervalRef = useRef<number | undefined>();
  const [imgSrc, setImageSrc] = useState<string | null>(null);
  const [squareShapePosition, setSquareShapePosition] = useState<ISquareShapePosition>({
    x: 0,
    y: 0,
  });

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

    const captchaMiniBoxs = [];
    const rows = 5;
    const cols = 5;

    for (let i = 0; i < rows * cols; i++) {
      captchaMiniBoxs[i] = {
        position: i + 1,
        isClicked: false,
        hasWaterMark: false,
        width: CaptchaSquareBoxSize / rows,
        height: CaptchaSquareBoxSize / cols,
      };
    }

    setAllCaptchaSquareBoxs(captchaMiniBoxs);
  };

  return (
    <>
      <section className="flex items-center justify-center h-screen bg-[#03285D]">
        <div className="py-[2rem] px-[5rem] bg-slate-50 flex flex-col items-center justify-center gap-8">
          <h1 className="text-4xl text-blue-600/80">Take Selfie</h1>

          <div className="relative mx-auto">
            {imgSrc ? (
              <img src={imgSrc ? imgSrc : ""} alt="" />
            ) : (
              <Webcam
                audio={false}
                disablePictureInPicture={true}
                screenshotFormat="image/jpeg"
                videoConstraints={{ facingMode: "user" }}
                ref={webcamRef}
              />
            )}

            {webcamRef.current && !allCaptchaSquareBoxs && (
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
                {allCaptchaSquareBoxs?.map((box) => {
                  return (
                    <div
                      className="p-0 m-0 border-[0.3px] bg-slate-400/20 z-10 flex items-center justify-center"
                      key={box?.position}
                      style={{
                        width: `${box?.width}px`,
                        height: `${box?.height}px`,
                      }}
                    >
                      {box.position}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <button onClick={handlePreValidationImgPosition} className="bg-[#FF8E20] px-12 py-2 text-lg font-semibold text-white uppercase leading-2">
            Continue
          </button>
        </div>
      </section>
    </>
  );
}

export default App;
