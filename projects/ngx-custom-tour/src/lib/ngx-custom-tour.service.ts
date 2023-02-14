import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { TourComponent } from './tour.component';
import { HintOptions, IHintOptions } from './options';
import { HintConfig } from './variables';

export interface Step {
  selector: string;
  order: number;
}

const NULL_STEP = {selector: HintConfig.HINT_TAG, order: -1};

@Injectable({
  providedIn: 'root'
})
export class NgxCustomTourService {

  currentStep: Step = NULL_STEP;
  steps: Step[] = [];
  hintOptions: HintOptions = new HintOptions();
  anchors: { [selector: string]: TourComponent } = {};
  registration$: Subject<boolean> = new Subject();
  finish$: Subject<boolean> = new Subject();
  showingStep$: Subject<TourComponent> = new Subject();

  /**
   * Initialize hint service
   * @method initialize
   * @param  {HintOptions} options init options
   * @return void
   */
  public initialize(options: IHintOptions = new HintOptions()): void {
    this.hintOptions = (<any>Object).assign(new HintOptions(), options);
    let nodes = document.getElementsByTagName(this.hintOptions.stepTag);
    this.steps = this.initSteps(nodes);
    this.startAt(0);
  }
  /**
   * Refresh highlighted elements
   * @method updateHighlightedElements
   * @return void
   */
  public updateHighlightedElements(): void {
    const anchor = this.anchors[this.currentStep.order];
    anchor.updateHighlightedElements();
  }
  /**
   * Refresh hint position
   * @method setHintPosition
   * @return void
   */
  public setHintPosition(): void {
    const anchor = this.anchors[this.currentStep.order];
    anchor.setHintPosition();
  }
  /**
   * Show step
   * @method show
   * @param  {Step} step [description]
   */
  public show(step: Step): void {
    const anchor = this.anchors[step.order];
    if (!anchor) {
      return;
    }
    anchor.showStep();
  }
  /**
   * Show step next to {Step} this.currentStep
   * @method showNext
   */
  public showNext(): void {
    if (!this.hasNext()) {
      this.end();
      return;
    }
    this.anchors[this.currentStep.order].hideStep();
    this.currentStep = this.steps[this.steps.indexOf(this.currentStep) + 1];
    const anchor = this.anchors[this.currentStep.order];
    anchor.showStep();
  }
  /**
   * Show step previous to {Step} this.currentStep
   * @method showPrev
   */
  public showPrev(): void {
    this.anchors[this.currentStep.order].hideStep();
    this.currentStep = this.steps[this.steps.indexOf(this.currentStep) - 1];
    const anchor = this.anchors[this.currentStep.order];
    if (!anchor) {
      return;
    }
    anchor.showStep();
  }
  /**
   * Register hint component
   * @method register
   * @param  {string}            selector  binded to
   * @param  {TourComponent} component itself
   */
  public register(component: TourComponent): void {
    if (this.anchors[component.order]) {
      throw new Error(`Duplicated step orders. Step's order must be unique.`);
    }
    this.anchors[component.order] = component;
    this.registration$.next(true);
  }
  /**
   * Is {Step} this.currentStep has next
   * @method hasNext
   * @return {boolean}
   */
  public hasNext(): boolean {
    return this.steps.indexOf(this.currentStep) < this.steps.length - 1;
  }

  /**
   * Is {Step} this.currentStep has previous
   * @method hasPrev
   * @return {boolean}
   */
  public hasPrev(): boolean {
    return this.steps.indexOf(this.currentStep) > 0;
  }
  /**
   * Finalize our hint tour.
   * @method end
   */
  public end(): void {
    const anchor = this.anchors[this.currentStep.order];
    if (!anchor) {
      return;
    }
    this.currentStep = NULL_STEP;
    anchor.hideStep();
    this.finish$.next(true);
  }
  /**
   * Start hint tour at some position
   * @method startAt
   * @param  {number} stepId position in this.steps
   */
  public startAt(stepId: number): void {
    this.currentStep = this.steps[stepId];
    this.show(this.currentStep);
  }
  /**
   * Convert Element[] to Step[]
   * @method initSteps
   * @param  {NodeListOf<Element>} nodes
   * @return {Step[]}
   */
  private initSteps(nodes: HTMLCollectionOf<Element>): Step[] {
    let steps: Step[] = [];
    for (let i = 0; i < nodes.length; i++) {
        steps.push({
          selector: nodes[i].getAttribute('ng-reflect-selector') || this.getSelectorFromClassName('selector', nodes[i]) ||'',
          order: parseFloat(nodes[i].getAttribute('ng-reflect-order') || this.getSelectorFromClassName('order', nodes[i]) || '') || i,
        });
    }
    return steps = steps.sort((el1, el2) => {
      return el1.order - el2.order;
    });
  }

  private getSelectorFromClassName(selector: string, node: Element) {
    let result;
    node.classList.forEach(klass => {
      if (klass.startsWith(`${selector}-`)) {
        result = klass.split(`${selector}-`)[1];
      }
    })
    return result;
  }
}
