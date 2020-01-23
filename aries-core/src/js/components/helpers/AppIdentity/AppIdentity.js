import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Text } from 'grommet';
import { Aruba, Hpe } from 'grommet-icons';

const brandNames = {
  hpe: 'HPE',
  aruba: 'Aruba',
};

export const AppIdentity = forwardRef(
  ({ brand, brandOnly, href, title, ...rest }, ref) => {
    const textSize = 'small';

    return (
      <Button href={href} ref={ref} {...rest}>
        <Box direction="row" align="center" gap="medium">
          {brand === brandNames.hpe.toLowerCase() ? (
            <Hpe color="brand" size="large" />
          ) : (
            undefined
          )}
          {brand === brandNames.aruba.toLowerCase() ? (
            <Aruba color="orange!" />
          ) : (
            undefined
          )}
          {!brandOnly && (
            <Box direction="row" gap="xsmall">
              <Text weight="bold" size={textSize}>
                {brandNames[brand]}
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
