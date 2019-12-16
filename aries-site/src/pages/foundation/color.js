import React from 'react';
import PropTypes from 'prop-types';
import { Box, Text } from 'grommet';
import { Button, AnchorCallToAction } from 'aries-core';

import {
  ColorRow,
  ContentSection,
  PageLayout,
  Subsection,
  UsageExample,
} from '../../layouts';
import { MainDescription, LastUpdated, MainHeading } from '../../components';
import {
  greyscaleColors,
  primaryColors,
  supportingColors,
  textColors,
} from '../../data';

const title = 'Color';

const TextExample = ({ color, hex }) => {
  return (
    <Box align="center" margin={{ horizontal: 'small' }}>
      <Box direction="row" align="center">
        <Text color={color} weight={700} size="84px">
          A
        </Text>
        <Text color={color} weight={400} size="84px">
          a
        </Text>
      </Box>
      <Text color={color} weight={600}>
        {color}
      </Text>
      <Text color={color}>{hex}</Text>
    </Box>
  );
};

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
          label="Download Color Swatches Pack"
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
      <Subsection name="Text Colors">
        <Text>
          Text needs to be legible in all contexts. Ensuring high contrast is
          met for accessibility and readability is important to delivering users
          a consistent reading experience throughout HPE.
        </Text>
        <AnchorCallToAction label="Typography Elements" href="#" />
        <Subsection name="Text Color Palette">
          <Text>
            Text colors have two states when working on different background
            contexts; depending on background the text can invert to accomodate
            a dark mode. To ensure text maintains readability, we avoid color
            use with the exception of call to actions such as hyperlinks and
            anchors.
          </Text>
          <UsageExample
            themeMode="light"
            label="Light Background"
            align="center"
            height="small"
            justify="between"
            pad={{ horizontal: 'large', bottom: 'medium' }}
          >
            {textColors &&
              textColors.map(color => {
                return (
                  <TextExample
                    key={color.name}
                    color={color.name}
                    hex={color.hex.light}
                  />
                );
              })}
          </UsageExample>
          <UsageExample
            themeMode="dark"
            label="Dark Background"
            align="center"
            height="small"
            justify="between"
            pad={{ horizontal: 'large', bottom: 'medium' }}
          >
            {textColors &&
              textColors.map(color => {
                return (
                  <TextExample
                    key={color.name}
                    color={color.name}
                    hex={color.hex.dark}
                  />
                );
              })}
          </UsageExample>
        </Subsection>
      </Subsection>
    </ContentSection>
  </PageLayout>
);

TextExample.propTypes = {
  color: PropTypes.string.isRequired,
  hex: PropTypes.string.isRequired,
};

export default Color;
