import React, { forwardRef, useContext } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Image, Text } from 'grommet';
import { ThemeContext } from 'styled-components';
// TODO replace with DS icon package when available
import { Aruba } from 'grommet-icons';
import { Element } from '@hpe-design/icons-grommet';

const Hpe2Logo = () => {
  const theme = useContext(ThemeContext);
  return (
    <Box width="4xsmall">
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

const brands = {
  hpe: {
    name: 'HPE',
    logo: <Element color="brand" height="medium" />,
  },
  hpe2: {
    logo: <Hpe2Logo />,
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
    const linkLabel = title ? `Go to ${title} home` : 'Go to home';

    return (
      <Button href={href} ref={ref} a11yTitle={linkLabel} {...rest}>
        <Box
          direction="row"
          align="center"
          gap="small"
          // pad maintains accessible hit target
          // non-responsive maintains same dimensions for mobile
          pad={{ vertical: 'xsmall' }}
          responsive={false}
        >
          {brand && logo && brands[brand].logo}
          {!logoOnly && (
            <Box direction="row" gap="3xsmall" wrap>
              {brands[brand]?.name && (
                <Text weight="bold" size={textSize} color="text-strong">
                  {brands[brand].name}
                </Text>
              )}
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
