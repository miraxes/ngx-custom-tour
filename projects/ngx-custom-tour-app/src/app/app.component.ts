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
  highlighted = ['#id4'];
  isId3Visible = false;
  constructor(public hintService: NgxCustomTourService) {

  }
  
  startTour() {
    this.hintService.initialize({
      dismissOnOverlay: false,
      // elementsDisabled: false,
    });
  }

  updateTour() {
    this.highlighted = ['#id5'];
  }

  showId3() {
    this.isId3Visible = true;
    setTimeout(() => {
      this.hintService.updateHighlightedElements();
    }, 100);
  }
}
