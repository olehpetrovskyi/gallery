import { SafeUrl } from '@angular/platform-browser';

export interface IPhoto {
  id: string;
  url?: string;
  dataUrl?: SafeUrl;
  isFavorite?: boolean;
}

export class Photo {
  id: string;
  url: string;
  dataUrl: SafeUrl;
  isFavorite: boolean;

  constructor(options?: IPhoto) {
    if (options) { this.init(options); }
  }

  init(options: IPhoto) {
    if (options.id) { this.id = options.id; }
    if (options.url) { this.url = options.url; }
    if (options.dataUrl) { this.dataUrl = options.dataUrl; }
    if (options.isFavorite) { this.isFavorite = options.isFavorite; }
  }

  setFavorite(value: boolean) {
    this.isFavorite = value;
  }
}
