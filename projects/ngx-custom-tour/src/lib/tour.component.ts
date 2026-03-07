import { DOCUMENT } from '@angular/common';
import { Component, effect, inject, input, OnInit, signal } from '@angular/core';
import { fromEvent } from 'rxjs';
import { tourHintAnimation } from './animations';
import { getPath, setHintPosition, TourStepPosition } from './highlight-helper';
import { NgxCustomTourService } from './ngx-custom-tour.service';
import { HintConfig } from './variables';

@Component({
  selector: `${HintConfig.HINT_TAG}[order]`,
  standalone: true,
  imports: [],
  templateUrl: './tour.component.html',
  animations: [tourHintAnimation]
})
export class TourComponent implements OnInit {
  private readonly document = inject(DOCUMENT);
  readonly hintService = inject(NgxCustomTourService);

  readonly title = input('');
  readonly selector = input<string | string[] | undefined>(undefined);
  readonly order = input(0, { transform: (v: number) => +v });
  readonly position = input<string>(TourStepPosition.Bottom);
  readonly hasCloseButton = input(true);
  readonly isFooterVisible = input(true);
  readonly customCss = input('');
  readonly prevButtonText = input('←');
  readonly nextButtonText = input('→');
  readonly finishButtonText = input('Finish');

  readonly displayPosition = signal<string>(TourStepPosition.Bottom);
  readonly displayOrder = signal(0);
  readonly displayHasCloseButton = signal(true);

  showme = false;
  hasNext = false;
  hasPrev = false;
  topPos = 1;
  leftPos = 1;
  highlightedElements: HTMLElement[] = [];
  transformClass = 'transformX_50 transformY_100';
  transformStart: boolean | string = 'translateX(-50%) translateY(-60%)';
  transformEnd: boolean | string = 'translateX(-50%) translateY(-100%)';
  path = '';

  constructor() {
    effect(() => {
      this.selector();
      if (this.showme) {
        this.updateHighlightedElements();
      } else {
        this.getHighlightedElements();
      }
    }, { allowSignalWrites: true });
  }

  get animationState(): { value: boolean | string; params: { transformStart: string; transformEnd: string } } {
    return {
      value: this.transformStart,
      params: {
        transformStart: String(this.transformStart),
        transformEnd: String(this.transformEnd)
      }
    };
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
    this.displayHasCloseButton.set(this.hasCloseButton() || this.hintService.hintOptions.hasCloseButton);
    this.displayPosition.set(this.position() || this.hintService.hintOptions.defaultPosition);
    this.displayOrder.set(this.order());
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
    this.highlightedElements.forEach(highlightedElement => {
      highlightedElement.style.zIndex = '0';
      this.enableClick(highlightedElement);
      highlightedElement.classList.remove('tour-hint-hightlight');
      highlightedElement.classList.remove('hint-relative');
    });
  }

  updateHighlightedElements(): void {
    this.removeHightlighting();
    this.showStep();
  }

  private getHighlightedElements(): void {
    this.highlightedElements = [];
    const sel = this.selector();
    switch (typeof sel) {
      case 'string': {
        const elements = this.document.querySelectorAll<HTMLElement>(sel);
        elements.forEach(element => this.highlightedElements.push(element));
        break;
      }
      case 'object':
        if (sel) {
          sel.forEach(s => {
            const elements = this.document.querySelectorAll<HTMLElement>(s);
            elements.forEach(element => this.highlightedElements.push(element));
          });
        }
        break;
      default:
        break;
    }
  }

  setHintPosition(): void {
    const { transformClass, transformStart, transformEnd, topPos, leftPos } = setHintPosition(
      this.displayPosition(),
      this.highlightedElements,
      this.hintService,
      this.customCss()
    );
    this.transformClass = transformClass;
    this.transformStart = transformStart;
    this.transformEnd = transformEnd;
    this.topPos = topPos;
    this.leftPos = leftPos;
  }
}
