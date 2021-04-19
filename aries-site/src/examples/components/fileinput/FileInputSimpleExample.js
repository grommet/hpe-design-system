import React from 'react';

import { Box, FileInput } from 'grommet';

export const FileInputSimpleExample = () => (
  <Box align="center" pad="large">
    <FileInput
      onChange={event => {
        const fileList = event.target.files;
        for (let i = 0; i < fileList.length; i += 1) {
          const file = fileList[i];
          console.log(file.name);
        }
      }}
    />
  </Box>
);
