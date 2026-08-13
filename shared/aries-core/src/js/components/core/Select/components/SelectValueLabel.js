import React from 'react';
import { Box, Text, ThemeContext } from 'grommet';
import { hpe as hpeTheme } from 'grommet-theme-hpe';
import { Cpu } from '@hpe-design/icons-grommet';

const HPE_OPTION_PAD = hpeTheme?.button?.size?.medium?.option?.pad;

const SelectValueLabel = ({
  option,
  placeholder = 'Select a service',
  placeholderIcon: PlaceholderIcon = Cpu,
  placeholderIconColor = 'text-weak',
  selectedIcon: SelectedIcon = Cpu,
  selectedIconColor,
  optionPad,
  ...rest
}) => {
  const theme = React.useContext(ThemeContext);
  const pad = optionPad ||
    theme?.button?.size?.medium?.option?.pad ||
    HPE_OPTION_PAD || { horizontal: 'small', vertical: 'xsmall' };

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
    const Icon = option.icon;

    content = (
      <>
        <Box responsive={false} direction="row" align="center" gap="xsmall">
          {SelectedIcon ? (
            <SelectedIcon size="small" color={selectedIconColor} />
          ) : null}
          <Text>{option.label}</Text>
        </Box>
        {Icon ? <Icon size="small" color={option.iconColor} /> : null}
      </>
    );
  }

  return (
    <Box
      responsive={false}
      direction="row"
      align="center"
      justify={option ? 'between' : undefined}
      gap={option ? undefined : 'small'}
      fill={option ? 'horizontal' : undefined}
      pad={pad}
      {...rest}
    >
      {content}
    </Box>
  );
};

export { SelectValueLabel };
