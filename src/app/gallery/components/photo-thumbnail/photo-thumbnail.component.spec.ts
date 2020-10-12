import { v4 as uuid } from 'uuid';
import * as faker from 'faker';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoThumbnailComponent } from './photo-thumbnail.component';
import { Photo } from '@gl/gallery/data-models/Photo';
import { ImageProcessingService } from '@gl/blocks/image-helpers/image-processing.service';
import { Type } from '@angular/core';
import { of, throwError } from 'rxjs';
import { By } from '@angular/platform-browser';
import { GalleryService } from '@gl/gallery/services/gallery.service';
import { PhotosList } from '@gl/gallery/data-models/PhotosList';


const ImageProcessingServiceMock = {
  imageToDataUrl: () => of('data')
};

const GalleryServiceMock = {
  addToFavorites: () => of('data')
};

describe('PhotoThumbnailComponent', () => {
  let component: PhotoThumbnailComponent;
  let fixture: ComponentFixture<PhotoThumbnailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotoThumbnailComponent ],
      providers: [
        { provide: ImageProcessingService, useValue: ImageProcessingServiceMock},
        { provide: GalleryService, useValue: GalleryServiceMock}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoThumbnailComponent);
    component = fixture.componentInstance;
    component.photo = new Photo({
      id: uuid(),
      url: 'http://localhost:4200/images/500/500/nature?59682',
      dataUrl: faker.image.dataUri()
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('onClick() should call imageProcessingService.imageToDataUrl with imageEl as param',
    () => {
      const imageProcessingServiceMocked =
      fixture.debugElement.injector.get<ImageProcessingService>(ImageProcessingService as Type<ImageProcessingService>);
      spyOn(imageProcessingServiceMocked, 'imageToDataUrl').and.returnValue(of('dataUrl'));
      component.onClick();
      const imageEl = fixture.debugElement.query(By.css('img.photo-thumbnail-image')).nativeElement;
      expect(imageProcessingServiceMocked.imageToDataUrl).toHaveBeenCalledWith(imageEl);
    }
  );

  it('onAddedToFavorites() should be called on imageProcessingServer.imageDataUrl success', () => {
    const imageProcessingServiceMocked =
      fixture.debugElement.injector.get<ImageProcessingService>(ImageProcessingService as Type<ImageProcessingService>);
    const galleryServiceMocked =
      fixture.debugElement.injector.get<GalleryService>(GalleryService as Type<GalleryService>);
    spyOn(imageProcessingServiceMocked, 'imageToDataUrl').and.returnValue(of('dataUrl'));
    spyOn(galleryServiceMocked, 'addToFavorites').and.returnValue(of(new PhotosList()));
    spyOn(component, 'onAddedToFavorites');
    component.onClick();
    expect(galleryServiceMocked.addToFavorites).toHaveBeenCalled();
    expect(component.onAddedToFavorites).toHaveBeenCalled();
  });

  it('onAddToFavoritesError() should be called on imageProcessingServer.imageDataUrl fail', () => {
    const imageProcessingServiceMocked =
      fixture.debugElement.injector.get<ImageProcessingService>(ImageProcessingService as Type<ImageProcessingService>);
    const galleryServiceMocked =
      fixture.debugElement.injector.get<GalleryService>(GalleryService as Type<GalleryService>);
    spyOn(imageProcessingServiceMocked, 'imageToDataUrl').and.returnValue(of('dataUrl'));
    spyOn(galleryServiceMocked, 'addToFavorites').and.returnValue(throwError('Some Error'));
    spyOn(component, 'onAddToFavoritesError');
    component.onClick();
    expect(galleryServiceMocked.addToFavorites).toHaveBeenCalled();
    expect(component.onAddToFavoritesError).toHaveBeenCalled();
  });

  it('onAddedToFavorites() should set .inProgress to false', () => {
    component.inProgress = true;
    component.onAddedToFavorites();
    expect(component.inProgress).toBeFalse();
  });

  it('onAddedToFavorites() should set .inProgress to false', () => {
    component.photo.setFavorite(false);
    component.onAddedToFavorites();
    expect(component.inProgress).toBeFalse();
  });

  it('onAddedToFavoritesError() should set .inProgress to false', () => {
    component.photo.setFavorite(false);
    component.onAddedToFavorites();
    expect(component.inProgress).toBeFalse();
  });

});
