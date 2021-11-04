import { Component } from '@angular/core';
import { NgxCustomTourService} from './ngx-custom-tour.service'

@Component({
  selector: 'ngx-custom-tour-overlay',
  template: `
    <div class="hint-overlay" *ngIf="show" (click)="dismiss()"></div>
  `,
  styles: [
  ]
})
export class NgxCustomTourComponent {

  show: boolean = false;

  constructor(public tourService: NgxCustomTourService) {
    this.tourService.overlay$.subscribe(data => this.show = data);
  }

  dismiss(): void {
    if(this.tourService.hintOptions.dismissOnOverlay)
      this.tourService.overlayNext();
  }

}