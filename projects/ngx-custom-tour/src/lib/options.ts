import { HintConfig } from './variables';

export interface IHintOptions {
    elementsDisabled?: boolean;
    defaultPosition?: string;
    defaultLayer?: number;
    applyRelative?: boolean;
    stepTag?: string;
    dismissOnOverlay?: boolean;
    dismissible?: boolean;
}

export class HintOptions implements IHintOptions {
    elementsDisabled = true;
    defaultPosition = HintConfig.DEFAULT_POSITION;
    defaultLayer = HintConfig.DEFAULT_PX_LAYER;
    applyRelative = HintConfig.APPLY_RELATIVE;
    stepTag = HintConfig.HINT_TAG;
    dismissOnOverlay = HintConfig.DISMISS_ON_OVERLAY;
    dismissible = HintConfig.DISMISSIBLE;
}
