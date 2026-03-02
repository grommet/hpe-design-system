import React, { useState, useContext } from 'react';
import {
  AnnounceContext,
  Box,
  Button,
  ResponsiveContext,
  PageHeader,
} from 'grommet';
import { ActionMenu } from '@shared/aries-core';

import { ExportDataContainer } from '../../templates/export-data';

import { ReverseAnchor } from '../../templates';

const label = 'Export report';

export const PageHeaderIntroExample = () => {
  const breakpoint = useContext(ResponsiveContext);
  const [showDataExport, setShowDataExport] = useState(false);

  const announce = useContext(AnnounceContext);
  const onClose = () => {
    setShowDataExport(false);
  };

  const ExportContainer = (
    <ExportDataContainer title={label} onClose={onClose} announce={announce} />
  );

  const actions = [
    {
      label,
      secondary: true,
      onClick: () => {
        setShowDataExport(true);
      },
    },
  ];

  return (
    <PageHeader
      title="Devices"
      subtitle="View and manage devices."
      parent={<ReverseAnchor label="Dashboard" />}
      actions={
        breakpoint !== 'xsmall' ? (
          <Box>
            <Button
              label={label}
              secondary
              onClick={() => {
                setShowDataExport(true);
              }}
            />
            {showDataExport ? ExportContainer : null}
          </Box>
        ) : (
          <Box>
            <ActionMenu items={actions} />
            {showDataExport ? ExportContainer : null}
          </Box>
        )
      }
    />
  );
};
