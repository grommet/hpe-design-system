import React from 'react';
import { Box, Text } from 'grommet';

const labelColor = 'text';
interface ItemLabelProps {
  icon: React.ReactNode;
  label: string;
  color?: string;
}

export const ItemLabel = ({ icon, label, color = labelColor }: ItemLabelProps) => {
  const adjIcon = React.isValidElement(icon)
    ? React.cloneElement(icon as React.ReactElement<{ color?: string }>, {
        color,
      })
    : icon;

  return (
    <Box direction="row" gap="xxsmall" flex>
      {adjIcon && <Box
        pad={{ top: '4xsmall' }} // aligning icon with label text
        flex={false}
      >
        {adjIcon}
      </Box>}
      <Text color={color}>{label}</Text>
    </Box>
  );
};
