Range.prototype.getIndexOfCharsIn = function getIndexOfCharsIn(
  containerElement
) {
  return {
    begin: getPositionOf(this, 'start').containedIn(containerElement),
    end: getPositionOf(this, 'end').containedIn(containerElement)
  };
};

/**
 * Get the position of the begin | end of the character in the current selection
 * @param {Range} range
 * @param {"start"| "end"} prefix
 * @returns {{containedIn: (containerElement: HTMLElement) => number}}
 */
export function getPositionOf(range, prefix) {
  const initialOffset = range[prefix + 'Offset'];

  return {
    containedIn: containerElement =>
      getPositionContainedIn(
        containerElement,
        range[prefix + 'Container'],
        initialOffset
      )
  };
}

/**
 *
 * @param {HTMLElement} containerElement
 * @param {HTMLElement} rangeContainer
 * @param {number} initialOffset
 */
function getPositionContainedIn(
  containerElement,
  rangeContainer,
  initialOffset
) {
  if (!containerElement.contains(rangeContainer)) return -1;
  let previousSibling = rangeContainer.previousSibling;
  let offset = initialOffset;

  while (previousSibling) {
    offset = previousSibling.textContent.length + offset;
    previousSibling = previousSibling.previousSibling;
  }

  return offset;
}
