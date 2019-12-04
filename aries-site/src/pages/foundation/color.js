import React from 'react';
import { Box, Button, Text } from 'grommet';

import {
  ColorRow,
  ContentSection,
  PageLayout,
  Subsection,
} from '../../layouts';
import {
  MainDescription,
  LastUpdated,
  MainHeading,
  Subheading,
} from '../../components';
import { aries as theme } from '../../themes/aries';

const { colors } = theme.global;

const primaryColors = [
  {
    name: 'hpe-green',
    value: 'green',
    hex: colors.green,
    rgb: 'rgb(0, 199, 129)',
    hsl: 'hsl(159, 100%, 39%)',
  },
];

const supportingColors = [
  {
    name: 'teal',
    value: 'teal',
    hex: colors.teal,
    rgb: 'rgb(0, 199, 129)',
    hsl: 'hsl(159, 100%, 39%)',
  },
  {
    name: 'blue',
    value: 'blue',
    hex: colors.blue,
    rgb: 'rgb(0, 199, 129)',
    hsl: 'hsl(159, 100%, 39%)',
  },
  {
    name: 'purple',
    value: 'purple',
    hex: colors.purple,
    rgb: 'rgb(0, 199, 129)',
    hsl: 'hsl(159, 100%, 39%)',
  },
  {
    name: 'red',
    value: 'red',
    hex: colors.red,
    rgb: 'rgb(0, 199, 129)',
    hsl: 'hsl(159, 100%, 39%)',
  },
  {
    name: 'orange',
    value: 'orange',
    hex: colors.orange,
    rgb: 'rgb(0, 199, 129)',
    hsl: 'hsl(159, 100%, 39%)',
  },
  {
    name: 'yellow',
    value: 'yellow',
    hex: colors.yellow,
    rgb: 'rgb(0, 199, 129)',
    hsl: 'hsl(159, 100%, 39%)',
  },
];

const greyscaleColors = [
  {
    name: 'grey-1',
    value: '#F2F2F2',
    hex: '#F2F2F2',
    rgb: 'rgb(0, 199, 129)',
    hsl: 'hsl(159, 100%, 39%)',
  },
  {
    name: 'grey-2',
    value: '#EDEDED',
    hex: '#EDEDED',
    rgb: 'rgb(0, 199, 129)',
    hsl: 'hsl(159, 100%, 39%)',
  },
  {
    name: 'grey-3',
    value: '#CCCCCC',
    hex: '#CCCCCC',
    rgb: 'rgb(0, 199, 129)',
    hsl: 'hsl(159, 100%, 39%)',
  },
  {
    name: 'grey-4',
    value: '#999999',
    hex: '#999999',
    rgb: 'rgb(0, 199, 129)',
    hsl: 'hsl(159, 100%, 39%)',
  },
  {
    name: 'grey-5',
    value: '#555555',
    hex: '#555555',
    rgb: 'rgb(0, 199, 129)',
    hsl: 'hsl(159, 100%, 39%)',
  },
  {
    name: 'grey-6',
    value: '#333333',
    hex: '#333333',
    rgb: 'rgb(0, 199, 129)',
    hsl: 'hsl(159, 100%, 39%)',
  },
];

const title = 'Color';

const Color = () => (
  <PageLayout title={title}>
    <ContentSection>
      <MainHeading>{title}</MainHeading>
      <MainDescription>
        Our color palette brings out the depth and dimension of our identity.
        From sophisticated, neutral hues reflective of technology to vibrant,
        saturated colors that evoke energy and inspiration.
      </MainDescription>
      <Box gap="medium" pad={{ vertical: 'medium' }}>
        <Button
          label={
            <Text
              color={{ dark: 'text-strong', light: 'text-strong' }}
              weight={500}
            >
              Download Color Swatches Pack
            </Text>
          }
          primary
        />
        <LastUpdated date={new Date('2019-07-17')} />
      </Box>
    </ContentSection>
    <ContentSection>
      <Subsection>
        <Subheading>Primary</Subheading>
        <Text>
          HPE green symbolizes growth and vitality, commands attention and
          inspires action. Our green is an essential part of our brand identity
          and should be evident in every communication wherever possible. Always
          use the custom color specifications seen here to maintain consistency
          across channels and media.
        </Text>
        {primaryColors &&
          primaryColors.map(color => {
            return <ColorRow colorSpec={color} />;
          })}
      </Subsection>
      <Subsection>
        <Subheading>Supporting</Subheading>
        <Text>
          Our supporting color palette enhances data visualization and
          storytelling by amplifying vibrant colors for a more elegant look and
          feel and creates contrast to our our core color.
        </Text>
        {supportingColors &&
          supportingColors.map(color => {
            return <ColorRow colorSpec={color} />;
          })}
      </Subsection>
      <Subsection>
        <Subheading>Greyscale</Subheading>
        <Text>
          The greyscale palette offers a set of steps that can be using in
          tertiary elements to to create more subtle separation to ensure
          content has a balanced composition.
        </Text>
        {greyscaleColors &&
          greyscaleColors.map(color => {
            return <ColorRow colorSpec={color} />;
          })}
      </Subsection>
    </ContentSection>
  </PageLayout>
);

export default Color;
