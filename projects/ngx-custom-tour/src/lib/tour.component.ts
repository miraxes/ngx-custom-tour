import { DOCUMENT } from '@angular/common';
import { Component, Inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { fromEvent } from 'rxjs';
import { tourHintAnimation } from './animations';
import { getPath, setHintPosition, TourStepPosition } from './highlight-helper';
import { NgxCustomTourService } from './ngx-custom-tour.service';
import { HintConfig } from './variables';

@Component({
  selector: `${HintConfig.HINT_TAG}[order]`,
  template: `<div class="intro-tour-hint-wrapper {{transformClass}} step{{order}} {{position}}"
  *ngIf="showme" [ngStyle]="{'top': topPos+'px', 'left': leftPos+'px'}"
  [@tourHintAnimation]="{value: transformStart, params: { transformStart: transformStart, transformEnd: transformEnd}}">
    <div class="header" *ngIf="title">
        {{title}}
        <a *ngIf="hasCloseButton" class="header-btn__close scalable" (click)="exit()">&#10006;</a>
    </div>
    <div class="content"><ng-content></ng-content></div>
    <div class="footer" *ngIf="isFooterVisible">
      <a class="navigate-btn navigate-btn__previous scalable" *ngIf="hasPrev" (click)="prev()">{{prevButtonText}}</a>
      <a class="navigate-btn navigate-btn__next scalable" *ngIf="hasNext" (click)="next()">{{nextButtonText}}</a>
      <a class="navigate-btn navigate-btn__finish scalable" *ngIf="!hasNext" (click)="exit()">{{finishButtonText}}</a>
    </div>
  </div>
  <div
    *ngIf="showme"
    class="overlay"
    (click)="hintService.hintOptions.dismissOnOverlay ? exit() : next()"
    [ngStyle]="{ 'pointer-events': hintService.hintOptions.elementsDisabled ? 'auto' : 'none' }"
  >
    <svg>
      <svg:path [attr.d]="path"></svg:path>
    </svg>
  </div>`,
  animations: [tourHintAnimation]
})
export class TourComponent implements OnInit, OnChanges {
  @Input() title: string = '';
  @Input() selector?: string | string[];
  @Input() order: number = 0;
  @Input() position: string = TourStepPosition.Bottom;
  @Input() public hasCloseButton: boolean = true;
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
  path: string = '';
  constructor(public hintService: NgxCustomTourService,
              @Inject(DOCUMENT) private document: Document) {
  }

  ngOnInit(): void {
    this.hintService.register(this);
    fromEvent(window, 'resize').subscribe({
      next: () => {
        if (this.showme) {
          this.setHintPosition();
          this.hightlightElements();
        }
      }
    });

    fromEvent(window, 'scroll').subscribe({
      next: () => {
        if (this.showme) {
          this.hightlightElements();
        }
      }
    });
  }

  showStep(): void {
    this.getHighlightedElements();
    this.hintService.showingStep$.next(this);
    this.hasCloseButton = this.hasCloseButton || this.hintService.hintOptions.hasCloseButton;
    this.position = this.position || this.hintService.hintOptions.defaultPosition;
    this.order = +this.order;
    this.hightlightElements();
    const highlightedElement = this.highlightedElements[0];
    if (highlightedElement) {
      if (this.hintService.hintOptions.elementsDisabled) {
        this.disableClick(highlightedElement);
      }

      if (this.hintService.hintOptions.applyRelative) {
        highlightedElement.classList.add('hint-relative');
      }
    }
    this.setHintPosition();

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
    this.path = getPath(this.highlightedElements);
  }

  private removeHightlighting(): void {
    this.highlightedElements.map(highlightedElement => {
      highlightedElement.style.zIndex = '0';
      this.enableClick(highlightedElement);
      highlightedElement.classList.remove('tour-hint-hightlight');
      highlightedElement.classList.remove('hint-relative');
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selector']) {
      this.showme ? this.updateHighlightedElements() : this.getHighlightedElements();
    }
  }

  public updateHighlightedElements(): void {
    this.removeHightlighting();
    this.showStep();
  }

  private getHighlightedElements(): void {
    this.highlightedElements = [];
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

  public setHintPosition(): void {
    const { transformClass, transformStart, transformEnd, topPos, leftPos } = setHintPosition(this.position, this.highlightedElements, this.hintService, this.customCss);
    this.transformClass = transformClass;
    this.transformStart = transformStart;
    this.transformEnd = transformEnd;
    this.topPos = topPos;
    this.leftPos = leftPos;
  }
}
