// (C) Copyright 2022 Hewlett Packard Enterprise Development LP.

// eslint-disable-next-line no-unused-vars
export const analytics = data => {
  // console.log('\x1B[1;44m ANALYTICS \x1B[0m', data);
};

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID;

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = url => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  });
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value,
  });
};
