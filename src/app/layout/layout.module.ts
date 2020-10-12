import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { CommonSpinnerComponent, HeaderComponent } from './components';
import { ShellComponent } from './containers';
import { AppRoutingModule } from 'src/app/app-routing.module';

export const COMPONENTS = [
  ShellComponent,
  HeaderComponent,
  CommonSpinnerComponent
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS,
  entryComponents: []
})
export class LayoutModule {}
