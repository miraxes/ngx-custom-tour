This is new a bit extended version of
[https://github.com/miraxes/angular-custom-tour](https://github.com/miraxes/angular-custom-tour).

For versions less than Angular v6, please use older version of this library.

[![Downloads](https://img.shields.io/npm/dt/ngx-custom-tour.svg?style=flat-square)](https://www.npmjs.com/package/ngx-custom-tour)
[![Versions](https://img.shields.io/npm/v/ngx-custom-tour.svg?style=flat-square)](https://www.npmjs.com/package/ngx-custom-tour)
[![License](https://img.shields.io/npm/l/ngx-custom-tour.svg?style=flat-square)](https://opensource.org/licenses/MIT)

# Versions
| angular           | library     |
| ----------------- |:-----------:|
| below v12         | 0.1.6       |
| v13               | 0.1.7       |
| v14               | 1.0.0       |

## Breaking change
Starting from 1.x.x selector is not required anymore.
Instead we have `order` which REQUIRED and must be UNIQUE.

# Usage

* install `npm install ngx-custom-tour --save`

In your module (app.module.ts)
  ```typescript
  import { NgxCustomTourModule } from 'ngx-custom-tour'

  @NgModule({
    ...
    imports: [
      ...
      NgxCustomTourModule // Put here
      ...
    ]
    ...
  ]
  ```
Note: You'll need to import BrowserAnimationsModule too;

Initialize it in your page component

> In case you want to init slider after pageload, you should use ngAfterViewInit
  ```typescript
  import { NgxCustomTourService } from 'ngx-custom-tour'

  @Component({
    ...
    providers: [... NgxCustomTourService ... ],
    ...
  })

  class AppComponent {

    constructor(public customTourService: NgxCustomTourService){ }

    startTour() {
      this.customTourService.initialize();
    }

  }
  ```

  ```html
  <!-- Bluring element insert on top of the page-->
  <ngx-custom-tour-overlay></ngx-custom-tour-overlay>

  <!-- start TOUR -->
  <button name="button" (click)="startTour()"> START!</button>

  <!-- Each step could be placed at ANYWHERE -->
  <div class="i-want-highlight-this" id="highlight-me"> WOW!</div>

  <tour-step selector="highlight-me" [order]="3" position="right" title="title string">
    <!-- ANY HTML HERE
      NOTE: ONLY order attribute is required! others is up to you
    -->
  </tour-step>
  ```
  ## NOTE:

  > order MUST BE unique

## Styles

You need to inject styles from `node_modules/ngx-custom-tour/styles/styles.scss`

Feel free to import those styles directly to your scss
Also, we added some scss variables to let you adjust styles just in one line.
# Scss variables
| variable                   | default           |
| -------------------------- |:-----------------:|
| $ct-overlay-opacity        | rgba(0, 0, 0, .6) |
| $ct-header-font-size       | 14px              |
| $ct-container-min-width    | 200px             |
| $ct-primary-color          | #00b2f2           |
| $ct-secondary-color        | #8D0876           |

# Custom options Usage

```typescript
  startTour() {
    this.customTourService.initialize({elementsDisabled: false}); // HintOptions
  }
```

## HintOptions

| option                     | default   | Usage  |
| -------------------------- |:---------:| ------ |
| elementsDisabled: boolean  | true      | Disabling highlightedElement (click) wont work|
| dismissOnOverlay: boolean  | false     | Go to next step when clicking on overlay (close tour if this is last step)|
| defaultPosition: string    | 'bottom'  | Position of tour step to highlightedElement |
| defaultLayer: number       | 15        | Distance between highlightedElement and step in px |
| applyRelative: boolean     | true      | Applying position:relative to highlightedElement (disable in case you want to highlight absolute positioned elements) |


##  Hint service events

| event         | Description  |
| ------------- | ------------ |
| finish$       | When tour is finished |
| showingStep$  | On each step show (Params > CurrentStep) |


This module in ~active~ development mode, if you have any suggestions feel free to contact me.
