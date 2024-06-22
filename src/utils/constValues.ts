// default properties for further use [webcam height, width, captcha box size]
const VideoCamDefaultWidth = 640;
const VideoCamDefaultHeight = 480;
const CaptchaSquareBoxSize = 200;

// pre defined shapes for watermarks
const waterMarksShapes = ["triangle", "circle", "square"];
// random color with watermarks
export const randomColors = ["red", "green", "blue"];


// Set to keep track of used indexes
export const usedIndexes = new Set<number>();


export { VideoCamDefaultHeight, VideoCamDefaultWidth, CaptchaSquareBoxSize, waterMarksShapes };
