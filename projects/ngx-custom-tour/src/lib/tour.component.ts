import { Component, Input, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { NgxCustomTourService } from './ngx-custom-tour.service';
import { HintConfig } from './variables';
import { tourHintAnimation } from './animations';

export enum TourStepPosition {
  Top = 'top',
  Bottom = 'bottom',
  Left = 'left',
  Right = 'right',
  Neutral = 'neutral',
}

@Component({
  selector: `${HintConfig.HINT_TAG}[order]`,
  template: `<div class="intro-tour-hint-wrapper {{transformClass}} step{{order}} {{position}}"
  *ngIf="showme" [ngStyle]="{'top': topPos+'px', 'left': leftPos+'px'}"
  [@tourHintAnimation]="{value: transformStart, params: { transformStart: transformStart, transformEnd: transformEnd}}">
    <div class="header" *ngIf="title">
        {{title}}
        <a *ngIf="dismissible" class="header-btn__close scalable" (click)="exit()">&#10006;</a>
    </div>
    <div class="content"><ng-content></ng-content></div>
    <div class="footer" *ngIf="isFooterVisible">
      <a class="navigate-btn navigate-btn__previous scalable" *ngIf="hasPrev" (click)="prev()">{{prevButtonText}}</a>
      <a class="navigate-btn navigate-btn__next scalable" *ngIf="hasNext" (click)="next()">{{nextButtonText}}</a>
      <a class="navigate-btn navigate-btn__finish scalable" *ngIf="!hasNext" (click)="exit()">{{finishButtonText}}</a>
    </div>
  </div>`,
  animations: [tourHintAnimation]
})
export class TourComponent implements OnInit {
  @Input() title: string = '';
  @Input() selector?: string | string[];
  @Input() order: number = 0;
  @Input() position: string = TourStepPosition.Bottom;
  @Input() public dismissible: boolean = true;
  @Input() isFooterVisible: boolean = true;
  @Input() customCss: string = '';
  @Input() prevButtonText?: string = '←';
  @Input() nextButtonText?: string = '→';
  @Input() finishButtonText?: string = 'Finish';

  showme: boolean = false;
  hasNext: boolean = false;
  hasPrev: boolean = false;
  topPos: number = 1;
  leftPos: number = 1;
  highlightedElements: HTMLElement[] = [];
  transformClass: string = 'transformX_50 transformY_100';
  transformStart: boolean | string = 'translateX(-50%) translateY(-60%)';
  transformEnd: boolean | string = 'translateX(-50%) translateY(-100%)';
  transformY: boolean = false;
  transformX: boolean = false;
  constructor(public hintService: NgxCustomTourService,
              @Inject(DOCUMENT) private document: Document) {
  }

  ngOnInit(): void {
    this.hintService.register(this);
    switch (typeof this.selector) {
      case 'string':
        const elements = this.document.querySelectorAll<HTMLElement>(this.selector);
        elements.forEach(element => this.highlightedElements.push(element));
        break;

      case 'object':
        this.selector.map(selector => {
          const elements = this.document.querySelectorAll<HTMLElement>(selector);
          elements.forEach(element => this.highlightedElements.push(element));
        });
        break;

      default:
        break;
    }
  }

  showStep(): void {
    this.hintService.showingStep$.next(this);
    this.dismissible = this.dismissible || this.hintService.hintOptions.dismissible;
    this.position = this.position || this.hintService.hintOptions.defaultPosition;
    this.order = +this.order;
    const highlightedElement = this.highlightedElements[0];

    this.hightlightElements();

    if (highlightedElement) {
      if (this.hintService.hintOptions.elementsDisabled) {
        this.disableClick(highlightedElement);
      }

      if (this.hintService.hintOptions.applyRelative) {
        highlightedElement.classList.add('hint-relative');
      }

      switch (this.position) {
        case TourStepPosition.Top:
          this.transformClass = 'transformX_50 transformY_100';
          this.transformStart = 'translateX(-50%) translateY(-60%)';
          this.transformEnd = 'translateX(-50%) translateY(-100%)';
          this.topPos = highlightedElement.offsetTop - this.hintService.hintOptions.defaultLayer;
          this.leftPos = highlightedElement.offsetLeft + highlightedElement.offsetWidth / 2;
          break;
        case TourStepPosition.Bottom:
          this.transformClass = 'transformX_50';
          this.transformStart = 'translateX(-50%) translateY(-20%)';
          this.transformEnd = 'translateX(-50%) translateY(0%)';
          this.topPos = highlightedElement.offsetTop + highlightedElement.offsetHeight + this.hintService.hintOptions.defaultLayer;
          this.leftPos = highlightedElement.offsetLeft + highlightedElement.offsetWidth / 2;
          break;
        case TourStepPosition.Left:
          this.transformClass = 'transformY_50 transformX_100';
          this.transformStart = 'translateY(-50%) translateX(-75%)';
          this.transformEnd = 'translateY(-50%) translateX(-100%)';
          this.topPos = highlightedElement.offsetTop + highlightedElement.offsetHeight / 2;
          this.leftPos = highlightedElement.offsetLeft - this.hintService.hintOptions.defaultLayer;
          break;
        case TourStepPosition.Right:
          this.transformClass = 'transformY_50';
          this.transformStart = 'translateY(-50%) translateX(-10%)';
          this.transformEnd = 'translateY(-50%) translateX(0%)';
          this.topPos = highlightedElement.offsetTop + highlightedElement.offsetHeight / 2;
          this.leftPos = highlightedElement.offsetLeft + highlightedElement.offsetWidth + this.hintService.hintOptions.defaultLayer;
          break;
        case TourStepPosition.Neutral:
          this.topPos = highlightedElement.offsetTop + highlightedElement.offsetHeight / 2;
          this.leftPos = highlightedElement.offsetLeft + highlightedElement.offsetWidth + this.hintService.hintOptions.defaultLayer;
          this.transformClass = this.customCss;
          break;
        default:
          throw 'Invalid hint position ->' + this.position;
      }
    } else {
      this.transformClass = 'transformY_50 transformX_50';
      this.transformStart = 'translateY(50%) translateX(-50%)';
      this.transformEnd = 'translateY(-50%) translateX(-50%)';
      this.topPos = window.innerHeight / 2;
      this.leftPos = window.innerWidth / 2;
    }

    this.showme = true;
    this.hasNext = this.hintService.hasNext();
    this.hasPrev = this.hintService.hasPrev();

  }

  hideStep(): void {
    this.removeHightlighting();
    this.showme = false;
  }

  exit(): void {
    this.hintService.end();
  }

  next(): void {
    this.hintService.showNext();
  }

  prev(): void {
    this.hintService.showPrev();
  }

  private disableClick(element: HTMLElement): void {
    element.classList.add('hint-disabled');
  }
  private enableClick(element: HTMLElement): void {
    element.classList.remove('hint-disabled');
  }

  private hightlightElements(): void {
    this.highlightedElements.map(highlightedElement => {
      highlightedElement.style.zIndex = HintConfig.Z_INDEX;
      highlightedElement.classList.add('tour-hint-hightlight');
    });
  }

  private removeHightlighting(): void {
    this.highlightedElements.map(highlightedElement => {
      highlightedElement.style.zIndex = '0';
      this.enableClick(highlightedElement);
      highlightedElement.classList.remove('tour-hint-hightlight');
      highlightedElement.classList.remove('hint-relative');
    });
  }
}
