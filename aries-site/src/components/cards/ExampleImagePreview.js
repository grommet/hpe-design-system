import React from 'react';
import PropTypes from 'prop-types';
import { Button, Box, Image } from 'grommet';
import { Figma, Share } from 'grommet-icons';

export const ExampleImagePreview = ({ figma, label, href, ...rest }) => {
  return (
    <Box align="start" gap="medium">
      <Box
        width="medium"
        height="215px"
        round="small"
        elevation="medium"
        overflow="hidden"
      >
        <Image fit="cover" {...rest} />
      </Box>
      <Box direction="row" gap="xsmall">
        {figma && <Button icon={<Figma color="plain" />} href={figma} />}
        {label && href && <Button icon={<Share />} label={label} href={href} />}
      </Box>
    </Box>
  );
};

ExampleImagePreview.propTypes = {
  figma: PropTypes.string,
  href: PropTypes.string,
  label: PropTypes.string,
};
