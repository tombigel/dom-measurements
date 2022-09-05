export type Rect = {
    top: number;
    left: number;
    bottom: number;
    right: number;
    width: number;
    height: number;
}

export type getElementRect = (element: HTMLElement, offsetParent?: HTMLElement) => Rect;
export type getBoundingRect = (element: HTMLElement, offsetParent?: HTMLElement, scrollContainer?: HTMLElement | Window) => Rect;
export type getContentRect = (element: HTMLElement, offsetParent?: HTMLElement, childTags?: string[]) => Rect
export type getBoundingContentRect = (element: HTMLElement, offsetParent?: HTMLElement, childTags?: string[], scrollContainer?: HTMLElement | Window) => Rect
