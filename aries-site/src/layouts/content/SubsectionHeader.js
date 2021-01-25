import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Heading } from 'grommet';
import { Link as LinkIcon } from 'grommet-icons';
import { nameToSlug } from '../../utils';

export const SubsectionHeader = ({ children, level }) => {
  const [over, setOver] = useState(false);
  const id = nameToSlug(children);
  return (
    <Box
      direction="row"
      align="center"
      gap="small"
      id={id}
      margin={{ top: level === 3 ? 'medium' : 'large' }}
      onMouseOver={() => setOver(true)}
      onFocus={() => {}}
      onMouseOut={() => setOver(false)}
      onBlur={() => {}}
    >
      <Heading
        margin={{ vertical: 'small' }}
        level={level}
        size={level === 3 ? 'small' : undefined}
      >
        {children}
      </Heading>
      <Button
        a11yTitle={`Jump to section titled ${children}`}
        href={`#${id}`}
        icon={<LinkIcon color={over ? 'text-weak' : 'transparent'} />}
      />
    </Box>
  );
};

SubsectionHeader.propTypes = {
  children: PropTypes.string.isRequired,
  level: PropTypes.number,
};
