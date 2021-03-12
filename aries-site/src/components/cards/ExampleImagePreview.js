import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Anchor, Box, Image } from 'grommet';

export const ExampleImagePreview = ({ label, href, ...rest }) => (
    <Box align="start" gap="medium">
      <Link href={href} passHref>
        <Box
          width="medium"
          height="215px"
          round="small"
          elevation="medium"
          overflow="hidden"
        >
          <Image fit="cover" {...rest} />
        </Box>
      </Link>
      {label && href && <Anchor label={label} href={href} />}
    </Box>
  );

ExampleImagePreview.propTypes = {
  figma: PropTypes.string,
  href: PropTypes.string,
  label: PropTypes.string,
};
