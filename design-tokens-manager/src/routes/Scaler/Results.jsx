import { useEffect, useState } from 'react';
import { Box } from 'grommet';
import { ContentPane, CopyButton } from '../../components';
import {
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
  contentBase,
  factor,
  steps,
  nearest,
  open,
  setOpen,
  scale,
  setScale,
  ...rest
}) => {
  const [stops, setStops] = useState([]);
  const [tshirtSpacing, setTshirtSpacing] = useState([]);
  const [tshirtContent, setTshirtContent] = useState([]);

  // Create full scale
  useEffect(() => {
    const nextScale = createScale(base, factor, steps, nearest);
    setScale(nextScale);
  }, [base, factor, steps, nearest, setScale]);

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
    const contentIndex = scale.indexOf(contentBase);
    const mediumIndex = tshirtSizes.indexOf('medium');

    const space = tshirtSizes.reduce((acc, size, index) => {
      const value = scale[baseIndex - mediumIndex + index];
      if (value) {
        acc[size] = value;
      }
      return acc;
    }, {});

    const nextTshirtSpacing = Object.entries(space).map(([size, value]) => {
      return { size, value };
    });

    if (contentBase) {
      const content = tshirtSizes.reduce((acc, size, index) => {
        const value = scale[contentIndex - mediumIndex + index];
        if (value) {
          acc[size] = value;
        }
        return acc;
      }, {});

      const nextTshirtContent = Object.entries(content).map(([size, value]) => {
        return { size, value };
      });

      setTshirtContent(nextTshirtContent);
    }

    setTshirtSpacing(nextTshirtSpacing);
  }, [base, contentBase, scale]);

  return (
    <Box fill align="start" gap="large" {...rest}>
      <ContentPane
        contain
        actions={
          <ScaleToolbar
            direction="row-reverse"
            scale={scale}
            open={open}
            setOpen={setOpen}
          />
        }
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
          actions={
            <CopyButton content={tshirtSpacing} tip="Copy spacing values" />
          }
        >
          <SpacingValues values={tshirtSpacing} />
        </ContentPane>
        <ContentPane
          level={2}
          heading="Content sizes"
          contain
          actions={
            <CopyButton content={tshirtContent} tip="Copy content sizes" />
          }
        >
          <SpacingValues values={tshirtContent} />
        </ContentPane>
      </Box>
      <ScaleToolbar open={open} setOpen={setOpen} scale={scale} />
    </Box>
  );
};
