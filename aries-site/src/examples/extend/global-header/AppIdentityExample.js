import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Text } from 'grommet';
import { Aruba, Hpe } from 'grommet-icons';

const brands = {
  hpe: {
    name: 'HPE',
    logo: <Hpe color="brand" />,
  },
  aruba: {
    name: 'Aruba',
    logo: <Aruba color="plain" />,
  },
};

const AppIdentity = forwardRef(
  ({ brand, logoOnly, href, simple, title, weight, ...rest }, ref) => {
    const textSize = 'medium';

    return (
      <Button href={href} ref={ref} {...rest}>
        <Box
          direction="row"
          align="start"
          gap="medium"
          // pad maintains accessible hit target
          // non-responsive maintains same dimensions for mobile
          pad={{ vertical: 'small' }}
          responsive={false}
        >
          {brand && brands[brand].logo}
          {!logoOnly && (
            <Box direction="row" gap="xsmall" wrap>
              {!simple && (
                <Text weight="bold" size={textSize} color="text-strong">
                  {brands[brand].name}
                </Text>
              )}
              <Text size={textSize} color="text-strong" weight={weight}>
                {title}
              </Text>
            </Box>
          )}
        </Box>
      </Button>
    );
  },
);

AppIdentity.propTypes = {
  brand: PropTypes.string.isRequired,
  logoOnly: PropTypes.bool,
  href: PropTypes.string,
  simple: PropTypes.bool,
  title: PropTypes.string,
  weight: PropTypes.string,
};

export const AppIdentityExample = () => (
  <Box gap="small">
    <AppIdentity brand="hpe" title="Console" weight="bold" />
    <AppIdentity brand="hpe" title="Hewlett Packard Enterprise" simple />
    <AppIdentity brand="aruba" title="Network Manager" />
  </Box>
);
