import React from 'react';
import { Box, Text, ThemeContext } from 'grommet';
import { resolveOptionPad } from '../utils';

const SelectValueLabel = ({
  option,
  placeholder = 'Select a service',
  placeholderIcon: PlaceholderIcon = null,
  placeholderIconColor = 'text-weak',
  selectedIcon: SelectedIcon = null,
  selectedIconColor,
  optionPad,
  ...rest
}) => {
  const theme = React.useContext(ThemeContext);
  const pad = resolveOptionPad(theme, optionPad);

  let content;

  if (!option) {
    content = (
      <>
        {PlaceholderIcon ? (
          <PlaceholderIcon size="small" color={placeholderIconColor} />
        ) : null}
        <Text color="text-weak">{placeholder}</Text>
      </>
    );
  } else {
    const TrailingIcon = option.icon;

    content = (
      <>
        <Box responsive={false} direction="row" align="center" gap="xsmall">
          {SelectedIcon ? (
            <SelectedIcon size="small" color={selectedIconColor} />
          ) : null}
          <Text>{option.label}</Text>
        </Box>
        {TrailingIcon ? (
          <TrailingIcon size="small" color={option.iconColor} />
        ) : null}
      </>
    );
  }

  return (
    <Box
      responsive={false}
      direction="row"
      align="center"
      justify={option ? 'between' : undefined}
      gap={option ? undefined : 'xsmall'}
      style={option ? { width: '100%' } : undefined}
      pad={pad}
      {...rest}
    >
      {content}
    </Box>
  );
};

export { SelectValueLabel };
