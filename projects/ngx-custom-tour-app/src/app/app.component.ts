import { Component } from '@angular/core';
import { NgxCustomTourService } from 'ngx-custom-tour';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ngx-custom-tour-app';
  constructor(public hintService: NgxCustomTourService) {

  }
  
  startTour() {
    this.hintService.initialize();
  }
}
