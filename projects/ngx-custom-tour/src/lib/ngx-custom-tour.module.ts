import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TourComponent } from './tour.component';


@NgModule({
  declarations: [
    TourComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    TourComponent
  ]
})
export class NgxCustomTourModule { }
