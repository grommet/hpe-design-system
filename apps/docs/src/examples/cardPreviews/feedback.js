import React from 'react';
import { StarRating } from 'grommet';
import { useInert } from '@shared/hooks';

export const FeedbackPreview = () => {
  const ref = useInert();

  return (
    <StarRating ref={ref} name="preview-card-example" aria-label="preview" />
  );
};
