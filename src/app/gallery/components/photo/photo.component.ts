import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GalleryService } from '@gl/gallery/services/gallery.service';
import { Photo } from '@gl/gallery/data-models/Photo';

@Component({
  selector: 'gl-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss']
})
export class PhotoComponent implements OnInit {
  photo: Photo;

  constructor(private route: ActivatedRoute,
              private galleryService: GalleryService,
              private router: Router
  ) { }

  ngOnInit(): void {
    this.loadPhoto();
  }

  loadPhoto() {
    const photoId = this.route.snapshot.paramMap.get('id');
    this.photo = this.galleryService.getFavoritePhotoById(photoId);
  }

  onRemoveClicked() {
    this.galleryService.removeFromFavorites(this.photo.id);
    this.router.navigate(['favorites']).then();
  }
}
