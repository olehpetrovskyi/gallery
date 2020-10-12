import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageProcessingService {
  constructor() { }

  imageToDataUrl(imageEl: HTMLImageElement): Observable<string> {
    return new Observable((observer: Subscriber<string>): void => {
      if (imageEl.complete) { return observer.next(this.getImageDataUrl(imageEl)); }

      imageEl.onload = ((): void => {
        observer.next(this.getImageDataUrl(imageEl));
      });
      imageEl.onerror = (error): void => {
        observer.error(error);
      };
    });
  }

  private getImageDataUrl(imageEl: HTMLImageElement) {
    const canvas = document.createElement('canvas') as HTMLCanvasElement;
    canvas.width = 500;
    canvas.height = 500;
    const canvasContext = canvas.getContext('2d');

    canvasContext.drawImage(imageEl, 0, 0);
    return canvas.toDataURL();
  }
}

