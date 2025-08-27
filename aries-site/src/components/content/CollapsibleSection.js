import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, Collapsible } from 'grommet';
import { Down, Up } from 'grommet-icons';
import { TextEmphasis } from 'aries-core';

export const CollapsibleSection = ({ label, onClick, ...rest }) => {
  const [open, setOpen] = useState(false);
  const [labelText, setLabelText] = useState();

  useEffect(() => {
    setLabelText(open ? label.open || label : label.closed || label);
  }, [label, open, setLabelText]);

  return (
    <>
      <Box
        background={{ color: 'background-contrast', opacity: '0.02' }}
        direction="row"
        gap="small"
        onClick={() => {
          setOpen(!open);
          if (onClick) onClick();
        }}
        border={!open ? null : { side: 'bottom', color: 'border' }}
        pad="medium"
        round={!open ? 'small' : { corner: 'top', size: 'small' }}
      >
        {!open ? <Down /> : <Up />}
        <TextEmphasis>{labelText}</TextEmphasis>
      </Box>
      <Collapsible open={open}>
        <Box
          // background="background-contrast"
          height={{ max: 'large' }}
          gap="medium"
          overflow="auto"
          pad={{ vertical: 'small' }}
          round={{ corner: 'bottom', size: 'small' }}
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
