import { Box, Text } from 'grommet';
import { NavItemWithLevel } from '../NavList';

const indentation: Record<number, string> = {
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
          left: item.level ? indentation[item.level] : 'small',
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
          aria-level={3} // TODO: Consider making this dynamic based on nesting level or allowing it to be passed in as a prop for more flexibility.
        >
          {item.label}
        </Text>
      </Box>
  );
};
