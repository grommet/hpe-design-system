import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Anchor, Box, Card, Image } from 'grommet';

export const ExampleImagePreview = ({ alt, label, href, ...rest }) => (
  <Box align="start" gap="medium">
    <Link href={href} passHref legacyBehavior>
      <Card width="medium" height="215px" round="small" overflow="hidden">
        <Image fit="cover" alt={alt} {...rest} />
      </Card>
    </Link>
    {label && href && <Anchor label={label} href={href} />}
  </Box>
);

ExampleImagePreview.propTypes = {
  alt: PropTypes.string,
  figma: PropTypes.string,
  href: PropTypes.string,
  label: PropTypes.string,
};
