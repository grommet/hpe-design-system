// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React, { forwardRef, useContext } from 'react';
import PropTypes from 'prop-types';
import { Button, Box, ResponsiveContext, Text } from 'grommet';
import { HpeLogo } from '../../../../components/content/AppIdentity';
import { UserContext, MenuLayer } from '.';

export const AppIdentity = forwardRef(
  ({ href, logoOnly, title, ...rest }, ref) => {
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
            {/* If user is logged in, pair HPE logo with the service name */}
            <HpeLogo />
            {!logoOnly &&
              (user ? (
                <Text color="text-strong">{title}</Text>
              ) : (
                // user is not signed in
                <Text color="text-strong" weight="bold">
                  Hewlett Packard Enterprise
                </Text>
              ))}
          </Box>
        </Button>
      </Box>
    );
  },
);

AppIdentity.propTypes = {
  logoOnly: PropTypes.bool,
  href: PropTypes.string,
  title: PropTypes.string,
};
