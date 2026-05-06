import React, { forwardRef, useContext } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Image, Text } from 'grommet';
import { ThemeContext } from 'styled-components';


export const AppIdentity = forwardRef(
  ({
    logo = true,
    logoOnly = false,
    href = '/',
    title,
    ...rest
  }, ref) => {
    const textSize = 'medium';
    const theme = useContext(ThemeContext);
    const linkLabel = title ? `Go to ${title} home` : 'Go to home';

    return (
      <Button
        href={href}
        ref={ref}
        a11yTitle={linkLabel}
        {...rest}
      >
        <Box
          direction="row"
          align="center"
          gap="small"
          // pad maintains accessible hit target
          // non-responsive maintains same dimensions for mobile
          pad={{ vertical: 'xsmall' }}
          responsive={false}
        >
          {logo && (<Box width="4xsmall">
            <Image
              alt="HPE logo"
              fit="contain"
              src={theme?.dark
                ? '/HPE_logo_full-clr_rev_rgb.svg'
                : '/HPE_logo_full-clr_pos_rgb.svg'}
            />
          </Box>)}
          {!logoOnly && (
            <Box direction="row" gap="3xsmall" wrap>
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
  logo: PropTypes.bool,
  logoOnly: PropTypes.bool,
  href: PropTypes.string,
  title: PropTypes.string,
};
