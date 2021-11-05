import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxCustomTourComponent } from './ngx-custom-tour.component';
import { TourComponent } from './tour.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    NgxCustomTourComponent,
    TourComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule
  ],
  exports: [
    NgxCustomTourComponent,
    TourComponent,
    CommonModule,
    BrowserAnimationsModule
  ]
})
export class NgxCustomTourModule { }
