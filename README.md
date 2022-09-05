# dom-measurements

Like getBoundingClinetRect but without transforms

## Usage

```javascript
import { 
    getBoundingRect, 
    getElementRect, 
    getContentRect, 
    getBoundingContentRect,
} from 'https://tombigel.github.io/dom-measurements/index.js';
```

## Documentation

```typescript
type Rect = {
    top: number;
    left: number;
    bottom: number;
    right: number;
    width: number;
    height: number;
}
```

### getElementRect

Get an element dimensions and position relative to the *document* root while ignoring all transforms  

```typescript
type getElementRect = (
    element: HTMLElement, 
    // The element to measure 
    offsetParent?: HTMLElement 
    // Optional topmost offset parent to calculate position against, if passed an element which is 
    // not an offset parent or not a parent of element will be ignored.  
) => Rect;
```

**See also:** [getBoundingRect](#getBoundingRect) to calculate dimensions relative to window

### getBoundingRect

Get an element dimensions and position relative to the *window* while ignoring all transforms

```typescript
type getBoundingRect = (
    element: HTMLElement, 
    // The element to measure  
    offsetParent?: HTMLElement, 
    // Optional topmost offset parent to calculate position against, if passed an element which is 
    // not an offset parent or not a parent of element will be ignored.  
    scrollContainer?: HTMLElement | Window 
    // Optional alternative element to calculate scroll from. Can also be used to mock window  
) => Rect;
```

### getContentRect

Get an element and all it's children dimensions and position relative to the *document* root while ignoring all transforms

```typescript
type getContentRect = (
    element: HTMLElement, 
    // The element to measure 
    offsetParent?: HTMLElement, 
    // Optional topmost offset parent to calculate position against, if passed an element which is 
    // not an offset parent or not a parent of element will be ignored.  
    childTags?: HTMLElement[] 
    // Optional list of tagnames to filter by (for example, if you have components that their 
    // known root is always a 'div', you can save some recursion loops)
) => Rect
```

### getBoundingContentRect

Get an element and all it's children dimensions and position relative to the *window* while ignoring all transforms

```typescript
type getBoundingContentRect = (
    element: HTMLElement, 
    // The element to measure  
    offsetParent?: HTMLElement, 
    // Optional topmost offset parent to calculate position against, if passed an element which is 
    // not an offset parent or not a parent of element will be ignored.  ignored.  
    childTags?: HTMLElement[] 
    // Optional list of tagnames to filter by (for example, if you have components that their 
    // known root is always a 'div', you can save some recursion loops)
    scrollContainer?: HTMLElement | Window 
    // Optional alternative element to calculate scroll from. Can also be used to mock window  
) => Rect
```
