import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Page, PageContent, PageHeader } from 'grommet';
import { EmptyState, ModalDialog } from 'aries-core';
import { Lock } from '@hpe-design/icons-grommet';

export const LayerEmptyState = ({ containerRef }) => {
  const [open, setOpen] = useState(true);
  return (
    <Page>
      <PageContent>
        <PageHeader
          title="Page title"
          subtitle="Description about page."
          actions={
            <Button
              label="Add resource"
              primary
              onClick={() => setOpen(true)}
            />
          }
        />
      </PageContent>
      {open && (
        <ModalDialog
          title="Add resource"
          onClose={() => setOpen(false)}
          position="right"
          full="vertical"
          target={containerRef?.current}
        >
          <EmptyState
            icon={<Lock />}
            title="Access denied"
            description={`You do not have access to this action. Please 
              contact the administrator to request access.`}
            actions={<Button label="Request access" primary />}
            level={3}
          />
        </ModalDialog>
      )}
    </Page>
  );
};

LayerEmptyState.propTypes = {
  containerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};
