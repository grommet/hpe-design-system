import React, { useState } from 'react';
import { Box, Button, FileInput, Heading, Layer, Paragraph } from 'grommet';
import { ButtonGroup } from '@shared/aries-core';

export const FileInputConfirmRemoveExample = () => {
  const [numFiles, setNumFiles] = useState(0);

  return (
    <Box width="medium">
      <FileInput
        messages={{
          dropPromptMultiple: 'Drag and drop',
          browse: numFiles > 0 ? 'Select more files' : 'Select files',
        }}
        onChange={(event, { files }) => setNumFiles(files.length)}
        confirmRemove={({ onConfirm, onCancel }) => (
          <Layer onClickOutside={onCancel} onEsc={onCancel}>
            <Box pad="medium" gap="medium" width={{ min: 'medium' }}>
              <Box gap="3xsmall">
                <Heading level={2} margin="none">
                  Remove file?
                </Heading>
                <Paragraph margin="none">
                  This action cannot be undone.
                </Paragraph>
              </Box>
              <ButtonGroup alignSelf="end">
                <Button label="Cancel" onClick={onCancel} />
                <Button label="Remove file" onClick={onConfirm} primary />
              </ButtonGroup>
            </Box>
          </Layer>
        )}
        multiple
      />
    </Box>
  );
};
