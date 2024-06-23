// import { ICaptchaSquareBox } from "../types";
// import { randomColors } from "../utils/constValues";

// export const generateRandomColorForRandomShapeName = (updatedBoxsWithColorTint: ICaptchaSquareBox[]) => {
//   const colorTint = randomColors[Math.floor(Math.random() * randomColors.length)];

//   updatedBoxsWithColorTint.forEach((box) => {
//     if (box.waterMarkType) {
//       box.color = colorTint;
//     }
//   });

//   return { updatedBoxsWithColorTint, colorTint };



//   //* I tried both approach but little bit confused about which one is to implement 
//   //* The below example first sort out the random colors and watermark shapes by their position
//   //* Then loop through the shapes which has water marks and randomly places color tint on them
//   //* { triangle: red | blue | green, circle: red | blue | green, square: red | blue | green }

//   // const colorTintForShapeName: { [x: string]: string } = {};
//   // const shuffledColors = randomColors.sort(() => Math.random() - 0.5);
//   // const shuffledShapes = waterMarksShapes.sort(() => Math.random() - 0.5);

//   // shuffledShapes.forEach((shape, i) => {
//   //   colorTintForShapeName[shape] = shuffledColors[i];
//   // });

//   // return colorTintForShapeName;
// };
