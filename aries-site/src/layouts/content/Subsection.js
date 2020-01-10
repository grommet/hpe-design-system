import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'aries-core';
import { Anchor, Box, Header } from 'grommet';
import { Link as LinkIcon } from 'grommet-icons';
import { Subheading } from '../../components';

// Depending on the level of the heading, we need to adjust the amount of gap
// between the heading and the first child in the subsection.
const GAP_SIZE = {
  1: 'large',
  2: 'small',
  3: undefined,
};

export const Subsection = ({ children, level, name, topic }) => {
  const [over, setOver] = useState(false);

  const id = name
    .split(' ')
    .join('-')
    .toLowerCase();

  const firstChild = React.Children.map(children, (child, index) => {
    if (index === 0) {
      return React.cloneElement(child, {
        level,
      });
    }
    return undefined;
  });

  const remainingChildren = React.Children.map(children, (child, index) => {
    if (index === 0) {
      return undefined;
    }
    return React.cloneElement(child, {
      level,
    });
  });

  return (
    <Box
      as="section"
      id={id}
      margin={{ bottom: 'small' }}
      fill="horizontal"
      gap="medium"
      onMouseOver={() => setOver(true)}
      onMouseOut={() => setOver(false)}
      onFocus={() => setOver(true)}
      onBlur={() => setOver(false)}
    >
      {/* This condition for gap is needed because the link icon has padding
       * to maintain a big enough touch area for accessibility. This creates
       * a larger than desired gap between h3's and its first child. This
       * removes that extra space.
       */}
      <Box gap={GAP_SIZE[level]}>
        <Header>
          <Box>
            {level === 1 && topic && (
              <NavLink href={`/${topic.toLowerCase()}`} label={topic} />
            )}
            <Subheading level={level}>{name}</Subheading>
          </Box>
          {level > 1 && (
            <Anchor
              a11yTitle={`Jump to section titled ${name}`}
              href={`#${id}`}
              icon={<LinkIcon color={over ? 'text-xweak' : 'transparent'} />}
            />
          )}
        </Header>
        {/* Isolates the first child to ensure the gap between heading and
         * first child is correct size. See comment on line 33 for reasoning.
         */}
        {firstChild}
      </Box>
      {remainingChildren}
    </Box>
  );
};

Subsection.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
  level: PropTypes.number,
  name: PropTypes.string.isRequired,
  topic: PropTypes.string,
};

Subsection.defaultProps = {
  children: undefined,
  level: 2,
  topic: undefined,
};
