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

### `getElementRect(element, offsetParent)`

Get an element dimensions and position relative to the *document* root while ignoring all transforms

**See also:** `DomMeasurements.getBoundingRect` to calculate dimensions relative to window

**Parameters:**  
  `element: HTMLElement` — The element to measure  
  `offsetParent?: HTMLElement` — The topmost offset parent to calculate position against, if passed an element which is not an offset parent or not a parent of element will be ignored.  
**Returns:** `Rect`

### `getBoundingRect(element, offsetParent, scrollContainer = window)`

Get an element dimensions and position relative to the *window* while ignoring all transforms

**Parameters:**  
  `element: HTMLElement` — The element to measure  
  `offsetParent?: HTMLElement` — Optional topmost offset parent to calculate position from, will be ignored if passed an element which is not an offset parent or not a parent.  
  `scrollContainer?: Window|HTMLElement` — Optional alternative element to calculate scroll from. Can also be used to mock window  
**Returns:** `Rect`

### `getContentRect(element, offsetParent, childTags)`

Get an element and all it's children dimensions and position relative to the *document* root while ignoring all transforms

**Parameters:**  
  `element: HTMLElement` — The element to measure  
  `offsetParent?: HTMLElement` — Optional topmost offset parent to calculate position against, if passed an element which is not an offset parent or not a parent of element will be ignored.  
  `childTags?: HTMLElement` — Optional element tags to filter by (for example, if you have components that their known root is always a 'div', you can save some recursion loops)  
**Returns:** `Rect`

### `getBoundingContentRect(element, offsetParent, childTags, scrollContainer = window)`

Get an element and all it's children dimensions and position relative to the *window* while ignoring all transforms

**Parameters:**  
  `element: HTMLElement` — The element to measure  
  `offsetParent?: HTMLElement` — the topmost offset parent to calculate position against, if passed an element which is not an offset parent or not a parent of element will be ignored.  
  `childTags?: HTMLElement` — element tags to get, defaults to ['div'] tags  
  `scrollContainer?: Window|HTMLElement` — optional alternative element to calculate scroll from. Can also be used to mock window  
**Returns:** `Rect`
