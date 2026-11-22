// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { useState } from 'react';
import PropTypes from 'prop-types';
import { Anchor, Box, Button, Heading, Layer, Paragraph } from 'grommet';
import { Close, Info } from '@hpe-design/icons-grommet';
import { ARCHITECTURES } from '../surfaces';

// Button beside the architecture Select that explains the selected
// architecture in a paragraph. `overviewHref` links on to the Overview,
// which has the trade-offs and the comparison; omit it there.
export const ExplainArchitecture = ({ arch, overviewHref }) => {
  const [open, setOpen] = useState(false);
  const architecture =
    ARCHITECTURES.find(item => item.id === arch) || ARCHITECTURES[0];
  const close = () => setOpen(false);

  return (
    <>
      <Button
        icon={<Info aria-hidden="true" />}
        a11yTitle="Explain architecture"
        tip="Explain architecture"
        onClick={() => setOpen(true)}
      />
      {open && (
        <Layer position="center" onClickOutside={close} onEsc={close} modal>
          <Box pad="medium" gap="small" width="large">
            <Box direction="row" justify="between" align="start" gap="small">
              <Heading level={2} size="small" margin="none">
                {architecture.label}
              </Heading>
              <Button
                icon={<Close aria-hidden="true" />}
                a11yTitle="Close"
                onClick={close}
              />
            </Box>
            <Paragraph margin="none" fill>
              {architecture.explanation}
            </Paragraph>
            {overviewHref && (
              <Anchor
                href={overviewHref}
                label="Trade-offs and comparison in the Overview"
                onClick={close}
              />
            )}
          </Box>
        </Layer>
      )}
    </>
  );
};

ExplainArchitecture.propTypes = {
  arch: PropTypes.string.isRequired,
  overviewHref: PropTypes.string,
};
