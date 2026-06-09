import React, { useContext } from 'react';
import {
  Button,
  Heading,
  Header,
  NameValueList,
  NameValuePair,
  ResponsiveContext,
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
    <ContentPane gap="medium" width="large">
      <Header
        direction="column"
        align="start"
        gap="5xsmall"
        pad={{ horizontal: '5xsmall' }}
      >
        <Heading level={3} margin="none">
          Storage Array SAA-01
        </Heading>
        <Text color="text-weak">
          Region: US West · Tier: Premium
        </Text>
      </Header>
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
    </ContentPane>
  );
};
