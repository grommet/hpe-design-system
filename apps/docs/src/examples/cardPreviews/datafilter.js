import React, { useRef, useEffect } from 'react';
import { Data, Toolbar, DataFilter } from 'grommet';

export const DataFilterPreview = () => {
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
      <Data
        data={[
          {
            location: 'Fort Collins',
          },
          {
            location: 'Boise',
          },
          {
            location: 'Palo Alto',
          },
          {
            location: 'San Francisco',
          },
        ]}
      >
        <Toolbar>
          <DataFilter property="location" />
        </Toolbar>
      </Data>
    </div>
  );
};
