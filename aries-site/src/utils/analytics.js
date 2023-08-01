// (C) Copyright 2022 Hewlett Packard Enterprise Development LP.

import { PAGE_EVENT_NAME } from '../amplitude/prod_app/constants';

const DATA_ANALYTICS = 'data-analytics';

const getText = (element) => {
  if (element?.childNodes.length === 1 &&
    element.firstChild?.nodeName === '#text') {
    return element.firstChild.nodeValue;
  }
  return undefined;
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

const attrRE = /^([^-]+)-(.*)$/;

const addItem = (type, value, data) => {
  if (!data[type]) { 
    // eslint-disable-next-line no-param-reassign
    data[type] = [];
  };
  data[type].push(value);
};

const parseAnalyticsAttr = (attr, data) => {
  const items = attr.split(',');
  items.forEach(item => {
    const fields = item.match(attrRE);
    if (fields) {
      const [, type, value] = fields;
      addItem(type.trim(), value.trim(), data);
    } else {
      addItem('path', item, data);
    }
  });
    
  return data;
};

export const getAnalyticsAttrData = (event) => {
  const data = { path: [] /* ...event */ };
  let curElement = event.element;
  if (event.item) {
    if (typeof event.item === 'string') {
      data.path.push(event.item.toString());
    } else if (event.item?.value?.url) {
      data.path.push(event.item.value.url);
    }
  }
  const id = getId(event);
  if (id) data.path.push(id);
  while (curElement) {
    // console.log('curElement', curElement);
    const analyticsAttr = curElement.getAttribute(DATA_ANALYTICS);
    if (analyticsAttr) {
      parseAnalyticsAttr(analyticsAttr, data);
    } else if (['H1', 'H2', 'H3', 'H4', 'H5'].includes(curElement.tagName)) {
      const text = getText(curElement);
      if (text) data.path.push(text);
    }
    curElement = curElement.parentElement;
  }
  // data.path = path.reverse().join('|');
  return data;
};

const doPageView = (event) => (
  {
    ruleLabel: 'mutationObserver:url-change',
    eventName: PAGE_EVENT_NAME,
    data: {
      URL: event.url,
      previousURL: event.previousUrl,
    },
  }
);

const doClick = (event) => ({
  ruleLabel: event.type,
  eventName: PAGE_EVENT_NAME,
  data: {
    grommet: getAnalyticsAttrData(event),
  },
});

const EVENT_MAP = {
  'anchorClick': doClick,
  'buttonClick': doClick,
  'formOpen': undefined,
  'formClose': undefined,
  'formReset': undefined,
  'formSubmit': undefined,
  'layerOpen': undefined,
  'layerClose': undefined,
  'listItemClick': undefined,
  'activateTab': doClick,
  'pageView' : doPageView,
};

// eslint-disable-next-line no-unused-vars
export const getAnalyticsData = event => {
  let data;
  if (EVENT_MAP[event.type]) {
    data = EVENT_MAP[event.type](event);
  }
  // console.log('\x1B[1;44m ANALYTICS \x1B[0m', data, event);
  return data;
};
