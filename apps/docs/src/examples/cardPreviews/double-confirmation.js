import { useEffect, useRef } from 'react';
import { DoubleConfirmationCardPreview } from '../templates';

export const DoubleConfirmationPreview = () => {
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
      <DoubleConfirmationCardPreview
        title="Discard Changes?"
        subtitle="Your changes will not be applied."
        titleSize="xsmall"
        width="300px"
      />
    </div>
  );
};
