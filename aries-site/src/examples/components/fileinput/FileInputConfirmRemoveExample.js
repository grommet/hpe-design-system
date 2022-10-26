import React, { useState } from 'react';
import { Box, Button, FileInput, Heading, Layer, Text } from 'grommet';

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
              <Box gap="xsmall">
                <Heading level={2} margin="none" size="small">
                  Remove file?
                </Heading>
                <Text>This action cannot be undone.</Text>
              </Box>
              <Box direction="row" align="center" justify="end" gap="medium">
                <Button label="Cancel" onClick={onCancel} />
                <Button label="Remove file" onClick={onConfirm} primary />
              </Box>
            </Box>
          </Layer>
        )}
        multiple
      />
    </Box>
  );
};
