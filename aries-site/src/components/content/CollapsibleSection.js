import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, Collapsible } from 'grommet';
import { Down, Up } from '@hpe-design/icons-grommet';
import { TextEmphasis } from '@shared/aries-core';

export const CollapsibleSection = ({ label, onClick, ...rest }) => {
  const [open, setOpen] = useState(false);
  const [labelText, setLabelText] = useState();

  useEffect(() => {
    setLabelText(open ? label.open || label : label.closed || label);
  }, [label, open, setLabelText]);

  return (
    <>
      <Box
        background="background-contrast"
        direction="row"
        gap="xsmall"
        onClick={() => {
          setOpen(!open);
          if (onClick) onClick();
        }}
        border={!open ? null : { side: 'bottom', color: 'border' }}
        pad="medium"
        round={!open ? 'medium' : { corner: 'top', size: 'medium' }}
      >
        {!open ? <Down /> : <Up />}
        <TextEmphasis>{labelText}</TextEmphasis>
      </Box>
      <Collapsible open={open}>
        <Box
          background="background-contrast"
          height={{ max: 'xlarge' }}
          gap="medium"
          overflow="auto"
          pad="medium"
          round={{ corner: 'bottom', size: 'medium' }}
          {...rest}
        />
      </Collapsible>
    </>
  );
};

CollapsibleSection.propTypes = {
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      closed: PropTypes.string,
      open: PropTypes.string,
    }),
  ]),
  onClick: PropTypes.func,
};
