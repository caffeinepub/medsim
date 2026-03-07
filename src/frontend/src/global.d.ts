// Type stubs for packages used in the project without @types declarations

declare module "qrcode.react" {
  import type { SVGProps } from "react";
  export interface QRCodeSVGProps extends SVGProps<SVGSVGElement> {
    value: string;
    size?: number;
    fgColor?: string;
    bgColor?: string;
    level?: "L" | "M" | "Q" | "H";
    includeMargin?: boolean;
    imageSettings?: {
      src: string;
      height: number;
      width: number;
      excavate?: boolean;
    };
  }
  export function QRCodeSVG(props: QRCodeSVGProps): JSX.Element;
  export function QRCodeCanvas(props: QRCodeSVGProps): JSX.Element;
}

declare module "html2canvas" {
  interface Options {
    allowTaint?: boolean;
    backgroundColor?: string | null;
    canvas?: HTMLCanvasElement;
    foreignObjectRendering?: boolean;
    imageTimeout?: number;
    ignoreElements?: (element: HTMLElement) => boolean;
    logging?: boolean;
    onclone?: (document: Document) => void;
    proxy?: string;
    removeContainer?: boolean;
    scale?: number;
    useCORS?: boolean;
    width?: number;
    height?: number;
    x?: number;
    y?: number;
    scrollX?: number;
    scrollY?: number;
    windowWidth?: number;
    windowHeight?: number;
  }
  function html2canvas(
    element: HTMLElement,
    options?: Options,
  ): Promise<HTMLCanvasElement>;
  export = html2canvas;
}
