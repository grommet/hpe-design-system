import React from 'react';
import { Box, Text } from 'grommet';
import { Hpe } from 'grommet-icons';

import {
  ContentSection,
  PageLayout,
  Subsection,
  UsageExample,
} from '../../layouts';
import { MainHeading } from '../../components';

const title = 'Branding';

const Branding = () => (
  <PageLayout title={title}>
    <ContentSection>
      <MainHeading>{title}</MainHeading>
    </ContentSection>
    <ContentSection>
      <Subsection name="HPE Element">
        <UsageExample
          label="hpe-element"
          themeMode="light"
          pad={{ horizontal: 'large', vertical: 'small' }}
        >
          <Box direction="row" align="center" gap="medium">
            <Hpe color="brand" size="xlarge" />
            <Box direction="row" gap="xsmall">
              <Text weight="bold">HPE</Text>
              <Text>Service Name</Text>
            </Box>
          </Box>
        </UsageExample>
        <UsageExample
          label="hpe-element-invert"
          themeMode="dark"
          pad={{ horizontal: 'large', vertical: 'small' }}
        >
          <Box direction="row" align="center" gap="medium">
            <Hpe color="brand" size="xlarge" />
            <Box direction="row" gap="xsmall">
              <Text weight="bold">HPE</Text>
              <Text>Service Name</Text>
            </Box>
          </Box>
        </UsageExample>
      </Subsection>
    </ContentSection>
  </PageLayout>
);

export default Branding;
