import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Box, Button, Image, Text } from 'grommet';
import { ThemeContext } from 'styled-components';


export const BrandIdentity = (
    {
        logo = true,
        logoOnly = false,
        href = '/',
        title,
    }) => {
    const textSize = 'medium';
    const theme = useContext(ThemeContext);
    const router = useRouter();

    return (
        <Button
            href={href}
            onClick={(e) => {
                e.preventDefault();
                router.push(href);
            }}
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
};



BrandIdentity.propTypes = {
    logo: PropTypes.bool,
    logoOnly: PropTypes.bool,
    href: PropTypes.string,
    title: PropTypes.string,
};
