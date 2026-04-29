import React from 'react';
import { SelectorGroup, Selector } from '@shared/aries-core';
import { useInert } from '@shared/hooks';

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

export const SelectorPreview = () => {
  const ref = useInert();

  return (
    <SelectorGroup
      ref={ref}
      a11yTitle="Select service products"
      layout="grid"
      defaultValue="green lake portal"
    >
      {services.map(datum => (
        <Selector
          key={datum.value}
          value={datum.value}
          title={datum.title}
        />
      ))}
    </SelectorGroup>
  );
};