import React, { forwardRef, useContext } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Image, Text } from 'grommet';
import { ThemeContext } from 'styled-components';

const HpeLogo = () => {
  const theme = useContext(ThemeContext);
  return (
    <Box width="4xsmall" animation={{ type: 'fadeIn', duration: 500 }}>
      <Image
        alt="HPE logo"
        fit="contain"
        src={theme?.dark
          ? '/HPE_logo_full-clr_rev_rgb.svg'
          : '/HPE_logo_full-clr_pos_rgb.svg'}
      />
    </Box>
  );
};
export const AppIdentity = forwardRef(
  (
    {
      logo = true,
      logoOnly = false,
      title = 'HPE Design System',
      ...rest
    },
    ref,
  ) => {
    const textSize = 'medium';
    const href = '/';
    const linkLabel = title ? `Go to ${title} home` : 'Go to home';
    return (
      <Button href={href} ref={ref} a11yTitle={linkLabel} {...rest}>
        <Box
          direction="row"
          align="center"
          gap="xsmall"
          // pad maintains accessible hit target
          // non-responsive maintains same dimensions for mobile
          pad={{ vertical: 'xsmall' }}
          responsive={false}
        >
          {logo && <HpeLogo />}
          {!logoOnly && (
            <Box direction="row" gap="3xsmall" wrap>
              {!logo &&
                <Box animation={{ type: 'fadeIn', duration: 500 }}>
                  <Text weight="bold" size={textSize} color="text-strong">
                    HPE
                  </Text>
                </Box>
              }
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
  title: PropTypes.string,
};