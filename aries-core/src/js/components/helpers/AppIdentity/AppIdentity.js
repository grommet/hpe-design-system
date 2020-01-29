import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Text } from 'grommet';
import { Aruba, Hpe } from 'grommet-icons';

const brands = {
  hpe: { name: 'HPE', logo: <Hpe color="brand" size="large" /> },
  aruba: { name: 'Aruba', logo: <Aruba color="orange!" /> },
};

export const AppIdentity = forwardRef(
  ({ brand, brandOnly, href, title, ...rest }, ref) => {
    const textSize = 'small';

    return (
      <Button href={href} ref={ref} {...rest}>
        <Box direction="row" align="center" gap="medium">
          {brand && brands[brand].logo}
          {!brandOnly && (
            <Box direction="row" gap="xsmall">
              <Text weight="bold" size={textSize}>
                {brands[brand].name}
              </Text>
              <Text size={textSize}>{title}</Text>
            </Box>
          )}
        </Box>
      </Button>
    );
  },
);

AppIdentity.propTypes = {
  brand: PropTypes.string.isRequired,
  brandOnly: PropTypes.bool,
  href: PropTypes.string,
  title: PropTypes.string,
};

AppIdentity.defaultProps = {
  brandOnly: false,
  href: '/',
  title: undefined,
};
