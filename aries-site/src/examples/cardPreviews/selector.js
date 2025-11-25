import React from 'react';
import { SelectorGroup, Selector } from 'aries-core';

const services = [
  {
    value: 'aruba',
    title: 'Aruba Central',
  },
  {
    value: 'green lake portal',
    title: 'HPE GreenLake Portal',
  },
];

export const SelectorPreview = () => (
  <SelectorGroup
    tabIndex={-1}
    a11yTitle="Select service products"
    layout="grid"
    defaultValue="aruba"
  >
    {services.map(datum => (
      <Selector
        tabIndex={-1}
        key={datum.value}
        value={datum.value}
        title={datum.title}
      />
    ))}
  </SelectorGroup>
);
