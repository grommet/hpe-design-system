import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Grid, Grommet, Layer, Text } from 'grommet';
import { Copy, Mode } from '@hpe-design/icons-grommet';
import { hpe } from 'grommet-theme-hpe';
import SyntaxHighlighter from 'react-syntax-highlighter/dist/cjs/prism';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

// Container width breakpoints (px)
const STACK_BREAKPOINT = 600;
const WIDE_BREAKPOINT = 900;

export const PlaygroundShell = ({
  componentName,
  preview,
  controls,
  code,
  propHandlingRows,
}) => {
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [previewDark, setPreviewDark] = useState(false);
  const [copied, setCopied] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [activePanel, setActivePanel] = useState('code');

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
      aria-label={`${componentName} playground`}
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

      {/* Code / Props panel */}
      <Box
        gridArea="code"
        margin="small"
        round="xsmall"
        background="dark-1"
        border={{ side: 'top', color: 'border' }}
        style={{
          minHeight: 0,
          minWidth: 0,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Tab bar */}
        <Box
          direction="row"
          align="center"
          justify="between"
          pad={{ horizontal: 'small', top: 'small', bottom: 'xsmall' }}
          border={{ side: 'bottom', color: 'dark-4' }}
          flex={false}
        >
          <Box direction="row" gap="xsmall">
            <Button
              label="Code"
              size="small"
              primary={activePanel === 'code'}
              plain={activePanel !== 'code'}
              onClick={() => setActivePanel('code')}
              style={{
                color: activePanel === 'code' ? undefined : '#bbb',
                fontWeight: activePanel === 'code' ? 'bold' : 'normal',
              }}
            />
            {propHandlingRows && propHandlingRows.length > 0 && (
              <Button
                label="Props"
                size="small"
                primary={activePanel === 'props'}
                plain={activePanel !== 'props'}
                onClick={() => setActivePanel('props')}
                style={{
                  color: activePanel === 'props' ? undefined : '#bbb',
                  fontWeight:
                    activePanel === 'props' ? 'bold' : 'normal',
                }}
              />
            )}
          </Box>
          {activePanel === 'code' && (
            <Button
              icon={<Copy size="small" color="light-3" />}
              tip={copied ? 'Copied!' : 'Copy to clipboard'}
              plain
              onClick={handleCopy}
              a11yTitle="Copy code to clipboard"
            />
          )}
        </Box>

        {/* Code view */}
        {activePanel === 'code' && (
          <Box overflow="auto" flex>
            <SyntaxHighlighter
              language="jsx"
              style={oneDark}
              customStyle={{
                margin: 0,
                background: 'transparent',
                fontSize: '12px',
                lineHeight: '1.6',
                padding: '8px 12px 12px',
              }}
            >
              {code}
            </SyntaxHighlighter>
          </Box>
        )}

        {/* Prop handling view */}
        {activePanel === 'props' && (
          <Box overflow="auto" flex>
            {/* Header row */}
            <Box
              direction="row"
              pad={{ horizontal: 'small', vertical: 'xsmall' }}
              border={{ side: 'bottom', color: 'dark-4' }}
              flex={false}
            >
              <Box width="xsmall">
                <Text size="xsmall" color="light-4" weight="bold">
                  prop
                </Text>
              </Box>
              <Box width="xsmall">
                <Text size="xsmall" color="light-4" weight="bold">
                  type
                </Text>
              </Box>
              <Box width="medium">
                <Text size="xsmall" color="light-4" weight="bold">
                  handling
                </Text>
              </Box>
              <Box flex>
                <Text size="xsmall" color="light-4" weight="bold">
                  rationale
                </Text>
              </Box>
            </Box>
            {(propHandlingRows || []).map((row, i) => (
              <Box
                key={row.prop}
                direction="row"
                pad={{ horizontal: 'small', vertical: 'xxsmall' }}
                background={i % 2 === 0 ? 'dark-1' : 'dark-2'}
                border={{ side: 'bottom', color: 'dark-4' }}
                flex={false}
              >
                <Box width="xsmall">
                  <Text
                    size="xsmall"
                    color="light-1"
                    style={{ fontFamily: 'monospace' }}
                  >
                    {row.prop}
                  </Text>
                </Box>
                <Box width="xsmall">
                  <Text size="xsmall" color="accent-4">
                    {row.csvType}
                  </Text>
                </Box>
                <Box width="medium">
                  <Text size="xsmall" color="accent-2">
                    {row.handling}
                  </Text>
                </Box>
                <Box flex>
                  <Text size="xsmall" color="light-4">
                    {row.rationale}
                  </Text>
                </Box>
              </Box>
            ))}
          </Box>
        )}
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
  propHandlingRows: PropTypes.arrayOf(
    PropTypes.shape({
      prop: PropTypes.string,
      csvType: PropTypes.string,
      handling: PropTypes.string,
      rationale: PropTypes.string,
    }),
  ),
};

PlaygroundShell.defaultProps = {
  propHandlingRows: [],
};

export default PlaygroundShell;
