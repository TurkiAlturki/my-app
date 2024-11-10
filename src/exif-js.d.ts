declare module 'exif-js' {
    interface ExifData {
      [key: string]: any;
    }
  
    interface ExifStatic {
      getData(
        img: HTMLElement | string,
        callback: (this: HTMLElement) => void
      ): void;
      getTag(img: HTMLElement | string, tag: string): any;
      getAllTags(img: HTMLElement | string): ExifData;
    }
  
    const EXIF: ExifStatic;
    export default EXIF;

  export function getData(imageRef: HTMLImageElement, arg1: (this: HTMLElement) => void) {
    throw new Error('Function not implemented.');
  }
  }
  