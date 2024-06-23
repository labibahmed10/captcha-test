import { ReactNode, RefObject } from "react";
import Webcam from "react-webcam";

export interface ISquareShapePosition {
  x: number;
  y: number;
}

export interface ICaptchaSquareBox {
  position: number;
  isClicked: boolean;
  hasWaterMark: boolean;
  width: number;
  height: number;
  waterMarkType?: string;
  color?: string;
}

export interface ICaptchaContainerProps {
  handleFunction: () => void;
  title: string;
  action: string;
  children: ReactNode;
  imgSrc?: string;
  numOfWrongValidation?: number;
}

export interface ICaptchaWebCamContainerProps {
  ref: RefObject<Webcam>;
  allCaptchaSquareBoxs: ICaptchaSquareBox[] | undefined;
  squareShapePosition: ISquareShapePosition;
}

export interface ICaptchaSectorsValidationProps {
  imgSrc: string;
  allCaptchaSquareBoxs: ICaptchaSquareBox[] | undefined;
  squareShapePosition: ISquareShapePosition;
  handleSelectedWatermarks: (val: ICaptchaSquareBox) => void;
}

export interface IValidationSuccessType {
  success: boolean;
  message: string;
}

export interface IShapeName_Color {
  randomWatermarkShapeName: string;
  colorTint: string;
}
