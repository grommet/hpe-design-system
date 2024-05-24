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
      round={!multiple ? 'full' : 'xxsmall'}
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

const SelectorHeader = ({ icon, indicator, description, title, selected }) => (
  <Box align="start" direction="row" pad="small" gap="small">
    <Box direction="row" gap="small" flex>
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
    {indicator && <SelectorIndicator selected={selected} />}
  </Box>
);

SelectorIndicator.propTypes = {
  selected: PropTypes.bool,
};

SelectorHeader.propTypes = {
  icon: PropTypes.element,
  indicator: PropTypes.bool,
  title: PropTypes.string,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  selected: PropTypes.bool,
};

SelectorHeader.defaultProps = {
  indicator: true,
};

export { SelectorHeader };
