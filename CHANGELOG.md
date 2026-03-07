# Changelog

All notable changes to ngx-custom-tour are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html) for the library version. The major version (2.x) aligns with the supported Angular major (2.15 = Angular 15, 2.16 = Angular 16, etc.).

---

## [2.20.0] - 2025

### Added

- Support for **Angular 20** (peer dependencies `^20.0.0`).
- Compatible with TypeScript 5.8+ (required by Angular 20).

### Changed

- Updated all Angular packages to 20.2.x.
- Updated ng-packagr to 20.2.0.
- Updated zone.js to ~0.15.0.

### Version compatibility

| Angular | Library  |
| ------- | -------- |
| v20     | 2.20.0   |

---

## [2.19.0] - 2024

### Added

- Support for **Angular 19** (peer dependencies `^19.0.0`).

### Changed

- Components use Angular 19 default (standalone by default); explicit `standalone: true` removed from `TourComponent` and demo app.
- Updated all Angular packages to 19.2.x.
- Updated TypeScript to ~5.5.x.
- Updated zone.js to ~0.15.0.
- Updated ng-packagr to 19.2.x.

### Version compatibility

| Angular | Library  |
| ------- | -------- |
| v19     | 2.19.0   |

---

## [2.18.0] - 2024

### Added

- Support for **Angular 18** (peer dependencies `^18.0.0`).
- **Signal-based inputs**: `TourComponent` now uses `input()` for all public inputs (`title`, `selector`, `order`, `position`, etc.) instead of `@Input()`.
- **Reactive selector updates**: `effect()` reacts to `selector()` changes and refreshes highlighted elements or the current step.
- **Display state signals**: `displayPosition`, `displayOrder`, and `displayHasCloseButton` signals hold the effective values shown in the template (from inputs or service defaults).

### Changed

- `NgxCustomTourService.register()` now reads step order via `component.order()` (signal).
- `position` and `displayPosition` typed as `string` for flexible template bindings (e.g. `position="top"`).
- Demo app uses `provideAnimationsAsync()` instead of `provideAnimations()` for lazy-loaded animations.

### Version compatibility

| Angular | Library  |
| ------- | -------- |
| v18     | 2.18.0   |

---

## [2.17.0] - 2023

### Added

- Support for **Angular 17** (peer dependencies `^17.0.0`).
- **New control flow**: Tour component template uses `@if` instead of `*ngIf`.
- **Standalone component**: `TourComponent` is standalone; `NgxCustomTourModule` imports and re-exports it for both standalone and NgModule apps.
- **Modern DI**: `TourComponent` uses `inject(DOCUMENT)` and `inject(NgxCustomTourService)` instead of constructor injection.
- **`TourStepPosition` export**: Exported from the public API for type-safe `position` binding.
- Demo app migrated to **standalone bootstrap**: `bootstrapApplication()` with `provideRouter()` and `provideAnimations()`.
- Demo app uses **new control flow** (`@if`, `@switch`) in templates.

### Changed

- Animation binding uses a getter `animationState` to avoid ICU/brace parsing issues in templates.
- Template moved to `tour.component.html` for correct parsing of control flow syntax.
- Style bindings use `[style.top.px]` and `[style.left.px]` instead of `ngStyle`.
- `removeHightlighting()` uses `forEach` instead of `map`; selector iteration uses `forEach` for array typing.
- Removed deprecated `defaultProject` from `angular.json`.
- Updated TypeScript to ~5.2.x, zone.js to ~0.14.x, RxJS to ~7.8.

### Version compatibility

| Angular | Library  |
| ------- | -------- |
| v17     | 2.17.0   |

---

## [2.16.0] - 2023

### Added

- Support for **Angular 16** (peer dependencies `^16.0.0`).
- `@angular/animations` added as a peer dependency (required by the tour component).

### Changed

- Updated all Angular packages to 16.2.x.
- Updated zone.js to ~0.13.0.
- Updated TypeScript to ~4.9.x.
- Updated ng-packagr to 16.2.x.
- Removed deprecated `defaultProject` from `angular.json`.

### Version compatibility

| Angular | Library  |
| ------- | -------- |
| v16     | 2.16.0   |

---

## [2.15.0] - 2022

### Added

- Support for **Angular 15** (peer dependencies `^15.0.0`).
- Version scheme aligned with Angular major: 2.15.0 for Angular 15, 2.16.0 for Angular 16, etc.
- `TourStepPosition` exported from the public API.

### Changed

- Replaced `Object.assign` with a type-safe merge in `NgxCustomTourService.initialize()` (no type assertions).
- Updated all Angular packages to 15.2.x.
- Updated TypeScript to ~4.8.x, zone.js to ~0.12.x, RxJS to ~7.8.
- Updated ng-packagr to 15.x.
- README and assets (including README) prepared for publishing.

### Version compatibility

| Angular | Library  |
| ------- | -------- |
| v15     | 2.15.0   |

---

## [1.1.x] - Earlier

- **1.1.0**: Angular 14 support.
- **1.x.x**: `selector` is optional; `order` is required and must be unique.
- **0.1.7**: Angular 13.
- **0.1.6**: Angular below v12.

For Angular 14 and below, use the corresponding library version from the [README](projects/ngx-custom-tour/README.md#version-compatibility) version table.

---

[2.20.0]: https://github.com/miraxes/ngx-custom-tour/compare/v2.19.0...v2.20.0
[2.19.0]: https://github.com/miraxes/ngx-custom-tour/compare/v2.18.0...v2.19.0
[2.18.0]: https://github.com/miraxes/ngx-custom-tour/compare/v2.17.0...v2.18.0
[2.17.0]: https://github.com/miraxes/ngx-custom-tour/compare/v2.16.0...v2.17.0
[2.16.0]: https://github.com/miraxes/ngx-custom-tour/compare/v2.15.0...v2.16.0
[2.15.0]: https://github.com/miraxes/ngx-custom-tour/compare/v1.1.2...v2.15.0
