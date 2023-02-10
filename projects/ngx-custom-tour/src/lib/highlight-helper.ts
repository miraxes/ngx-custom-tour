import { NgxCustomTourService } from "./ngx-custom-tour.service";
import { TourStepPosition } from "./tour.component";

export const getPath = (elements: HTMLElement[]): string => {
  const { innerWidth, innerHeight } = window;

  const points: string[] = elements.map(element => {
    const { left, top, width, height } = element.getBoundingClientRect();
  
    const edges = {
      top: top,
      right: left + width,
      bottom: top + height,
      left: left,
    }
    
    const pointsPath = {
      leftTop: `M${edges.left},${edges.top} Q${edges.left},${edges.top} ${edges.left},${edges.top}`,
      rightTop: `V${edges.top} Q${edges.right},${edges.top} ${edges.right},${edges.top}`,
      rightBottom: `H${edges.right} Q${edges.right},${edges.bottom} ${edges.right},${edges.bottom}`,
      leftBottom: `V${edges.bottom} Q${edges.left},${edges.bottom} ${edges.left},${edges.bottom}`
    }

    return `
      ${pointsPath.leftTop}
      ${pointsPath.leftBottom}
      ${pointsPath.rightBottom}
      ${pointsPath.rightTop}
    `;
  });
  
  return `
    M${innerWidth},${innerHeight}
    H0V0
    H${innerWidth}V${innerHeight}
    Z
    ${points.join('Z')}
    Z
  `;
}

export const setHintPosition = (position: string, elements: HTMLElement[], hintService: NgxCustomTourService, customCss?: string): any => {
  const highlightedElement = elements[0];
  if (highlightedElement) {
    switch (position) {
      case TourStepPosition.Top:
        return {
          transformClass: 'transformX_50 transformY_100',
          transformStart: 'translateX(-50%) translateY(-60%)',
          transformEnd: 'translateX(-50%) translateY(-100%)',
          topPos: highlightedElement.offsetTop - hintService.hintOptions.defaultLayer,
          leftPos: highlightedElement.offsetLeft + highlightedElement.offsetWidth / 2,
        };
      case TourStepPosition.Bottom:
        return {
          transformClass: 'transformX_50',
          transformStart: 'translateX(-50%) translateY(-20%)',
          transformEnd: 'translateX(-50%) translateY(0%)',
          topPos: highlightedElement.offsetTop + highlightedElement.offsetHeight + hintService.hintOptions.defaultLayer,
          leftPos: highlightedElement.offsetLeft + highlightedElement.offsetWidth / 2,
        };
      case TourStepPosition.Left:
        return {
          transformClass: 'transformY_50 transformX_100',
          transformStart: 'translateY(-50%) translateX(-75%)',
          transformEnd: 'translateY(-50%) translateX(-100%)',
          topPos: highlightedElement.offsetTop + highlightedElement.offsetHeight / 2,
          leftPos: highlightedElement.offsetLeft - hintService.hintOptions.defaultLayer,
        };
      case TourStepPosition.Right:
        return {
          transformClass: 'transformY_50',
          transformStart: 'translateY(-50%) translateX(-10%)',
          transformEnd: 'translateY(-50%) translateX(0%)',
          topPos: highlightedElement.offsetTop + highlightedElement.offsetHeight / 2,
          leftPos: highlightedElement.offsetLeft + highlightedElement.offsetWidth + hintService.hintOptions.defaultLayer,
        };
      case TourStepPosition.Neutral:
        return {
          topPos: highlightedElement.offsetTop + highlightedElement.offsetHeight / 2,
          leftPos: highlightedElement.offsetLeft + highlightedElement.offsetWidth + hintService.hintOptions.defaultLayer,
          transformClass: customCss,
        };
      default:
        throw 'Invalid hint position ->' + position;
    }
  } else {
    return {
      transformClass: 'transformY_50 transformX_50',
      transformStart: 'translateY(50%) translateX(-50%)',
      transformEnd: 'translateY(-50%) translateX(-50%)',
      topPos: window.innerHeight / 2,
      leftPos: window.innerWidth / 2,
    };
  }
}
