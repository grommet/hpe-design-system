import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Anchor, Box } from 'grommet';
import { Link as LinkIcon } from 'grommet-icons';
import { Subheading } from '../../components';

export const Subsection = ({ children, name }) => {
  const [over, setOver] = useState(false);

  const id = name
    .split(' ')
    .join('-')
    .toLowerCase();

  return (
    <Box
      id={id}
      margin={{ bottom: 'small' }}
      gap="small"
      onMouseOver={() => setOver(true)}
      onMouseOut={() => setOver(false)}
      onFocus={() => setOver(true)}
      onBlur={() => setOver(false)}
    >
      <Box direction="row" justify="between">
        <Subheading>{name}</Subheading>
        <Anchor
          href={`#${id}`}
          icon={<LinkIcon color={over ? 'text-xweak' : 'transparent'} />}
        />
      </Box>
      {children}
    </Box>
  );
};

Subsection.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array])
    .isRequired,
  name: PropTypes.string.isRequired,
};
