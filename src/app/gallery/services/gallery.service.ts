import * as faker from 'faker';
import * as _ from 'underscore';
import { v4 as uuid } from 'uuid';
import { Injectable } from '@angular/core';
import { PhotosList } from '@gl/gallery/data-models/PhotosList';
import { IPhoto, Photo } from '@gl/gallery/data-models/Photo';
import { TimersHelperService } from '@gl/blocks/timers/timers-helper.service';
import { Observable, Subscriber } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {
  favoritePhotos: IPhoto[] = JSON.parse(localStorage.getItem('favorite-photos')) || [];
  photos: PhotosList = new PhotosList();
  step = 15;

  constructor(private timersHelperService: TimersHelperService) {}

  getPhotos(): Observable<PhotosList> {
    return new Observable((observer: Subscriber<PhotosList>): void => {
      setTimeout(() => {
        this.generateNextStepPhotos();
        observer.next(this.photos);
        observer.complete();
      }, this.timersHelperService.getRandomDelay());
    });
  }

  getFavoritePhotos(): Observable<PhotosList> {
    return new Observable((observer: Subscriber<PhotosList>): void => {
      setTimeout(() => {
        this.photos.addList(this.favoritePhotos);
        observer.next(this.photos);
        observer.complete();
      }, this.timersHelperService.getRandomDelay());
    });
  }

  getFavoritePhotoById(id: string) {
    const searchedPhoto =_.find(this.favoritePhotos, (elem) => elem.id === id);
    return new Photo(searchedPhoto);
  }

  generateNextStepPhotos() {
    for (let i = 0; i < this.step; i++) {
      const imgUrl = faker.image.imageUrl(500, 500, 'nature', true, false);
      const replaced = imgUrl.replace('http://placeimg.com', '/images');
      this.photos.add({
        id: uuid(),
        url: replaced
      });
    }
  }

  addToFavorites(dataUrl: string): Observable<PhotosList> {
    return new Observable((observer: Subscriber<PhotosList>): void => {
      setTimeout(() => {
        try {
          this.favoritePhotos.push({
            id: uuid(),
            isFavorite: true,
            dataUrl
          });
          localStorage.setItem('favorite-photos', JSON.stringify(this.favoritePhotos));
          observer.next(this.photos);
          observer.complete();
        } catch (e) {
          observer.error(e);
        }
      }, this.timersHelperService.getRandomDelay());
    });
  }

  removeFromFavorites(id) {
    const photo =_.find(this.favoritePhotos, (elem) => elem.id === id);
    const indexToDelete = _.indexOf(this.favoritePhotos, photo);

    this.favoritePhotos.splice(indexToDelete, 1);
  }

  eraseFavorites() {
    this.photos.eraseFavorites();
    this.favoritePhotos.length = 0;
  }

  reset() {
    this.photos.reset();
  }
}
