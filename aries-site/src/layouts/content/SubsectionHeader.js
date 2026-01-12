import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box, Button, Heading } from 'grommet';
import { Link as LinkIcon } from '@hpe-design/icons-grommet';

import { HighlightPhrase } from '../../components';
import { nameToSlug } from '../../utils';

const StyledSubsectionBox = styled(Box)`
  &[data-is-first="true"] {
    margin-top: 0 !important;
  }
`;

export const SubsectionHeader = ({ headingSize, children, level }) => {
  const [over, setOver] = useState(false);
  const [isFirst, setIsFirst] = useState(false);
  const boxRef = useRef(null);
  const id = nameToSlug(children);

  useEffect(() => {
    if (boxRef.current) {
      // Check if there's a previous sibling with the header attribute
      const previousHeader = boxRef.current.previousElementSibling;
      const hasPreviousHeader =
        previousHeader &&
        previousHeader.getAttribute('data-subsection-header') === 'true';
      setIsFirst(!hasPreviousHeader);
    }
  }, []);

  return (
    <StyledSubsectionBox
      ref={boxRef}
      data-subsection-header="true"
      data-is-first={isFirst}
      direction="row"
      align="center"
      gap="xsmall"
      id={id}
      margin={
        isFirst
          ? { top: 'none' }
          : { top: level === 3 ? 'medium' : 'xlarge' }
      }
      onMouseOver={() => setOver(true)}
      onFocus={() => setOver(true)}
      onMouseOut={() => setOver(false)}
      onBlur={() => setOver(false)}
    >
      <Heading size={headingSize} margin={{ vertical: 'xsmall' }} level={level}>
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
    </StyledSubsectionBox>
  );
};

SubsectionHeader.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
  level: PropTypes.number,
  headingSize: PropTypes.string,
};
