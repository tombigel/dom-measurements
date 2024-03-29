/**
 * @module DomMeasurements
 * @description Measure dom like getBoundingClientRect but ignore css transforms.
 */

/**
 * Get offset added by borders of an element (from computedStyle)
 * @param {HTMLElement} element The element to measure
 * @returns {{top: Number, left: Number}} the border offset dimensions
 */
function getBordersOffset(element) {
  const computedStyle = window.getComputedStyle(element);
  return {
    top: parseFloat(computedStyle.getPropertyValue('border-top-width'), 10),
    left: parseFloat(computedStyle.getPropertyValue('border-left-width'), 10)
  };
}

/**
 * Does element has overflow (from computedStyle)?
 * @param {HTMLElement} element The element to measure
 * @return {Boolean}
 */
const hasOverflow = element =>
  window.getComputedStyle(element).getPropertyValue('overflow') === 'visible';

/**
 * Get filtered children of an element
 * @param {HTMLElement} element The element to measure
 * @param {String[]} [tagNames]
 */
const getChildren = (element, tagNames) =>
  Array.from(element.children).filter(child =>
    tagNames ? tagNames.includes(child.tagName.toLowerCase()) : child
  );

export function getElementRect(element, offsetParent) {
  let top = element.offsetTop;
  let left = element.offsetLeft;

  const width = element.offsetWidth;
  const height = element.offsetHeight;

  while (element.offsetParent) {
    element = element.offsetParent;
    const border = getBordersOffset(element);
    top += border.top;
    left += border.left;

    if (offsetParent && element === offsetParent) {
      break;
    }

    top += element.offsetTop;
    left += element.offsetLeft;
  }

  return {
    top,
    left,
    width,
    height,
    bottom: top + height,
    right: left + width
  };
}

export function getBoundingRect(element, offsetParent, scrollContainer = window) {
  const elementRect = getElementRect(element, offsetParent);
  if (scrollContainer) {
    const scrollY = scrollContainer.scrollY || scrollContainer.scrollTop || 0;
    const scrollX = scrollContainer.scrollX || scrollContainer.scrollLeft || 0;

    elementRect.top -= scrollY;
    elementRect.bottom -= scrollY;
    elementRect.left -= scrollX;
    elementRect.right -= scrollX;
  }
  return elementRect;
}

/**
 * Recursively get the accumulated bounds of a group of elements and their children
 * @param {HTMLElement[]} elements The elements to measure
 * @param {HTMLElement} [offsetParent] Optional topmost offset parent to calculate position against, if passed an element which is not an offset parent or not a parent of element will be ignored.
 * @param {string[]} [childTags] Optional element tags to filter by (for example, if you have components that their known root is always a 'div', you can save some recursion loops)
 * @param {DomDimensions} [contentRect] The accumulated bounds (For recursion)
 * @returns {DomDimensions}
 */
function getContentRectRecursive(elements, offsetParent, childTags, contentRect = {top: 0, left: 0, bottom: 0, right: 0}) {
  for (const element of elements) {
    const rect = getElementRect(element, offsetParent);
    // If child has no size, meaning it is hidden, don't calculate it
    if (rect.width > 0 && rect.height > 0) {
      if (rect.left < contentRect.left) {
        contentRect.left = rect.left;
      }
      if (rect.right > contentRect.right) {
        contentRect.right = rect.right;
      }
      if (rect.top < contentRect.top) {
        contentRect.top = rect.top;
      }
      if (rect.bottom > contentRect.bottom) {
        contentRect.bottom = rect.bottom;
      }
    }

    const elementChildren = getChildren(element, childTags);
    // if a child has children and it's overflow value is not 'hidden', calculate their sizes too
    if (elementChildren.length && hasOverflow(element)) {
      getContentRectRecursive(elementChildren, offsetParent, childTags, contentRect);
    }
  }
  contentRect.width = contentRect.right - contentRect.left;
  contentRect.height = contentRect.bottom - contentRect.top;

  return contentRect;
}

export function getContentRect(element, offsetParent, childTags) {
  // Calculate this element's bounds
  const contentRect = getElementRect(element, offsetParent);
  // Get all immediate children
  elements = getChildren(element, childTags);
  return getContentRectRecursive(elements, offsetParent, childTags, contentRect);
}

export function getBoundingContentRect(element, offsetParent, childTags, scrollContainer = window) {
  const elementRect = getContentRect(element, offsetParent, childTags);
  if (scrollContainer) {
    const scrollY = scrollContainer.pageYOffset || scrollContainer.scrollTop || 0;
    const scrollX = scrollContainer.pageXOffset || scrollContainer.scrollLeft || 0;

    elementRect.top -= scrollY;
    elementRect.bottom -= scrollY;
    elementRect.left -= scrollX;
    elementRect.right -= scrollX;
  }
  return elementRect;
}
