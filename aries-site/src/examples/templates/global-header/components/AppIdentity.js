import React, { forwardRef, useContext } from 'react';
import PropTypes from 'prop-types';
import { Button, Box, ResponsiveContext, Text } from 'grommet';
import { Aruba, Hpe } from 'grommet-icons';
import { UserContext, SidebarLayer } from '.';

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
  ({ brand, href, logoOnly, title, ...rest }, ref) => {
    const { user } = useContext(UserContext);
    const size = useContext(ResponsiveContext);

    return (
      <Box
        align="center"
        direction="row"
        gap={size !== 'small' ? 'medium' : 'small'}
      >
        {user && <SidebarLayer />}
        <Button href={href} ref={ref} {...rest} plain>
          <Box
            direction="row"
            align="center"
            gap="medium"
            // pad maintains accessible hit target
            // non-responsive maintains same dimensions for mobile
            pad={{ vertical: 'small' }}
            responsive={false}
          >
            {brand && user ? brands[brand].logo : brands.hpe.logo}
            {!logoOnly && (
              <Box direction="row" gap="xsmall" wrap>
                {user ? (
                  <Box direction="row" gap="xsmall">
                    <Text weight="bold" color="text-strong">
                      {brands[brand].name}
                    </Text>
                    <Text color="text-strong">{title}</Text>
                  </Box>
                ) : (
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
