import React from 'react';

import { Iteration } from '@hpe-design/icons-grommet';
import { SelectorGroup, Selector } from 'aries-core';

const data = [
  {
    value: 'option 1',
    title: 'Aruba AP-635 Wifi 6E Access Point',
    description: '36 devices',
    icon: <Iteration height="medium" />,
  },
  {
    value: 'option 2',
    title: 'Aruba 6100 48G 4SFP+ Switch',
    description: '34 devices',
    icon: <Iteration height="medium" />,
  },
  {
    value: 'option 3',
    title: 'Aruba 9240 Gateway 4xSFP28',
    description: '6 devices',
    icon: <Iteration height="medium" />,
  },
];
export const SimpleSelector = () => {
  return (
    <SelectorGroup multiple>
      {data.map(datum => (
        <Selector
          key={datum.value}
          title={datum.title}
          description={datum.description}
          icon={datum.icon}
          value={datum.value}
        />
      ))}
    </SelectorGroup>
  );
};
