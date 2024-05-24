import React, { useState } from 'react';

import { Box, Text } from 'grommet';
import { User } from 'grommet-icons';
import { SelectorGroup, Selector } from 'aries-core';

const data = [
  {
    value: 'option 1',
    title: 'Option 1',
    description: 'This is a description.',
    icon: <User height="medium" />,
  },
  {
    value: 'option 2',
    title: 'Option 2',
    description: 'This is a description.',
    icon: <User height="medium" />,
  },
  {
    value: 'option 3',
    title: 'Option 3',
    description: 'This is a description.',
    icon: <User height="medium" />,
  },
];
export const TEMP = () => {
  const [selected, setSelected] = useState();
  return (
    <Box pad="large" gap="large">
      <Text>uncontrolled configurable</Text>
      <SelectorGroup>
        {data.map(datum => (
          <Selector
            value={datum.value}
            icon={datum.icon}
            title={datum.title}
            description={datum.description}
          />
        ))}
      </SelectorGroup>
      <Text>uncontrolled configurable with children</Text>
      <SelectorGroup>
        {data.map(datum => (
          <Selector
            value={datum.value}
            icon={datum.icon}
            title={datum.title}
            description={datum.description}
          >
            <Box border={{ style: 'dashed' }} fill>
              Children
            </Box>
          </Selector>
        ))}
      </SelectorGroup>
      <Text>controlled</Text>
      <SelectorGroup
        defaultValue="option 2"
        value={selected}
        onSelect={e => setSelected(e.value)}
      >
        {data.map(datum => (
          <Selector
            value={datum.value}
            icon={datum.icon}
            title={datum.title}
            description={datum.description}
          >
            <Box border={{ style: 'dashed' }} fill>
              Children
            </Box>
          </Selector>
        ))}
      </SelectorGroup>
      <Text>multiple</Text>
      <SelectorGroup multiple>
        {data.map(datum => (
          <Selector
            value={datum.value}
            icon={datum.icon}
            title={datum.title}
            description={datum.description}
          >
            <Box border={{ style: 'dashed' }} fill>
              Children
            </Box>
          </Selector>
        ))}
      </SelectorGroup>
      <SelectorGroup multiple>
        <Selector value="option4">Option 1</Selector>
        <Selector value="option5">Option 2</Selector>
        <Selector value="option6">Option 3</Selector>
      </SelectorGroup>
      <Text>Without indicator</Text>
      <SelectorGroup multiple>
        {data.map(datum => (
          <Selector
            value={datum.value}
            icon={datum.icon}
            title={datum.title}
            description={datum.description}
            indicator={false}
          >
            <Box border={{ style: 'dashed' }} fill>
              Children
            </Box>
          </Selector>
        ))}
      </SelectorGroup>
      <SelectorGroup>
        <Selector indicator={false} value="option4">
          Option 1
        </Selector>
        <Selector indicator={false} value="option5">
          Option 2
        </Selector>
        <Selector indicator={false} value="option6">
          Option 3
        </Selector>
      </SelectorGroup>
    </Box>
  );
};
