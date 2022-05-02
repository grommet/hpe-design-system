import React, { useState } from 'react';
import { Box, FileInput } from 'grommet';

export function FileInputMultipleExample() {
  const [numFiles, setNumFiles] = useState(0);

  return (
    <Box width="medium">
      <FileInput
        messages={{
          dropPromptMultiple: 'Drag and drop',
          browse: numFiles > 0 ? 'Select More Files' : 'Select Files',
        }}
        onChange={(event, { files }) => setNumFiles(files.length)}
        multiple
      />
    </Box>
  );
}
