import { randomColors, waterMarksShapes } from "../utils/constValues";

export const generateRandomColorForRandomShapeName = () => {
  const colorTintForShapeName: { [x: string]: string } = {};

  const shuffledColors = randomColors.sort(() => Math.random() - 0.5);
  const shuffledShapes = waterMarksShapes.sort(() => Math.random() - 0.5);

  shuffledShapes.forEach((shape, i) => {
    colorTintForShapeName[shape] = shuffledColors[i];
  });

  return colorTintForShapeName;
};
