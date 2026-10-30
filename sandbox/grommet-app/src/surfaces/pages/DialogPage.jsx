// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { useState } from 'react';
import { Box, Button, Drop, Layer, Text, Tip } from 'grommet';
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
  const [showDrop, setShowDrop] = useState(true);
  const [dropTarget, setDropTarget] = useState(null);
  return (
    <Box fill>
      <StandardPage showFailureModes={false} />
      <Layer
        position="center"
        modal
        onEsc={() => {}}
        // Layer itself takes layer.background from the theme (surface.floating)
        data-surface-token="layer-component"
        data-surface-label="Grommet Layer (theme)"
      >
        <Box pad="medium" gap="medium" width="large">
          <Text weight={500}>
            Dialog · Layer background from theme → surface.floating
          </Text>
          <Surface
            token={TOKENS.tone1}
            label="Card in dialog"
            note="tones restart from floating (2f)"
          >
            <Surface token={TOKENS.tone2} label="Nested panel in dialog card" />
          </Surface>
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
        </Box>
      </Layer>
    </Box>
  );
};
