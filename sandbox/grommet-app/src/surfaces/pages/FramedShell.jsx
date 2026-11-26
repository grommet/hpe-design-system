// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { Box, Grid } from 'grommet';
import PropTypes from 'prop-types';
import { Lines, MetricLines, Surface } from '../Surface';
import { HeaderBar, NavList, PageTitle, Rail } from '../Furniture';
import { TOKENS } from '../surfaceState';

/**
 * Page 2 — framed shell (#6708). Chrome (rail + local nav) wraps a rounded
 * content sheet with a contextual panel beside it.
 *
 *   Chrome = tone.1 · sheet and panel = base · cards = tone.1 · inner = tone.2
 *
 * This is the A′ reading of decisions 13 and 23: the workspace is `base`
 * whether or not chrome surrounds it. `sheetToken` lets the alternative
 * reading (sheet = tone.2, the workspace as a container in the chrome) be
 * shown for comparison.
 *
 * The Grommet root (base) sits behind the chrome and is never visible in
 * the real UI — the chrome fills the viewport. It is drawn here as a dashed
 * scaffold strip, separated from the chrome by a sliver of its own colour,
 * only so the stack of surfaces is explicit.
 */
export const FramedShell = ({ sheetToken = TOKENS.base }) => (
  <Surface
    token={TOKENS.base}
    label="Root"
    note="Grommet root · surface.base · behind the chrome, never seen in the product"
    scaffold
    fill
    round={false}
    gap="xsmall"
    pad={{ top: 'xsmall', horizontal: 'xsmall' }}
  >
    <Surface
      token={TOKENS.tone1}
      label="Chrome"
      region
      note="decision 13: a tone-1 container on the root · rail + local nav + frame"
      fill
      round={false}
      pad={{ top: 'small' }}
      gap="small"
    >
      <Box direction="row" flex gap="none">
        <Rail border={{ side: 'right', color: 'border-weak' }} />
        <Box
          width="small"
          gap="xsmall"
          flex={false}
          pad="small"
          data-surface-token="none"
          data-surface-label="Local nav (no surface)"
        >
          <Surface
            token={undefined}
            label="Local nav"
            region
            note="no surface · inherits the chrome"
            pad="none"
          />
          <NavList />
        </Box>

        <Box
          flex
          direction="row"
          gap="small"
          pad={{ right: 'small', bottom: 'small' }}
        >
          <Surface
            token={sheetToken}
            label="Content sheet"
            region
            note={
              sheetToken === TOKENS.base
                ? 'A′: workspace is base inside chrome'
                : 'alternative: sheet as a tone-2 container'
            }
            flex
            round="large"
            pad="medium"
            gap="medium"
          >
            <HeaderBar />
            <PageTitle />
            <Grid columns={{ count: 'fit', size: 'small' }} gap="medium">
              <Surface token={TOKENS.tone1} label="Card A">
                <MetricLines />
              </Surface>
              <Surface token={TOKENS.tone1} label="Card B">
                <Lines count={2} />
                <Surface token={TOKENS.tone2} label="Inner panel">
                  <Lines count={2} />
                </Surface>
              </Surface>
              <Surface token={TOKENS.tone1} label="Card C">
                <MetricLines />
              </Surface>
            </Grid>
          </Surface>

          <Surface
            token={sheetToken}
            label="Contextual panel"
            region
            width="medium"
            flex={false}
            round="large"
          >
            <Lines count={3} />
            <Surface token={TOKENS.tone1} label="Card in panel">
              <Lines count={2} />
              <Surface token={TOKENS.tone2} label="Inner">
                <Lines count={1} />
              </Surface>
            </Surface>
          </Surface>
        </Box>
      </Box>
    </Surface>
  </Surface>
);

FramedShell.propTypes = { sheetToken: PropTypes.string };
