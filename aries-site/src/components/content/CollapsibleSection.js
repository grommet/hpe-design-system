import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, Collapsible, Text } from 'grommet';
import { FormUp, FormDown } from 'grommet-icons';

export function CollapsibleSection({ label, onClick, ...rest }) {
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
        gap="small"
        onClick={() => {
          setOpen(!open);
          if (onClick) onClick();
        }}
        border={!open ? null : { side: 'bottom', color: 'border' }}
        pad="medium"
        round={!open ? 'small' : { corner: 'top', size: 'small' }}
      >
        {!open ? <FormDown /> : <FormUp />}
        <Text weight="bold">{labelText}</Text>
      </Box>
      <Collapsible open={open}>
        <Box
          background="background-contrast"
          height={{ max: 'large' }}
          gap="medium"
          overflow="auto"
          pad="medium"
          round={{ corner: 'bottom', size: 'small' }}
          {...rest}
        />
      </Collapsible>
    </>
  );
}

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
