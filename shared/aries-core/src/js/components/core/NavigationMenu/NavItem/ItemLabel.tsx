import React from 'react';
import { Box, Text } from 'grommet';

const labelColor = 'text-strong';
interface ItemLabelProps {
  icon: React.ReactNode;
  label: string;
}

export const ItemLabel = ({ icon, label }: ItemLabelProps) => {
  const adjIcon = React.isValidElement(icon)
    ? React.cloneElement(icon as React.ReactElement<{ color?: string }>, {
        color: labelColor,
      })
    : icon;

  return (
    <Box direction="row" gap="xxsmall" flex>
      <Box
        pad={{ top: '5xsmall' }} // aligning icon with label text
        flex={false}
      >
        {adjIcon}
      </Box>
      <Text color={labelColor}>{label}</Text>
    </Box>
  );
};
