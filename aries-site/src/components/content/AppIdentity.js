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
  ({ brand, logo = true, logoOnly, href, title, ...rest }, ref) => {
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
          {brand && logo && brands[brand].logo}
          {!logoOnly && (
            <Box direction="row" gap="xsmall" wrap>
              <Text weight="bold" size={textSize} color="text-strong">
                {brands[brand].name}
              </Text>
              <Text size={textSize} color="text-strong">
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
  logo: PropTypes.bool,
  logoOnly: PropTypes.bool,
  href: PropTypes.string,
  title: PropTypes.string,
};

AppIdentity.defaultProps = {
  logoOnly: false,
  href: '/',
  title: undefined,
};
