// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { Box, NameValueList, NameValuePair } from 'grommet';
import { fontData } from '../data';

export const NameValueListFontWeightPreview = () => (
  <Box pad="xsmall">
    <NameValueList>
      {Object.entries(fontData).map(([name, value]) => (
        <NameValuePair key={name} name={name}>
          {value}
        </NameValuePair>
      ))}
    </NameValueList>
  </Box>
);
