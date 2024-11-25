import { useEffect, useState } from 'react';
import { Box, Button, Grid, Text } from 'grommet';
import { Copy, Tasks } from 'grommet-icons';

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

const defaultCopyTip = 'Copy scale to clipboard';

const CopyButton = ({ scale, ...rest }) => {
  const [copyTip, setCopyTip] = useState(defaultCopyTip);

  const onCopy = () => {
    const duration = 2000;
    navigator.clipboard.writeText(`${JSON.stringify(scale, null, 2)}`);
    setCopyTip('Copied!');
    const timer = setTimeout(() => {
      setCopyTip(defaultCopyTip);
    }, duration);
    return () => clearTimeout(timer);
  };

  return (
    <Button
      a11yTitle={copyTip}
      tip={copyTip}
      icon={<Copy aria-hidden="true" />}
      onClick={onCopy}
      {...rest}
    />
  );
};

export const Results = ({ base, factor, steps, nearest, setOpen, ...rest }) => {
  const [scale, setScale] = useState([]);

  useEffect(() => {
    const nextScale = createScale(base, factor, steps, nearest);
    setScale(nextScale);
  }, [base, factor, steps, nearest]);

  return (
    <Box
      fill
      direction="row"
      justify="between"
      height={{ min: 'medium' }}
      {...rest}
    >
      <Box
        direction="row"
        align="end"
        alignSelf="center"
        cssGap
        gap="medium"
        wrap
      >
        {scale &&
          scale.map((value, index) => {
            return (
              <Box key={value} align="center" gap="xsmall">
                <Box
                  background="brand"
                  width={`${value}px`}
                  height={`${value}px`}
                />
                <Text key={index} size="small">
                  {value}px
                </Text>
              </Box>
            );
          })}
      </Box>
      <Box gap="xsmall" flex={false}>
        <Button
          tip="Open scale settings"
          icon={<Tasks aria-hidden="true" />}
          onClick={setOpen}
        />
        <CopyButton scale={scale} />
      </Box>
    </Box>
  );
};
