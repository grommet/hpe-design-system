import { useEffect, useState } from 'react';
import { Box, Button, Text } from 'grommet';
import { Copy, Tasks } from 'grommet-icons';

const roundToNearest = (value, nearest) => {
  // return Math.round(value / nearest) * nearest;
  return Math.ceil(value / nearest) * nearest;
};

const createScale = (base, factor, steps, gridUnit) => {
  const values = [];
  // above base
  for (let i = 0; i < steps; i++) {
    values.push(roundToNearest(base * Math.pow(factor, i), gridUnit || base));
  }
  // below base
  for (let i = 0; i < steps; i++) {
    const value = base / Math.pow(factor, i);
    let nearest = gridUnit || base;

    // round to nearest even number
    if (value >= 4 && value < gridUnit) {
      nearest = 2;
    }
    // round to nearest integer
    else if (value < 4) {
      nearest = 1;
    }

    values.push(roundToNearest(value, nearest));
  }

  const result = values
    .reduce((acc, value) => {
      if (!acc.includes(value)) {
        acc.push(value);
      }
      return acc;
    }, [])
    .sort((a, b) => a - b);

  const stepsBelow = Math.ceil(steps / 2);
  const stepsAbove = Math.floor(steps / 2);
  const baseIndex = result.indexOf(base);
  const below = result.slice(
    Math.max(baseIndex + 1 - stepsBelow, 0),
    baseIndex + 1,
  );
  const above = result.slice(baseIndex + 1, baseIndex + 1 + stepsAbove);

  return [...below, ...above];
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

const tshirtSizes = [
  'xxxsmall',
  'xxsmall',
  'xsmall',
  'small',
  'medium',
  'large',
  'xlarge',
  'xxlarge',
  'xxxlarge',
];

export const Results = ({ base, factor, steps, nearest, setOpen, ...rest }) => {
  const [scale, setScale] = useState([]);
  const [stops, setStops] = useState([]);
  const [tshirtScale, setTshirtScale] = useState([]);

  // Create scale
  useEffect(() => {
    const nextScale = createScale(base, factor, steps, nearest);
    setScale(nextScale);
  }, [base, factor, steps, nearest]);

  // Create stops
  useEffect(() => {
    const nextStops = [base];
    const baseIndex = scale.indexOf(base);

    for (let i = baseIndex; i < scale.length; i++) {
      if (scale[i] / nextStops[nextStops.length - 1] > factor) {
        nextStops.push(scale[i]);
      }
    }
    for (let i = baseIndex - 1; i >= 0; i--) {
      if (nextStops[0] / scale[i] > factor) {
        nextStops.unshift(scale[i]);
      }
    }
    setStops(nextStops.sort((a, b) => a - b));
  }, [base, factor, steps, scale]);

  // Create t-shirt sizes
  useEffect(() => {
    const baseIndex = scale.indexOf(base);
    const mediumIndex = tshirtSizes.indexOf('medium');

    const tshirt = tshirtSizes.reduce((acc, size, index) => {
      const value = scale[baseIndex - mediumIndex + index];
      if (value) {
        acc[size] = value;
      }
      return acc;
    }, {});

    const nextTshirtScale = Object.entries(tshirt).map(([size, value]) => {
      return { size, value };
    });
    setTshirtScale(nextTshirtScale);
  }, [base, scale]);

  return (
    <Box
      fill
      direction="row"
      justify="between"
      height={{ min: 'medium' }}
      {...rest}
    >
      <Box>
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
                    background={
                      value === base
                        ? 'purple'
                        : stops.includes(value)
                        ? 'purple!'
                        : 'brand'
                    }
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
        <Box
          direction="row"
          align="end"
          alignSelf="center"
          cssGap
          gap="medium"
          wrap
        >
          {stops &&
            stops.map((value, index) => {
              return (
                <Box key={value} align="center" gap="xsmall">
                  <Box
                    background={stops.includes(value) ? 'purple!' : 'brand'}
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
