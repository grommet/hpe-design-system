import React from 'react';
import { Grommet, Box, FormField, TextArea } from 'grommet';
import { aries } from '../../../../../../../aries-site/src/themes/aries';

export default {
  title: 'TextArea',
};

export const Simple = () => (
  <Grommet theme={aries} full>
    <Box align="center" pad="large">
      <Box width="medium">
        <FormField label="Additional feedback" htmlFor="text-area-example">
          <Box height="small">
            <TextArea
              id="text-area-example"
              placeholder="i.e. ideas, inspirations, or concerns"
              fill
            />
          </Box>
        </FormField>
      </Box>
    </Box>
  </Grommet>
);
