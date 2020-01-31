import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Text } from 'grommet';
import { Aruba, Hpe } from 'grommet-icons';

const brands = {
  hpe: {
    name: 'HPE',
    logo: <Hpe color="brand" size="large" />,
  },
  aruba: {
    name: 'Aruba',
    logo: <Aruba color="brand" />,
  },
};

export const AppIdentity = forwardRef(
  ({ brand, logoOnly, href, title, ...rest }, ref) => {
    const textSize = 'small';

    return (
      <Button href={href} ref={ref} {...rest}>
        <Box direction="row" align="center" gap="medium">
          {brand && brands[brand].logo}
          {!logoOnly && (
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
  logoOnly: PropTypes.bool,
  href: PropTypes.string,
  title: PropTypes.string,
};

AppIdentity.defaultProps = {
  logoOnly: false,
  href: '/',
  title: undefined,
};
