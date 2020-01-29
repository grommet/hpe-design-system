import React from 'react';
import { storiesOf } from '@storybook/react';

import { Action, Gremlin, User, Aggregate, More } from 'grommet-icons';
import { Box, Grommet, List, Menu, Text } from 'grommet';

import { aries } from '../../../../../../../aries-site/src/themes/aries';
import { Identifier } from '../Identifier';

const organicData = [
  { location: 'Boise', role: 'Producer', icon: <Action /> },
  { location: 'Fort Collins', role: 'Dev', icon: <Gremlin /> },
  {
    location: 'Bay Area',
    role: 'Product Owner',
    icon: <Aggregate />,
  },
  { location: 'North Carolina', role: 'Manager', icon: <User /> },
];

const data = [...organicData, ...organicData, ...organicData, ...organicData];

export const IdentifierInList = () => (
  <Grommet theme={aries}>
    <Box height="100%" background="light-2" align="center">
      <Box width="xlarge">
        <List
          data={data}
          pad="small"
          action={() => (
            <Box direction="row" align="center" gap="medium">
              <Text size="xsmall" weight="bold">
                Active
              </Text>
              <Menu
                icon={<More />}
                hoverIndicator
                items={[{ label: 'Deactivate' }, { label: 'Suspend' }]}
              />
            </Box>
          )}
        >
          {(datum, index) => (
            <Identifier
              title={datum.role}
              subTitle={datum.location}
              gap="medium"
              size="small"
              key={index}
              direction="row"
            >
              <Box alignSelf="center">{datum.icon}</Box>
            </Identifier>
          )}
        </List>
      </Box>
    </Box>
  </Grommet>
);

storiesOf('Identifier', module).add('List', () => <IdentifierInList />);
