// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { Box, Button, Header, Layer, ResponsiveContext } from 'grommet';
import { Close, Menu } from '@hpe-design/icons-grommet';

type MenuLayerProps = {
  openLabel: string;
  closeLabel: string;
  header?: ReactNode;
  navigation?: ReactNode;
  footer?: ReactNode;
};

export const MenuLayer = ({
  openLabel,
  closeLabel,
  header,
  navigation,
  footer,
}: MenuLayerProps) => {
  const size = useContext(ResponsiveContext);
  const [showLayer, setShowLayer] = useState(false);
  const pad = { horizontal: 'medium', vertical: 'xsmall' } as const;

  return (
    <>
      <Button
        a11yTitle={openLabel}
        icon={<Menu aria-hidden />}
        onClick={() => setShowLayer(true)}
      />
      {showLayer && (
        <Layer
          full={!['xsmall', 'small'].includes(size) ? 'vertical' : true}
          modal={false}
          onClickOutside={() => setShowLayer(false)}
          onEsc={() => setShowLayer(false)}
          position={!['xsmall', 'small'].includes(size) ? 'left' : undefined}
        >
          <Box
            fill="vertical"
            width={!['xsmall', 'small'].includes(size) ? 'medium' : undefined}
            elevation="large"
          >
            <Header pad={pad}>
              <Button
                a11yTitle={closeLabel}
                icon={<Close aria-hidden />}
                onClick={() => setShowLayer(false)}
                autoFocus
              />
            </Header>
            <Box pad={pad} flex gap="medium" overflow="auto">
              {header}
              {navigation}
              <Box flex />
              {footer}
            </Box>
          </Box>
        </Layer>
      )}
    </>
  );
};
