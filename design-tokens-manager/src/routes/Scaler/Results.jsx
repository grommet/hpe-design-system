import { useEffect, useState } from 'react';
import { Box, Button } from 'grommet';
import { Sidebar } from 'grommet-icons';
import { ContentPane } from '../../components/ContentPane';
import {
  CopyButton,
  ScaleLayout,
  ScaleToolbar,
  ScaleValue,
  SpacingValues,
} from './components';
import { createScale } from './utils';

const tshirtSizes = [
  '5xsmall',
  '4xsmall',
  '3xsmall',
  'xxsmall',
  'xsmall',
  'small',
  'medium',
  'large',
  'xlarge',
  'xxlarge',
  '3xlarge',
  '4xlarge',
  '5xlarge',
];

export const Results = ({
  base,
  factor,
  steps,
  nearest,
  open,
  setOpen,
  ...rest
}) => {
  const [scale, setScale] = useState([]);
  const [stops, setStops] = useState([]);
  const [tshirtScale, setTshirtScale] = useState([]);

  // Create full scale
  useEffect(() => {
    const nextScale = createScale(base, factor, steps, nearest);
    setScale(nextScale);
  }, [base, factor, steps, nearest]);

  // Create major scale stops
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
    <Box fill align="start" gap="large" {...rest}>
      <ContentPane
        contain
        actions={[
          <ScaleToolbar
            direction="row-reverse"
            scale={scale}
            open={open}
            setOpen={setOpen}
          />,
        ]}
        fill
      >
        <Box gap="large" alignSelf="center">
          <ScaleLayout>
            {scale &&
              scale.map(value => {
                return (
                  <ScaleValue
                    key={value}
                    base={base}
                    stops={stops}
                    value={value}
                  />
                );
              })}
          </ScaleLayout>
          <ScaleLayout>
            {stops &&
              stops.map(value => {
                return (
                  <ScaleValue
                    key={value}
                    base={base}
                    stops={stops}
                    value={value}
                  />
                );
              })}
          </ScaleLayout>
        </Box>
      </ContentPane>
      <Box direction="row" gap="large">
        <ContentPane
          level={2}
          heading="Spacing sizes"
          contain
          actions={[
            <CopyButton content={tshirtScale} tip="Copy spacing values" />,
          ]}
        >
          <SpacingValues values={tshirtScale} />
        </ContentPane>
        <ContentPane
          level={2}
          heading="Content sizes"
          contain
          actions={[
            <CopyButton content={tshirtScale} tip="Copy content sizes" />,
          ]}
        >
          <SpacingValues values={tshirtScale} />
        </ContentPane>
      </Box>
    </Box>
  );
};
