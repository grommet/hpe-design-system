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

export const AppIdentity = forwardRef(
  ({ brand, logoOnly, href, title, ...rest }, ref) => {
    const textSize = 'medium';

    return (
      <Button href={href} ref={ref} {...rest} plain>
        <Box
          direction="row"
          align="center"
          gap="medium"
          // pad maintains accessible hit target
          // non-responsive maintains same dimensions for mobile
          pad={{ vertical: 'xsmall' }}
          responsive={false}
        >
          {brand && brands[brand].logo}
          {!logoOnly && (
            <Box direction="row" gap="3xsmall">
              <Text weight="bold" size={textSize} color="text">
                {brands[brand].name}
              </Text>
              <Text size={textSize} color="text">
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
  title: PropTypes.string,
};

AppIdentity.defaultProps = {
  logoOnly: false,
  href: '/',
  title: undefined,
};
