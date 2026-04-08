import { Box, Text } from 'grommet';
import { NavItemWithLevel } from '../NavList';

const indentationByLevel = ['medium', 'large', 'xlarge', 'xxlarge'] as const;

const getLeftIndent = (level?: number) => {
  if (!level || level <= 0) return 'small';

  const index = Math.min(level - 1, indentationByLevel.length - 1);
  return indentationByLevel[index];
};

interface GroupHeadingProps {
  id: string;
  item: NavItemWithLevel;
}

export const GroupHeading = ({ id, item }: GroupHeadingProps) => {
  return (
      <Box
        direction="row"
        margin={{left: 'xxsmall'}}
        pad={{
          left: getLeftIndent(item.level),
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
