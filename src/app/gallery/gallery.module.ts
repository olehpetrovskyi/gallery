import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@gl/layout/layout.module';
import { GalleryRoutingModule } from '@gl/gallery/gallery-routing.module';
import { GalleryComponent, PhotoComponent, PhotoThumbnailComponent } from '@gl/gallery/components';
import { MaterialModule } from '@gl/layout/material/material.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

export const COMPONENTS = [
  PhotoComponent,
  PhotoThumbnailComponent,
  GalleryComponent
];

@NgModule({
  imports: [
    CommonModule,
    GalleryRoutingModule,
    LayoutModule,
    MaterialModule,
    InfiniteScrollModule
  ],
  declarations: COMPONENTS,
  exports: []
})
export class GalleryModule {}
