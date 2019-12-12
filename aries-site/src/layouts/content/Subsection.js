import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Anchor, Box, Header } from 'grommet';
import { Link as LinkIcon } from 'grommet-icons';
import { Subheading } from '../../components';

const GAP_SIZE = {
  1: 'medium',
  2: 'small',
  3: undefined,
};

export const Subsection = ({ children, level, name }) => {
  const [over, setOver] = useState(false);

  const id = name
    .split(' ')
    .join('-')
    .toLowerCase();

  return (
    <Box
      as="section"
      id={id}
      margin={{ bottom: 'small' }}
      gap="small"
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
          <Subheading level={level}>{name}</Subheading>
          {level > 1 && (
            <Anchor
              a11yTitle={`Jump to section titled ${name}`}
              href={`#${id}`}
              icon={<LinkIcon color={over ? 'text-xweak' : 'transparent'} />}
            />
          )}
        </Header>
        {React.Children.map(children, (child, index) => {
          if (index === 0) {
            return React.cloneElement(child, {
              level,
            });
          }
          return undefined;
        })}
      </Box>
      {React.Children.map(children, (child, index) => {
        if (index === 0) {
          return undefined;
        }
        return React.cloneElement(child, {
          level,
        });
      })}
    </Box>
  );
};

Subsection.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array])
    .isRequired,
  level: PropTypes.number,
  name: PropTypes.string.isRequired,
};

Subsection.defaultProps = {
  level: 2,
};
