import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Box, Image, ResponsiveContext, Text } from 'grommet';
import { Close, Checkmark } from 'grommet-icons';

export const CompareUseCases = ({ imageSrcGood, imageAltGood, captionGood, imageSrcBad, imageAltBad, captionBad }) => {

    const size = useContext(ResponsiveContext);
    let direction;
    if (size !== 'small') {
        direction = 'row';
    } else direction = 'column';

    let width;
    if (size !== 'small') {
        width = 'medium';
    } else width = '100%';

    return (
        <Box
            direction={direction}
            gap="large"
            pad={{ vertical: 'medium' }}>
            <Box width={width}>
                <Image src={imageSrcGood} alt={imageAltGood} />
                <Box
                    direction="row"
                    pad={{ top: 'small' }}>
                    <Checkmark size="medium" color="brand" />
                    <Text
                        margin={{ left: 'xsmall' }}>{captionGood}</Text>
                </Box>
            </Box>
            <Box width={width}>
                <Image src={imageSrcBad} alt={imageAltBad} />
                <Box
                    direction="row"
                    pad={{ top: 'small' }}>
                    <Close size="medium" color="red" />
                    <Text
                        margin={{ left: 'xsmall' }}>{captionBad}</Text>
                </Box>
            </Box>
        </Box>
    );
};

CompareUseCases.propTypes = {
    imageSrcGood: PropTypes.string.isRequired,
    imageAltGood: PropTypes.string.isRequired,
    captionGood: PropTypes.string,
    imageSrcBad: PropTypes.string.isRequired,
    imageAltGood: PropTypes.string,
    captionBad: PropTypes.string.isRequired,
};