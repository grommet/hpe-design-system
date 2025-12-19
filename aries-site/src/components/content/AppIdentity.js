import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Text } from 'grommet';
// TODO replace with DS icon package when available
import { Aruba } from 'grommet-icons';
import { Element } from '@hpe-design/icons-grommet';

const brands = {
  hpe: {
    name: 'HPE',
    logo: <Element color="brand" height="medium" />,
  },
  aruba: {
    name: 'Aruba',
    logo: <Aruba color="plain" height="medium" />,
  },
};

export const AppIdentity = forwardRef(
  (
    { brand, logo = true, logoOnly = false, href = '/', title, ...rest },
    ref,
  ) => {
    const textSize = 'medium';

    return (
      <Button href={href} ref={ref} {...rest}>
        <Box
          direction="row"
          align="start"
          gap="medium"
          // pad maintains accessible hit target
          // non-responsive maintains same dimensions for mobile
          pad={{ vertical: 'xsmall' }}
          responsive={false}
        >
          {brand && logo && brands[brand].logo}
          {!logoOnly && (
            <Box direction="row" gap="3xsmall" wrap>
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
