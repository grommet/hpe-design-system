import { useEffect, useState } from 'react';
import { Box, Text } from 'grommet';

const roundToNearest = (value, nearest) => {
  return Math.round(value / nearest) * nearest;
};

const createScale = (base, factor, steps, nearest) => {
  // TO DO: Refactor this to be more efficient

  const array = new Array(steps * 3).fill(0);
  const result = array
    .map((_, index) => {
      return roundToNearest(Math.pow(factor, index) * base, nearest || base);
    })
    .reduce((acc, value) => {
      if (!acc.includes(value)) {
        acc.push(value);
      }
      return acc;
    }, [])
    .splice(0, steps);

  // add values below the base to results, down to 0
  for (let i = base; i >= 0; i--) {
    const value = Math.floor(base / Math.pow(factor, i));

    if (!result.includes(value)) {
      result.push(value);
    }
  }

  return result.sort((a, b) => a - b);
};

export const Results = ({ base, factor, steps, nearest, ...rest }) => {
  const [scale, setScale] = useState([]);

  useEffect(() => {
    const nextScale = createScale(base, factor, steps, nearest);
    setScale(nextScale);
  }, [base, factor, steps, nearest]);

  return (
    <Box fill gap="xsmall" {...rest}>
      {scale &&
        scale.map((value, index) => {
          return (
            <Box key={value} direction="row" align="center" gap="medium">
              <Box align="end" width={{ min: 'xxsmall' }}>
                <Text key={index}>{value}px</Text>
              </Box>
              <Box
                background="brand"
                width={`${value}px`}
                height={`${value}px`}
              />
            </Box>
          );
        })}
    </Box>
  );
};
