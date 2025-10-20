import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Heading } from 'grommet';
import { Link as LinkIcon } from '@hpe-design/icons-grommet';

import { HighlightPhrase } from '../../components';
import { nameToSlug } from '../../utils';

export const SubsectionHeader = ({ children, level }) => {
  const [over, setOver] = useState(false);
  const id = nameToSlug(children);
  return (
    <Box
      direction="row"
      align="center"
      gap="xsmall"
      id={id}
      margin={{ top: level === 3 ? 'medium' : 'xlarge' }}
      onMouseOver={() => setOver(true)}
      onFocus={() => setOver(true)}
      onMouseOut={() => setOver(false)}
      onBlur={() => setOver(false)}
    >
      <Heading margin={{ vertical: 'xsmall' }} level={level}>
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
