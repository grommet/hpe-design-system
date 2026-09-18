import React, { useContext } from 'react';
import {
  Box,
  Button,
  Heading,
  NameValueList,
  NameValuePair,
  ResponsiveContext,
  Paragraph,
  Text,
} from 'grommet';
import { ButtonGroup } from '@shared/aries-core';
import { ContentPane } from '../../../layouts/content/ContentPane';

const stats = [
  { label: 'Capacity', value: '48 TiB' },
  { label: 'Used', value: '31.2 TiB' },
  { label: 'Status', value: 'Online' },
];

export const ButtonSecondaryActionsExample = () => {
  const size = useContext(ResponsiveContext);
  const mobileLayout = ['xsmall', 'small'].includes(size);

  return (
    <ContentPane>
      {/* using content-driven container 
        https://design-system.hpe.design/templates/content-layouts?q=content#content-driven-layouts */}
      <Box gap="medium" width="medium">
        <Box gap="5xsmall">
          <Heading level={2} margin="none">
            Storage Array SAA-01
          </Heading>
          <Paragraph margin="none" color="text-weak">
            Region: US West · Tier: Premium
          </Paragraph>
        </Box>
        <NameValueList
          valueProps={{ width: '4xsmall' }}
          pairProps={{ direction: 'column' }}
          layout="grid"
        >
          {stats.map(({ label, value }) => (
            <NameValuePair key={label} name={<Text>{label}</Text>}>
              <Text weight="bold">{value}</Text>
            </NameValuePair>
          ))}
        </NameValueList>
        <ButtonGroup direction={mobileLayout ? 'column' : 'row'}>
          <Button label="Edit resource" primary />
          <Button label="Download" secondary />
          <Button label="Clone" secondary />
        </ButtonGroup>
      </Box>
    </ContentPane>
  );
};
