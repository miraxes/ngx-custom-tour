import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxCustomTourModule, NgxCustomTourService, TourStepPosition } from 'ngx-custom-tour';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgxCustomTourModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  readonly hintService = inject(NgxCustomTourService);

  title = 'ngx-custom-tour-app';
  tourStepPosition = TourStepPosition;
  highlighted = ['#id4'];
  isId3Visible = false;
  selectionValue = '';

  startTour(): void {
    this.hintService.initialize({
      dismissOnOverlay: false
    });
  }

  updateTour(): void {
    this.highlighted = ['#id5'];
  }

  showId3(): void {
    this.isId3Visible = true;
    setTimeout(() => {
      this.hintService.updateHighlightedElements();
    }, 100);
  }

  setSelection(value: string): void {
    this.selectionValue = value;
  }
}
