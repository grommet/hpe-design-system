import { Box, Text } from 'grommet';
import { NavItemWithLevel } from '../NavList';

const indentation = {
  1: 'medium',
  2: 'large',
};

interface GroupHeadingProps {
  id: string;
  item: NavItemWithLevel;
}

export const GroupHeading = ({ id, item }: GroupHeadingProps) => {
  return (
      <Box
        direction="row"
        pad={{
          left: indentation[item.level as keyof typeof indentation] || 'small',
          top: 'xxsmall',
          bottom: '5xsmall',
        }}
        role="presentation"
      >
        <Text
          id={id}
          size="xsmall"
          weight="bold"
          role="heading"
          aria-level={3}
        >
          {item.label}
        </Text>
      </Box>
  );
};
