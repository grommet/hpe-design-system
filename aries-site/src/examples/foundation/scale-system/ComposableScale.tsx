import { Box, Text, BoxProps } from 'grommet';

const ScaleCell = ({
  index,
  color,
  count,
  size,
  ...rest
}: {
  index: number;
  color: string;
  count: number;
  size: string;
  children?: React.ReactNode;
} & BoxProps) => {
  return (
    <Box
      height="5xsmall"
      width={size}
      background={{
        color: color,
        opacity: 1 - (index / count),
      }}
      {...rest}
    />
  );
};

const scaleCounts = {
  '3xsmall': { count: 8, color: 'decorative-brand' },
  xxsmall: { count: 6, color: 'decorative-blue' },
  xsmall: { count: 4, color: 'decorative-cyan' },
  small: { count: 3, color: 'decorative-purple' },
  medium: { count: 2, color: 'decorative-green' },
};

export const ComposableScale = () => {
  return (
    <Box>
      {Object.entries(scaleCounts).map(([size, { count, color }]) => (
        <Box
          key={size}
          direction="row"
          
        >
          {Array.from({ length: count }, (_, index) => (
            <ScaleCell
              key={`${size}-${index}`}
              index={index}
              color={color}
              count={count}
              size={size}
              align="center"
              justify="center"
            >
              {index === 0 && (
                <Text color="text-strong" size="small">
                  {size}
                </Text>
              )}
            </ScaleCell>
          ))}
        </Box>
      ))}
    </Box>
  );
};
