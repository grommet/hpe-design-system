import React from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, Heading, Paragraph, Text } from 'grommet';

const TypePreview = ({ title, description, children }) => (
  <Box gap="medium">
    <Box gap="xsmall">
      <Heading level={3} margin="none">
        {title}
      </Heading>
      <Paragraph margin="none">{description}</Paragraph>
    </Box>
    <Box
      background="background-front"
      align="center"
      justify="center"
      round="medium"
      pad="medium"
    >
      {children}
    </Box>
  </Box>
);

TypePreview.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  children: PropTypes.element,
};

const TokenPreview = ({ children, token }) => (
  <Box align="center" gap="small">
    {children}
    <Text weight={500} color="text-strong">
      {token}
    </Text>
  </Box>
);

TokenPreview.propTypes = {
  token: PropTypes.string,
  children: PropTypes.element,
};

export const TokenTypes = () => {
  return (
    <Grid columns="medium" margin={{ top: 'medium' }} gap="large">
      <TypePreview
        title="Typography"
        description="Apply to typography with Typography styles"
      >
        <TokenPreview token="heading.xlarge">
          <Heading level={1} as="span" marign="none">
            Aa
          </Heading>
        </TokenPreview>
      </TypePreview>
      <TypePreview title="Color" description="Use on fills and strokes">
        <TokenPreview token="color.background.primary.default">
          <Box
            height="xsmall"
            width="xsmall"
            flex={false}
            round="small"
            background="brand"
          />
        </TokenPreview>
      </TypePreview>
      <TypePreview
        title="Spacing"
        description="Use on auto-layout gap and padding"
      >
        <TokenPreview token="spacing.medium">
          <Box direction="row">
            <Box
              width="xsmall"
              height="xsmall"
              flex={false}
              round="small"
              border
            />
            <Box
              pad={{ left: 'medium', vertical: 'large' }}
              flex={false}
              background={{ color: 'brand', opacity: 'medium' }}
            />
            <Box
              height="xsmall"
              width="xsmall"
              flex={false}
              round="small"
              border
            />
          </Box>
        </TokenPreview>
      </TypePreview>
      <TypePreview
        title="Size"
        description="Use on width and height of containers and icons"
      >
        <TokenPreview token="size.content.xsmall">
          <Box
            width="xsmall"
            height="xsmall"
            round="small"
            flex={false}
            background={{ color: 'brand', opacity: 'medium' }}
            border
          />
        </TokenPreview>
      </TypePreview>
      <TypePreview
        title="Radius"
        description="Apply to containers using the Corner radius property."
      >
        <TokenPreview token="radius.small">
          <Box
            width="xsmall"
            height="xsmall"
            round="small"
            flex={false}
            border
          />
        </TokenPreview>
      </TypePreview>
      <TypePreview
        title="Elevation"
        description="Apply to frames and shapes with Effect styles"
      >
        <TokenPreview token="elevation.medium">
          <Box pad="large" round="small" flex={false} elevation="medium" />
        </TokenPreview>
      </TypePreview>
      <TypePreview
        title="Border width"
        description="Not currently supported by Figma"
      >
        <TokenPreview token="borderWidth.small">
          <Box
            height="xsmall"
            width="xsmall"
            flex={false}
            round="small"
            border={{ width: 'small', color: 'brand' }}
          />
        </TokenPreview>
      </TypePreview>
    </Grid>
  );
};
