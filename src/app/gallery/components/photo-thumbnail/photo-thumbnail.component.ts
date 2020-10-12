import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Photo } from '@gl/gallery/data-models/Photo';
import { GalleryService } from '@gl/gallery/services/gallery.service';
import { ImageProcessingService } from '@gl/blocks/image-helpers/image-processing.service';
import { concatMap } from 'rxjs/operators';
import { SpinnerConfigInterface } from '@gl/layout/components';

@Component({
  selector: 'gl-photo-thumbnail',
  templateUrl: './photo-thumbnail.component.html',
  styleUrls: ['./photo-thumbnail.component.scss']
})
export class PhotoThumbnailComponent implements OnInit {
  inProgress: boolean;

  spinnerConfig: SpinnerConfigInterface = {
    diameter: 20
  };

  @Input() photo: Photo;
  @Input() linkMode?: boolean;
  @ViewChild('image', {static: false}) imageEl: any;
  constructor(private galleryService: GalleryService, private imageProcessingService: ImageProcessingService) { }

  ngOnInit(): void {}

  onClick() {
    if (this.linkMode || this.inProgress || this.photo.isFavorite) { return false; }

    this.inProgress = true;
    this.imageProcessingService.imageToDataUrl(this.imageEl.nativeElement)
      .pipe(concatMap( (result) => this.galleryService.addToFavorites(result)))
      .subscribe(
        () => this.onAddedToFavorites(),
        () => this.onAddToFavoritesError()
      );
  }

  onAddedToFavorites() {
    this.photo.setFavorite(true);
    this.inProgress = false;
  }

  onAddToFavoritesError() {
    this.inProgress = false;
    // no time for custom modal
    const shouldErase = confirm('Seems like you are running out of space. You can erase current favorite photos list ' +
      'or upgrade to premium plan! Erase all favorites?');
    if (shouldErase) {
      localStorage.removeItem('favorite-photos');
      this.galleryService.eraseFavorites();
    }
  }

}
