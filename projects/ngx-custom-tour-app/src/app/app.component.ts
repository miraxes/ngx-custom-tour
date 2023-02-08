import { Component } from '@angular/core';
import { NgxCustomTourService, TourStepPosition } from '../../../ngx-custom-tour/src/public-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ngx-custom-tour-app';
  tourStepPosition = TourStepPosition;
  constructor(public hintService: NgxCustomTourService) {

  }
  
  startTour() {
    this.hintService.initialize();
  }
}
