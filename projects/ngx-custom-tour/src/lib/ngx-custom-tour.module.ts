import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxCustomTourComponent } from './ngx-custom-tour.component';
import { TourComponent } from './tour.component';



@NgModule({
  declarations: [
    NgxCustomTourComponent,
    TourComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    NgxCustomTourComponent,
    TourComponent,
    CommonModule
  ]
})
export class NgxCustomTourModule { }
