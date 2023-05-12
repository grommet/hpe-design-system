import React, { useState, useContext } from 'react';
import { Box, Button, ResponsiveContext, PageHeader } from 'grommet';
import { ActionMenu } from 'aries-core';

import { ExportDataContainer } from '../../templates/export-data';

import { ReverseAnchor } from '../../templates';

const actions = [
  {
    label: 'Export devices',
    secondary: true,
  },
];

export const PageHeaderIntroExample = () => {
  const breakpoint = useContext(ResponsiveContext);
  const [showDataExport, setShowDataExport] = useState(false);

  return (
    <PageHeader
      title="Devices"
      subtitle="View and manage devices."
      parent={<ReverseAnchor label="Dashboard" />}
      actions={
        breakpoint !== 'xsmall' ? (
          <Box>
            <Button
              label="Export devices"
              secondary
              onClick={() => {
                setShowDataExport(true);
              }}
            />
            {showDataExport ? (
              <ExportDataContainer
                title="Export devices"
                setShowModal={setShowDataExport}
                onSubmit={() => {
                  // Your submission logic here
                }}
              />
            ) : null}
          </Box>
        ) : (
          <ActionMenu items={actions} />
        )
      }
    />
  );
};
