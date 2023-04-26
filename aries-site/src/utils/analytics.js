// (C) Copyright 2022 Hewlett Packard Enterprise Development LP.

const DATA_ANALYTICS = 'data-analytics';

const getText = (element) => {
  if (element?.childNodes.length === 1 &&
    element.firstChild?.nodeName === '#text') {
    return element.firstChild.nodeValue;
  }
};

const getId = (event) => {
  let id;
  const { element, label, type } = event;
  if (element && !element.getAttribute(DATA_ANALYTICS)) {
    if (element.getAttribute('id')) {
      id = element.getAttribute('id');
    } else if (label) {
      id = label;
    } else if (element.getAttribute('aria-label')) {
      id = element.getAttribute('aria-label');
    } else if (type === 'anchorClick') {
      id = getText(element);
    }
  }
  return id;
};

const getPath = (event) => {
  const path = [];
  let curElement = event.element;
  if (event.item) {
    if (typeof event.item === 'string') {
      path.push(event.item.toString());
    } else if (event.item?.value?.url) {
      path.push(event.item.value.url);
    }
  }
  const id = getId(event);
  if (id) path.push(id);
  while (curElement) {
    // console.log('curElement', curElement);
    const analyticsId = curElement.getAttribute(DATA_ANALYTICS);
    if (analyticsId) {
      path.push(analyticsId);
    } else if (['H1', 'H2', 'H3', 'H4', 'H5'].includes(curElement.tagName)) {
      const text = getText(curElement);
      if (text) path.push(text);
    }
    curElement = curElement.parentElement;
  }
  return path.reverse().join('|');
};

// eslint-disable-next-line no-unused-vars
export const analytics = data => {
  const path = getPath(data);
  console.log('\x1B[1;44m ANALYTICS \x1B[0m', path, data);
};
