import React, { forwardRef, useContext } from 'react';
import PropTypes from 'prop-types';
import { Button, Box, ResponsiveContext, Text } from 'grommet';
// TODO replace with DS icon package when available
import { Aruba, Hpe } from 'grommet-icons';
import { UserContext, MenuLayer } from '.';

const brands = {
  // todo replace with logo
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
  ({ brand, href, logoOnly, title, ...rest }, ref) => {
    const { user } = useContext(UserContext);
    const size = useContext(ResponsiveContext);

    return (
      <Box
        align="center"
        direction="row"
        gap={!['xsmall', 'small'].includes(size) ? 'medium' : 'xsmall'}
      >
        {/* menu is only available when user is logged in */}
        {user && <MenuLayer />}
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
            {/* If user is logged in, show the application specific logo.
            This will be either HPE or Aruba. If user is logged out,
            show HPE logo */}
            {brand && user ? brands[brand].logo : brands.hpe.logo}
            {!logoOnly && (
              <Box direction="row" gap="3xsmall" wrap>
                {user ? (
                  // user is signed in, display service name
                  <Box direction="row" gap="3xsmall">
                    <Text weight="bold" color="text-strong">
                      {brands[brand].name}
                    </Text>
                    <Text color="text-strong">{title}</Text>
                  </Box>
                ) : (
                  // user is not signed in
                  <Text color="text-strong" weight="bold">
                    Hewlett Packard Enterprise
                  </Text>
                )}
              </Box>
            )}
          </Box>
        </Button>
      </Box>
    );
  },
);

AppIdentity.propTypes = {
  brand: PropTypes.string.isRequired,
  logoOnly: PropTypes.bool,
  href: PropTypes.string,
  title: PropTypes.string,
};
