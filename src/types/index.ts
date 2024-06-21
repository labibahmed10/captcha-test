import { ReactNode, RefObject } from "react";
import Webcam from "react-webcam";

export interface ISquareShapePosition {
  x: number;
  y: number;
}

export interface ICaptchaSquareBox {
  isClicked: boolean;
  hasWaterMark: boolean;
  width: number;
  height: number;
  waterMarkType?: string;
}

export interface ICaptchaContainerTypes {
  handleFunction: () => void;
  title: string;
  action: string;
  children: ReactNode;
}

export interface CaptchaWebCamContainerProps {
  ref: RefObject<Webcam>;
  allCaptchaSquareBoxs: ICaptchaSquareBox[] | undefined;
  squareShapePosition: ISquareShapePosition;
}
