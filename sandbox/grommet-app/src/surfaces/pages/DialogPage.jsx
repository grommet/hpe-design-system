// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { useState } from 'react';
import { Box, Button, Drop, Layer, Text, Tip } from 'grommet';
import { Close } from '@hpe-design/icons-grommet';
import { Surface } from '../Surface';
import { TOKENS } from '../surfaceState';
import { StandardPage } from './StandardPage';

/**
 * Page 3 — dialog. A Grommet Layer over page 1: Layer = floating (via the
 * theme, layer.background), card inside = tone.1, nested panel = tone.2.
 * A Drop and a Tip are opened too (global.drop.background and
 * tip.content.background → surface.floating, #6071 Part 5).
 */
export const DialogPage = () => {
  const [showLayer, setShowLayer] = useState(true);
  const [showDrop, setShowDrop] = useState(true);
  const [dropTarget, setDropTarget] = useState(null);
  const close = () => setShowLayer(false);
  return (
    <Box fill>
      <StandardPage showFailureModes={false} />
      {!showLayer && (
        <Box
          pad="small"
          align="start"
          style={{ position: 'fixed', right: 24, bottom: 24 }}
        >
          <Button
            primary
            label="Reopen dialog"
            onClick={() => setShowLayer(true)}
          />
        </Box>
      )}
      {showLayer && (
        <Layer
          position="center"
          modal
          onEsc={close}
          onClickOutside={close}
          // Layer itself takes layer.background from the theme (surface.floating)
          data-surface-token="layer-component"
          data-surface-label="Grommet Layer (theme)"
        >
          <Box pad="medium" gap="medium" width="large">
            <Box direction="row" align="center" justify="between" gap="small">
              <Text weight={500}>
                Dialog · Layer background from theme → surface.floating
              </Text>
              <Button
                icon={<Close aria-hidden="true" />}
                a11yTitle="Close dialog"
                onClick={close}
              />
            </Box>
            <Surface
              token={TOKENS.tone1}
              label="Card in dialog"
              note="tones restart from floating (2f)"
            >
              <Surface
                token={TOKENS.tone2}
                label="Nested panel in dialog card"
              />
            </Surface>
            <Box direction="row" gap="small" align="center" justify="between">
              <Box direction="row" gap="small" align="center">
                <Tip
                  content="Tip content → surface.floating"
                  dropProps={{
                    'data-surface-token': 'tip-component',
                    'data-surface-label': 'Tip (theme)',
                  }}
                >
                  <Button label="Hover for Tip" />
                </Tip>
                <Button
                  ref={setDropTarget}
                  label={showDrop ? 'Hide Drop' : 'Show Drop'}
                  onClick={() => setShowDrop(v => !v)}
                />
                {showDrop && dropTarget && (
                  <Drop
                    target={dropTarget}
                    align={{ top: 'bottom', left: 'left' }}
                    data-surface-token="drop-component"
                    data-surface-label="Grommet Drop (theme)"
                  >
                    <Box pad="small" gap="small">
                      <Text size="small">
                        Drop → global.drop.background → surface.floating
                      </Text>
                      <Surface token={TOKENS.tone1} label="Card in drop" />
                    </Box>
                  </Drop>
                )}
              </Box>
              <Button label="Close" secondary onClick={close} />
            </Box>
          </Box>
        </Layer>
      )}
    </Box>
  );
};
