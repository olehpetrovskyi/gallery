import { Component, OnInit } from '@angular/core';
import { GalleryService } from '@gl/gallery/services/gallery.service';
import { PhotosList } from '@gl/gallery/data-models/PhotosList';
import { ActivatedRoute } from '@angular/router';
import { SpinnerConfigInterface } from '@gl/layout/components';

@Component({
  selector: 'gl-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  photos: PhotosList = this.galleryService.photos;
  favoritesMode: boolean;

  loadInProgress: boolean;
  spinnerConfig: SpinnerConfigInterface = {
    diameter: 100,
    containerHeight: 230
  };

  constructor(private galleryService: GalleryService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.galleryService.reset();
    this.route.data.subscribe((value) => {
      this.favoritesMode = !!value.favorites;
      this.getPhotos();
    });
  }

  getPhotos() {
    this.loadInProgress = true
    this.getRemoteRequest().subscribe(
      () => this.loadInProgress = false);
  }

  getRemoteRequest() {
    return this.favoritesMode ? this.galleryService.getFavoritePhotos() : this.galleryService.getPhotos();
  }

}
