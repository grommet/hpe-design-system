import React, { useRef, useEffect } from 'react';
import { StarRating } from 'grommet';

export const FeedbackPreview = () => {
  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      const buttons = ref.current.querySelectorAll('button, input');
      buttons.forEach(button => {
        button.setAttribute('tabindex', '-1');
      });
    }
  }, []);

  return (
    <div ref={ref}>
      <StarRating name="preview-card-example" aria-label="preview" />
    </div>
  );
};
