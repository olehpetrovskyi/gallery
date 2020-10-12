import * as _ from 'underscore';
import { IPhoto, Photo } from '@gl/gallery/data-models/Photo';

export interface IPhotoList {
  data: IPhoto[];
}

export class PhotosList {
  data: Photo[] = [];

  constructor(options?: IPhotoList) {
    if (options) { this.init(options); }
  }

  init(options: IPhotoList) {
    if (options.data) { this.addList(options.data); }
  }

  add(photo: IPhoto) {
    this.data.push(new Photo(photo));
  }

  addList(photos: IPhoto[]) {
    _.each(photos, (elem) => this.add(elem));
  }

  getQuantity() {
    return this.data.length;
  }

  reset() {
    this.data.length = 0;
  }

  eraseFavorites() {
    _.each(this.data, (elem) => elem.setFavorite(false));
  }

}

