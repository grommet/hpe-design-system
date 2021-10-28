import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Anchor, Box, Image } from 'grommet';

export const ExampleImagePreview = ({ label, href, ...rest }) => {
  const [isFocused, setIsFocused] = React.useState(false);

  return (
    <Box align="start" gap="medium">
      <Link href={href} passHref>
        <Box
          width="medium"
          height="215px"
          round="small"
          elevation={isFocused ? 'large' : 'medium'}
          onBlur={() => setIsFocused(false)}
          onFocus={() => setIsFocused(true)}
          onMouseOut={() => setIsFocused(false)}
          onMouseOver={() => setIsFocused(true)}
          overflow="hidden"
        >
          <Image fit="cover" {...rest} />
        </Box>
      </Link>
      {label && href && <Anchor label={label} href={href} />}
    </Box>
  );
};

ExampleImagePreview.propTypes = {
  figma: PropTypes.string,
  href: PropTypes.string,
  label: PropTypes.string,
};
