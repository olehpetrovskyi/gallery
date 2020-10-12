import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GalleryComponent, PhotoComponent } from './components';

const authRoutes: Routes = [
  { path: '', component: GalleryComponent },
  { path: 'favorites', component: GalleryComponent, data: { favorites: true } },
  { path: 'photos/:id', component: PhotoComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(authRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class GalleryRoutingModule {}
