import React from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, Grommet, Layer, Text, Button } from 'grommet';
import { Copy } from '@hpe-design/icons-grommet';
import { hpe } from 'grommet-theme-hpe';

/**
 * PlaygroundLayout
 *
 * Shared frame for all component playground pages.
 *
 * Usage:
 *   <PlaygroundLayout
 *     code={codeString}
 *     onCopy={handleCopy}
 *     copied={copied}
 *     panel={<YourControlPanel />}
 *   >
 *     <YourComponentPreview />
 *   </PlaygroundLayout>
 *
 * Props:
 *   children  — the component preview rendered in the main (left) area
 *   panel     — the right-side control panel contents
 *   code      — generated code string displayed in the bottom strip
 *   onCopy    — click handler for the copy button
 *   copied    — boolean — shows "Copied!" tip when true
 */
export default function PlaygroundLayout({
  children,
  panel,
  code,
  onCopy,
  copied,
}) {
  return (
    <Grommet theme={hpe} full>
      <Layer full modal={false} responsive={false}>
        <Grid
          fill
          rows={['flex', 'minmax(160px, 30vh)']}
          columns={['flex', 'medium']}
          areas={[
            { name: 'main', start: [0, 0], end: [0, 0] },
            { name: 'side', start: [1, 0], end: [1, 1] },
            { name: 'code', start: [0, 1], end: [0, 1] },
          ]}
          style={{ minHeight: 0, minWidth: 0 }}
        >
          {/* ── Preview ── */}
          <Box gridArea="main" align="center" justify="center" pad="large">
            {children}
          </Box>

          {/* ── Control panel ── */}
          <Box
            gridArea="side"
            background="background-back"
            border={{ side: 'left', color: 'border-weak' }}
            pad="medium"
            overflow="auto"
            style={{ minHeight: 0, minWidth: 0 }}
          >
            {panel}
          </Box>

          {/* ── Code strip ── */}
          <Box
            gridArea="code"
            as="pre"
            margin="none"
            pad="medium"
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
                Grommet code snippet
              </Text>
              <Button
                icon={<Copy size="small" color="light-3" />}
                tip={copied ? 'Copied!' : 'Copy to clipboard'}
                plain
                onClick={onCopy}
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
      </Layer>
    </Grommet>
  );
}

PlaygroundLayout.getLayout = (page) => page;

PlaygroundLayout.propTypes = {
  children: PropTypes.node.isRequired,
  panel: PropTypes.node.isRequired,
  code: PropTypes.string.isRequired,
  onCopy: PropTypes.func.isRequired,
  copied: PropTypes.bool.isRequired,
};
