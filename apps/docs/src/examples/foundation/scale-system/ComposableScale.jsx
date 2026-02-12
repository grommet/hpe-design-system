import { Box, Text } from 'grommet';

const ScaleCell = ({
  index,
  color,
  count,
  size,
  ...rest
}) => {
  return (
    <Box
      height="5xsmall"
      width={size}
      background={{
        color,
        opacity: 1 - (index / count),
      }}
      {...rest}
    />
  );
};

ScaleCell.propTypes = {
  index: Number,
  color: String,
  count: Number,
  size: String,
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
