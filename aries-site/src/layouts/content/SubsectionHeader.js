import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Heading } from 'grommet';
import { Link as LinkIcon } from 'grommet-icons';

import { HighlightPhrase } from '../../components';
import { nameToSlug } from '../../utils';

import { ThemeContext } from 'styled-components';

import { useIntersection } from '@hpe/react-hooks';
import { ActiveHeadingContext } from './ActiveHeadingContext';

export const SubsectionHeader = ({ children, level }) => {
  const [over, setOver] = useState(false);
  const id = nameToSlug(children);
  const { setActiveHeading } = useContext(ActiveHeadingContext);

  const theme = useContext(ThemeContext);
  let { large, medium } = theme.global.edgeSize;
  large = parseInt(large.replace('px', ''), 10); // 48
  medium = parseInt(medium.replace('px', ''), 10); // 24

  // top and bottom margin values to calculate intersection window
  const topMargin = large;
  const bottomMargin = `-${2 * large}`;

  const options = {
    rootMargin: `${topMargin}% 0% ${bottomMargin}% 0%`,
    //threshold: 1.0,
  };

  const [headingToWatch, entry] = useIntersection({ options });
  const headingIsVisible = entry.isIntersecting;

  // update activeHeading, passed up to Table of Contents
  useEffect(() => {
    if (headingIsVisible) {
      setActiveHeading(id);
    }
  });

  return (
    <Box
      ref={headingToWatch}
      direction="row"
      align="center"
      gap="small"
      id={id}
      margin={{ top: level === 3 ? 'medium' : 'large' }}
      onMouseOver={() => setOver(true)}
      onFocus={() => setOver(true)}
      onMouseOut={() => setOver(false)}
      onBlur={() => setOver(false)}
    >
      <Heading
        margin={{ vertical: 'small' }}
        level={level}
        size={level === 3 ? 'small' : undefined}
      >
        <HighlightPhrase size="inherit">{children}</HighlightPhrase>
      </Heading>
      <Button
        tip="Copy link to clipboard"
        a11yTitle={`Jump to section titled ${children} 
                    and copy link to clipboard`}
        icon={<LinkIcon color={over ? 'text-xweak' : 'transparent'} />}
        onClick={() => {
          window.location.href = `#${id}`;
          navigator.clipboard.writeText(window.location.href);
        }}
      />
    </Box>
  );
};

SubsectionHeader.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
  level: PropTypes.number,
};
