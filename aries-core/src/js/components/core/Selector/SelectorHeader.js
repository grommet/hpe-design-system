import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Box, Text, ThemeContext } from 'grommet';
import { Checkmark } from 'grommet-icons';
import { SelectorGroupContext } from './SelectorGroup';

const SelectorIndicator = ({ selected, indicator, ...rest }) => {
  const { multiple } = useContext(SelectorGroupContext);
  const theme = useContext(ThemeContext);

  const { round = !multiple ? 'full' : 'xxsmall', size = 'medium' } = indicator;

  return (
    <Box
      border={{
        color: selected ? 'brand' : 'border',
        size: 'xsmall',
      }}
      round={round}
      height={theme.global.edgeSize[size]}
      width={theme.global.edgeSize[size]}
      justify="center"
      align="center"
      background={selected ? 'brand' : undefined}
      flex={false}
      {...rest}
    >
      {selected && (
        // I think we discussed making this a checkmark for both
        // (multiple ? (
        //   <Checkmark aria-label="selected" size="small" />
        // ) : (
        //  <StatusGoodSmall aria-label="selected" size="small" color="brand" />
        // ))}
        <Checkmark aria-label="selected" size="small" />
      )}
    </Box>
  );
};

const SelectorHeader = ({ icon, indicator, description, title, selected }) => (
  <Box direction="row" gap="small" flex={false}>
    {icon}
    <Box flex>
      {typeof title === 'string' ? (
        <Text weight={500} wordBreak="break-word">
          {title}
        </Text>
      ) : (
        title
      )}
      {typeof description === 'string' ? (
        <Text>{description}</Text>
      ) : (
        description
      )}
    </Box>
    {indicator && (
      <SelectorIndicator selected={selected} indicator={indicator} />
    )}
  </Box>
);

SelectorIndicator.propTypes = {
  selected: PropTypes.bool,
  indicator: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
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
