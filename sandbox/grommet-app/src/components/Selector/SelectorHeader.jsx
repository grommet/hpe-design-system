/* eslint-disable react/prop-types */
import { useContext } from 'react';
import { Box, Text, ThemeContext } from 'grommet';
import { Checkmark } from 'grommet-icons';
import { SelectorGroupContext } from './SelectorGroupContext';

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

export { SelectorHeader };
