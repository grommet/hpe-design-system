import React from 'react';

import { Box, Grid, Text } from 'grommet';
import { User } from 'grommet-icons';
import {
  SelectorContainer,
  SelectorGroup,
  Selector,
} from 'aries-core/src/js/components/core/Selector';

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
export const SimpleSelector = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Box pad="large" gap="large">
    {/* you will still pass multiple, value, onSelect here */}
    <SelectorGroup>
      {data.map(datum => (
        <Selector
          value={datum.value}
          // TO DO can we build in height?
          icon={datum.icon}
          title={datum.title}
          description={datum.description}
        >
          <Box border={{ style: 'dashed' }} fill>
            Children
          </Box>
        </Selector>
      ))}

      {/* <SelectorContainer value='24' title="Require service assignments">
          <Box pad="small" flex>
            <Text size="large">24</Text>
          </Box>
        </SelectorContainer>
        <SelectorContainer value='18' title="Expired subscriptions">
          <Box cssGap pad="small" flex>
            <Text size="large">18</Text>
          </Box>
        </SelectorContainer>
        <SelectorContainer value='9' title="Needs attention">
          <Box pad="small" flex>
            <Text size="large">9</Text>
          </Box>
        </SelectorContainer> */}
    </SelectorGroup>
    <SelectorGroup multiple>
      <Selector value="option4">Option 1</Selector>
      <Selector value="option5">Option 2</Selector>
      <Selector value="option6">Option 3</Selector>
    </SelectorGroup>
    {/* <SelectorGroup multiple>
      <Grid
        columns={{
          count: 3,
          size: ['auto', 'medium'],
        }}
        gap="small"
        role="group"
      >
        <SelectorContainer title="Require service assignments">
          <Box pad="small" flex>
            <Text size="large">24</Text>
          </Box>
        </SelectorContainer>
        <SelectorContainer title="Expired subscriptions">
          <Box pad="small" flex>
            <Text size="large">18</Text>
          </Box>
        </SelectorContainer>
        <SelectorContainer title="Needs attention">
          <Box pad="small" flex>
            <Text size="large">9</Text>
          </Box>
        </SelectorContainer>
      </Grid>
    </SelectorGroup> */}
  </Box>
  // </Grommet>
);

export default {
  title: 'Controls/SelectorGroup/SimpleSelector',
};
