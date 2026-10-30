// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { Box, Button, Grid, Text } from 'grommet';
import PropTypes from 'prop-types';
import { Surface } from '../Surface';
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
 */
export const FramedShell = ({ sheetToken = TOKENS.base }) => (
  <Surface
    token={TOKENS.base}
    label="Root"
    fill
    pad="none"
    round={false}
    gap="none"
  >
    <Surface
      token={TOKENS.tone1}
      label="Chrome (rail + local nav + frame)"
      note="decision 13: a tone-1 container on the root"
      fill
      round={false}
      pad="small"
      gap="small"
    >
      <Box direction="row" flex gap="small">
        <Box
          width="xxsmall"
          gap="small"
          align="center"
          flex={false}
          data-surface-token="none"
          data-surface-label="Rail (no surface)"
        >
          {['A', 'B', 'C'].map(i => (
            <Button key={i} label={i} plain hoverIndicator />
          ))}
        </Box>
        <Box
          width="small"
          gap="xsmall"
          flex={false}
          data-surface-token="none"
          data-surface-label="Local nav (no surface)"
        >
          <Text size="small" weight={500}>
            Local nav (no surface)
          </Text>
          {['Overview', 'Devices', 'Alerts'].map(i => (
            <Button key={i} label={i} plain hoverIndicator />
          ))}
        </Box>

        <Surface
          token={sheetToken}
          label="Content sheet"
          note={
            sheetToken === TOKENS.base
              ? 'A′: workspace is base inside chrome'
              : 'alternative: sheet as a tone-2 container'
          }
          flex
          round="medium"
          pad="medium"
        >
          <Grid columns={{ count: 'fit', size: 'small' }} gap="medium">
            <Surface token={TOKENS.tone1} label="Card A" />
            <Surface token={TOKENS.tone1} label="Card B">
              <Surface token={TOKENS.tone2} label="Inner panel" />
            </Surface>
            <Surface token={TOKENS.tone1} label="Card C" />
          </Grid>
        </Surface>

        <Surface
          token={sheetToken}
          label="Contextual panel"
          width="medium"
          flex={false}
          round="medium"
        >
          <Surface token={TOKENS.tone1} label="Card in panel">
            <Surface token={TOKENS.tone2} label="Inner" />
          </Surface>
        </Surface>
      </Box>
    </Surface>
  </Surface>
);

FramedShell.propTypes = { sheetToken: PropTypes.string };
