import React, { cloneElement } from 'react';
import { Box, Heading, HeadingProps, Paragraph } from 'grommet';
import { DriveCage } from 'grommet-icons';

export const EmptyState = ({
  actions,
  align = 'center',
  description,
  icon: iconProp,
  level,
  title,
}: {
  actions: React.ReactNode | React.ReactNode[];
  align?: 'start' | 'center';
  description?: string;
  icon?: React.ReactElement;
  level: HeadingProps['level'];
  title: string;
}) => {
  let icon = iconProp;
  if (iconProp && !iconProp.props.size)
    icon = cloneElement(iconProp, { size: 'xlarge' });

  return (
    <Box gap="medium" align={align} flex={false}>
      <Box align={align} gap='xsmall'>
        {icon}
        <Box align={align} gap='3xsmall'>
          <Heading margin="none" level={level}>
            {title}
          </Heading>
          <Paragraph margin="none" textAlign={align}>
            {description}
          </Paragraph>
        </Box>
      </Box>
      {actions}
    </Box>
  );
};
