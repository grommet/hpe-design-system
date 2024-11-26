import { useEffect, useState } from 'react';
import { Box, Button, Text } from 'grommet';
import { Copy, Tasks } from 'grommet-icons';

const roundToNearest = (value, nearest) => {
  return Math.round(value / nearest) * nearest;
};

const createScale = (base, factor, steps, nearest) => {
  const stepsAbove = Math.ceil(steps / 2);
  const stepsBelow = Math.floor(steps / 2);
  const values = [];
  for (let i = 0; i < stepsAbove; i++) {
    values.push(roundToNearest(base * Math.pow(factor, i), nearest || base));
  }
  for (let i = 1; i < stepsBelow; i++) {
    values.push(Math.round(base / Math.pow(factor, i)));
  }

  const result = values
    .reduce((acc, value) => {
      if (!acc.includes(value)) {
        acc.push(value);
      }
      return acc;
    }, [])
    .sort((a, b) => a - b);

  return result;
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
