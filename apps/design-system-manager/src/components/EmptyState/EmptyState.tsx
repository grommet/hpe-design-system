// EmptyState.js
import { cloneElement } from 'react';
import { Box, Heading, Paragraph } from 'grommet';
import type { HeadingProps } from 'grommet';

interface EmptyStateProps {
  actions?: React.ReactNode;
  align?: 'start' | 'center' | 'end';
  description?: string | React.ReactNode;
  icon?: React.JSX.Element;
  level: HeadingProps['level'];
  title: string;
}

export const EmptyState = ({
  actions,
  align = 'center',
  description,
  icon: iconProp,
  level,
  title,
  ...rest
}: EmptyStateProps) => {
  let icon = iconProp;
  if (iconProp && !iconProp.props.size)
    icon = cloneElement(iconProp, {
      size: 'xxlarge',
    });

  return (
    <Box gap="medium" align={align} flex={false} {...rest}>
      {icon}
      <Box align={align} gap="xsmall">
        <Heading margin="none" level={level}>
          {title}
        </Heading>
        {typeof description === 'string' ? <Paragraph margin="none" textAlign={align}>
          {description}
        </Paragraph> : description}
      </Box>

      {actions}
    </Box>
  );
};
