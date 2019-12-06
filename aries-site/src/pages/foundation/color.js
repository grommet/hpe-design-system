import React from 'react';
import { Box, Button, Text } from 'grommet';

import {
  ColorRow,
  ContentSection,
  PageLayout,
  Subsection,
} from '../../layouts';
import { MainDescription, LastUpdated, MainHeading } from '../../components';
import { greyscaleColors, primaryColors, supportingColors } from '../../data';

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
          onClick={() => {
            // Download color swatch pack (once content is available)
          }}
        />
        <LastUpdated date={new Date('2019-07-17T03:24:00')} />
      </Box>
    </ContentSection>
    <ContentSection>
      <Subsection name="Primary" headingSize="small">
        <Text>
          HPE green symbolizes growth and vitality, commands attention and
          inspires action. Our green is an essential part of our brand identity
          and should be evident in every communication wherever possible. Always
          use the custom color specifications seen here to maintain consistency
          across channels and media.
        </Text>
        {primaryColors && (
          <Box margin={{ top: 'medium' }}>
            {primaryColors.map(color => {
              return <ColorRow colorSpec={color} key={color.name} />;
            })}
          </Box>
        )}
      </Subsection>
      <Subsection name="Supporting" headingSize="small">
        <Text>
          Our supporting color palette enhances data visualization and
          storytelling by amplifying vibrant colors for a more elegant look and
          feel and creates contrast to our our core color.
        </Text>
        {supportingColors && (
          <Box margin={{ top: 'medium' }}>
            {supportingColors.map(color => {
              return <ColorRow colorSpec={color} key={color.name} />;
            })}
          </Box>
        )}
      </Subsection>
      <Subsection name="Greyscale" headingSize="small">
        <Text>
          The greyscale palette offers a set of steps that can be using in
          tertiary elements to to create more subtle separation to ensure
          content has a balanced composition.
        </Text>
        {greyscaleColors && (
          <Box margin={{ top: 'medium' }}>
            {greyscaleColors.map(color => {
              return <ColorRow colorSpec={color} key={color.name} />;
            })}
          </Box>
        )}
      </Subsection>
    </ContentSection>
  </PageLayout>
);

export default Color;
