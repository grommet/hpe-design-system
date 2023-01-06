import React from 'react';
import { Box, StarRating } from 'grommet';

export const FeedbackPreview = () => (
  <Box>
    <StarRating aria-label="preview" tabIndex={-1} />
  </Box>
);
