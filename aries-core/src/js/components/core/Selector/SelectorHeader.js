import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Box, Text } from 'grommet';
import { Checkmark, StatusGoodSmall } from 'grommet-icons';
import { SelectorGroupContext } from './SelectorGroup';

const SelectorIndicator = ({ selected }) => {
  const { multiple } = useContext(SelectorGroupContext);

  return (
    <Box
      pad="xsmall"
      border={{
        color: selected ? 'brand' : 'border',
        size: 'xsmall',
      }}
      round={!multiple ? 'full' : undefined}
      height="24px"
      width="24px"
      justify="center"
      align="center"
      background={selected && multiple ? 'brand' : undefined}
    >
      {selected &&
        (multiple ? (
          <Checkmark size="small" />
        ) : (
          <StatusGoodSmall size="small" color="brand" />
        ))}
    </Box>
  );
};

const SelectorHeader = ({ icon, plain, description, title, selected }) => (
  <Box align="start" direction="row" pad="small" gap="small">
    <Box direction="row" gap="small" flex wrap>
      {icon}
      <Box>
        {title && <Text weight={500}>{title}</Text>}
        {typeof description === 'string' ? (
          <Text>{description}</Text>
        ) : (
          description
        )}
      </Box>
    </Box>
    {!plain && <SelectorIndicator selected={selected} />}
  </Box>
);

SelectorIndicator.propTypes = {
  selected: PropTypes.bool,
};

SelectorHeader.propTypes = {
  icon: PropTypes.element,
  plain: PropTypes.bool,
  title: PropTypes.string,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  selected: PropTypes.bool,
};

export { SelectorHeader };
