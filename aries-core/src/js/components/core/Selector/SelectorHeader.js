import React, { cloneElement, useContext } from 'react';
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
        color: selected ? 'transparent' : 'border',
        size: '3xsmall',
      }}
      round={round}
      height={theme.global.edgeSize[size]}
      width={theme.global.edgeSize[size]}
      justify="center"
      align="center"
      background={selected ? 'background-selected-primary-strong' : undefined}
      flex={false}
      {...rest}
    >
      {selected && <Checkmark aria-label="selected" size="small" />}
    </Box>
  );
};

const SelectorHeader = ({
  direction = 'column',
  icon: iconProp,
  indicator,
  description,
  title,
  selected,
}) => {
  let icon = iconProp;
  if (iconProp && direction === 'column')
    icon = cloneElement(iconProp, {
      height: undefined,
    });
  return (
    <Box direction="row" gap="3xsmall" flex={false}>
      {direction === 'row' && icon}
      <Box flex>
        <Box gap="3xsmall" flex>
          {/* if we use columnn, we dont need any padding on icon, 
        if we use row we do need the pad on icon. */}
          {direction === 'column' && icon}
          {typeof title === 'string' ? (
            <Text weight={500} wordBreak="break-word">
              {title}
            </Text>
          ) : (
            title
          )}
        </Box>
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
};

SelectorIndicator.propTypes = {
  selected: PropTypes.bool,
  indicator: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
};

SelectorHeader.propTypes = {
  icon: PropTypes.element,
  indicator: PropTypes.bool,
  title: PropTypes.string,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  direction: PropTypes.oneOfType([PropTypes.oneOf(['row', 'column'])]),
  selected: PropTypes.bool,
};

SelectorHeader.defaultProps = {
  indicator: true,
};

export { SelectorHeader };
