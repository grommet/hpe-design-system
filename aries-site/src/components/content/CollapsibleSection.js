import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Collapsible, Text } from 'grommet';
import { FormUp, FormDown } from 'grommet-icons';

export const CollapsibleSection = ({ label, onClick, ...rest }) => {
  const [open, setOpen] = useState(false);
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
        margin={{ bottom: 'xxsmall' }}
        pad="medium"
        round={!open ? 'small' : { corner: 'top', size: 'small' }}
      >
        {!open ? <FormDown /> : <FormUp />}
        <Text weight="bold">{label}</Text>
      </Box>
      <Collapsible open={open}>
        <Box
          background="background-contrast"
          height={{ max: 'medium' }}
          gap="medium"
          overflow="auto"
          pad="medium"
          round={{ corner: 'bottom', size: 'small' }}
          {...rest}
        />
      </Collapsible>
    </>
  );
};

CollapsibleSection.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func,
};
