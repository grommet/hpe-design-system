import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Grid, Grommet, Layer, Text } from 'grommet';
import { Copy, Mode } from '@hpe-design/icons-grommet';
import { hpe } from 'grommet-theme-hpe';

// Container width breakpoints (px)
const STACK_BREAKPOINT = 600;
const WIDE_BREAKPOINT = 900;

export const PlaygroundShell = ({
  componentName,
  preview,
  controls,
  code,
}) => {
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [previewDark, setPreviewDark] = useState(false);
  const [copied, setCopied] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return undefined;
    const observer = new ResizeObserver(([entry]) => {
      setContainerWidth(entry.contentRect.width);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const isNarrow =
    containerWidth > 0 && containerWidth < STACK_BREAKPOINT;
  const isWide = containerWidth >= WIDE_BREAKPOINT;

  const gridRows = isNarrow
    ? ['minmax(140px, 180px)', 'flex', 'minmax(80px, 120px)']
    : ['flex', 'minmax(120px, 160px)'];

  // eslint-disable-next-line no-nested-ternary
  const gridColumns = isNarrow
    ? ['flex']
    : isWide
    ? ['flex', 'medium']
    : ['flex', 'small'];

  const gridAreas = isNarrow
    ? [
        { name: 'main', start: [0, 0], end: [0, 0] },
        { name: 'side', start: [0, 1], end: [0, 1] },
        { name: 'code', start: [0, 2], end: [0, 2] },
      ]
    : [
        { name: 'main', start: [0, 0], end: [0, 0] },
        { name: 'side', start: [1, 0], end: [1, 1] },
        { name: 'code', start: [0, 1], end: [0, 1] },
      ];

  const toggleFullscreen = () => setFullscreen(f => !f);

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const grid = (
    <Grid
      ref={containerRef}
      fill
      rows={gridRows}
      columns={gridColumns}
      areas={gridAreas}
      style={{ minHeight: 0, minWidth: 0 }}
    >
      {/* Preview zone */}
      <Box
        gridArea="main"
        style={{ position: 'relative', minHeight: 0, minWidth: 0 }}
      >
        <Grommet
          theme={hpe}
          themeMode={previewDark ? 'dark' : 'light'}
          style={{
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box
            fill
            align="center"
            justify="center"
            pad="large"
            background="background-front"
          >
            {preview}
          </Box>
          <Box
            direction="row"
            gap="xsmall"
            style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
            }}
          >
            <Button
              label={
                fullscreen
                  ? 'Exit fullscreen'
                  : 'Fullscreen'
              }
              size="small"
              secondary
              onClick={toggleFullscreen}
            />
            <Button
              icon={<Mode />}
              tip="Toggle light/dark preview"
              secondary
              size="small"
              onClick={() => setPreviewDark(d => !d)}
              a11yTitle="Toggle preview dark mode"
            />
          </Box>
        </Grommet>
      </Box>

      {/* Controls panel */}
      <Box
        gridArea="side"
        background="background-back"
        border={{ side: 'left', color: 'border-weak' }}
        pad="small"
        overflow="auto"
        style={{ minHeight: 0, minWidth: 0 }}
      >
        {controls}
      </Box>

      {/* Code zone */}
      <Box
        gridArea="code"
        as="pre"
        margin="small"
        round="xsmall"
        pad="small"
        background="dark-1"
        overflow="auto"
        border={{ side: 'top', color: 'border' }}
        style={{ minHeight: 0, minWidth: 0 }}
      >
        <Box
          direction="row"
          align="center"
          justify="between"
          margin={{ bottom: 'xsmall' }}
        >
          <Text size="small" color="light-3" weight="bold">
            {componentName} — code snippet
          </Text>
          <Button
            icon={<Copy size="small" color="light-3" />}
            tip={copied ? 'Copied!' : 'Copy to clipboard'}
            plain
            onClick={handleCopy}
            a11yTitle="Copy code to clipboard"
          />
        </Box>
        <Text
          size="xsmall"
          color="light-1"
          style={{ fontFamily: 'monospace', whiteSpace: 'pre' }}
        >
          {code}
        </Text>
      </Box>
    </Grid>
  );

  if (fullscreen) {
    return (
      <Grommet theme={hpe} full>
        <Layer full modal={false}>
          {grid}
        </Layer>
      </Grommet>
    );
  }

  return grid;
};

PlaygroundShell.propTypes = {
  componentName: PropTypes.string.isRequired,
  preview: PropTypes.node.isRequired,
  controls: PropTypes.node.isRequired,
  code: PropTypes.string.isRequired,
};

export default PlaygroundShell;
