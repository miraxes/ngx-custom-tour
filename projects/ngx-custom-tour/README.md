# ngx-custom-tour

Easy to customize step-by-step tour / onboarding for Angular 15+.

[![Downloads](https://img.shields.io/npm/dt/ngx-custom-tour.svg?style=flat-square)](https://www.npmjs.com/package/ngx-custom-tour)
[![Versions](https://img.shields.io/npm/v/ngx-custom-tour.svg?style=flat-square)](https://www.npmjs.com/package/ngx-custom-tour)
[![License](https://img.shields.io/npm/l/ngx-custom-tour.svg?style=flat-square)](https://opensource.org/licenses/MIT)

## Version compatibility

| Angular | Library  |
| -------- | -------- |
| v15      | 2.15.0   |
| v16      | 2.16.0   |
| v17      | 2.17.0   |
| v18      | 2.18.0   |

Install the library version that matches your Angular major version.

## Installation

```bash
npm install ngx-custom-tour
```

## Setup

### Standalone (Angular 17+)

In `main.ts`, provide the router and animations when bootstrapping:

```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AppComponent } from './app/app.component';

const routes: Routes = [];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync()
  ]
}).catch(err => console.error(err));
```

In the component that hosts the tour, import the module and inject the service:

```typescript
import { Component, inject } from '@angular/core';
import { NgxCustomTourModule, NgxCustomTourService } from 'ngx-custom-tour';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgxCustomTourModule],
  templateUrl: './app.component.html'
})
export class AppComponent {
  readonly hintService = inject(NgxCustomTourService);

  startTour(): void {
    this.hintService.initialize();
  }
}
```

### NgModule

In your app module, import `NgxCustomTourModule` and `BrowserAnimationsModule` (or `provideAnimations()` in the app config):

```typescript
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxCustomTourModule } from 'ngx-custom-tour';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    NgxCustomTourModule
  ]
})
export class AppModule {}
```

Inject the service in any component (it is provided in root):

```typescript
import { Component, inject } from '@angular/core';
import { NgxCustomTourService } from 'ngx-custom-tour';

@Component({ ... })
export class MyComponent {
  readonly hintService = inject(NgxCustomTourService);

  startTour(): void {
    this.hintService.initialize();
  }
}
```

## Template usage

Add a button to start the tour and one or more `<tour-step>` elements. Each step can be placed anywhere in the template. **`order` is required and must be unique** across all steps.

```html
<button (click)="startTour()">Start tour</button>

<tour-step [order]="1" position="top" title="Welcome">
  Optional HTML content for this step.
</tour-step>

<tour-step selector="#my-element" [order]="2" position="bottom" title="Next step">
  This step highlights the element matching <code>#my-element</code>.
</tour-step>

<tour-step [selector]="dynamicSelector" [order]="3" position="left" title="Dynamic target">
  Selector can be bound to a component property (string or array of selectors).
</tour-step>
```

### `<tour-step>` inputs

| Input              | Type                | Default   | Description |
| ------------------ | ------------------- | --------- | ----------- |
| `order`            | `number`            | required  | Step order (must be unique). |
| `selector`         | `string \| string[]`| —         | CSS selector(s) for the element(s) to highlight. Omit to show step without a highlight. |
| `position`         | `string`            | `'bottom'`| Position of the tooltip: `'top'`, `'bottom'`, `'left'`, `'right'`, `'neutral'`. |
| `title`            | `string`            | `''`      | Step title shown in the header. |
| `prevButtonText`   | `string`            | `'←'`     | Label for the previous button. |
| `nextButtonText`   | `string`            | `'→'`     | Label for the next button. |
| `finishButtonText` | `string`            | `'Finish'`| Label for the finish button on the last step. |
| `hasCloseButton`   | `boolean`           | `true`    | Show the header close (×) button. |
| `isFooterVisible`  | `boolean`           | `true`    | Show prev/next/finish footer. |
| `customCss`        | `string`            | `''`      | Extra CSS class for `position="neutral"`. |

You can use the `TourStepPosition` enum for type-safe positions:

```typescript
import { TourStepPosition } from 'ngx-custom-tour';

// In template: [position]="tourStepPosition.Top"
tourStepPosition = TourStepPosition;
```

## Initialize options

Pass options when starting the tour to change default behaviour:

```typescript
startTour(): void {
  this.hintService.initialize({
    dismissOnOverlay: false,
    elementsDisabled: false,
    defaultPosition: 'top',
    hasCloseButton: true
  });
}
```

### HintOptions

| Option                | Type     | Default  | Description |
| --------------------- | -------- | -------- | ----------- |
| `elementsDisabled`    | `boolean`| `true`   | When true, prevent clicks on the highlighted element. |
| `dismissOnOverlay`    | `boolean`| `true`   | Clicking the overlay goes to next step (or finishes on last step). |
| `defaultPosition`     | `string` | `'bottom'` | Default tooltip position for steps. |
| `defaultLayer`        | `number` | `15`     | Distance in px between highlighted element and tooltip. |
| `applyRelative`       | `boolean`| `true`   | Apply `position: relative` to the highlighted element. Set to `false` for absolutely positioned targets. |
| `stepTag`             | `string` | `'tour-step'` | Tag name used to discover steps (advanced). |
| `hasCloseButton`      | `boolean`| `true`   | Default visibility of the header close button. |

## Service events

| Event         | Type                    | Description |
| -------------- | ----------------------- | ----------- |
| `finish$`      | `Subject<boolean>`       | Emits when the tour is finished (closed or completed). |
| `showingStep$` | `Subject<TourComponent>` | Emits the current step component each time a step is shown. |

Example:

```typescript
ngOnInit(): void {
  this.hintService.finish$.subscribe(() => {
    console.log('Tour finished');
  });
}
```

## Dynamic content

If the DOM changes after the tour has started (e.g. new elements or selector targets), call `updateHighlightedElements()` so the current step’s highlight is updated:

```typescript
this.hintService.updateHighlightedElements();
```

Use this for steps whose `selector` target is added or shown dynamically.

## Styles

Import the library styles in your global styles (e.g. `styles.scss`):

```scss
@use 'ngx-custom-tour/styles/styles.scss';
```

Optional SCSS variables (define before the import to override):

| Variable                | Default           |
| ----------------------- | ----------------- |
| `$ct-overlay-opacity`   | `rgba(0, 0, 0, .6)` |
| `$ct-header-font-size`  | `14px`            |
| `$ct-container-min-width` | `200px`         |
| `$ct-primary-color`    | `#00b2f2`         |
| `$ct-secondary-color`   | `#8D0876`         |

Example:

```scss
$ct-primary-color: #1976d2;
@use 'ngx-custom-tour/styles/styles.scss';
```

## API summary

- **`NgxCustomTourService.initialize(options?)`** — Start the tour (scans the DOM for `<tour-step>` and shows the first step).
- **`NgxCustomTourService.updateHighlightedElements()`** — Refresh the current step’s highlight (e.g. after dynamic DOM changes).
- **`NgxCustomTourService.finish$`** — Observable that emits when the tour ends.
- **`NgxCustomTourService.showingStep$`** — Observable that emits the current step component when a step is shown.

---

This library supports Angular 15–18. For suggestions or issues, open a ticket on [GitHub](https://github.com/miraxes/ngx-custom-tour).
