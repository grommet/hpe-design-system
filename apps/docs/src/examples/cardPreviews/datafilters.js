import React, { useRef, useEffect } from 'react';
import { Data, Toolbar, DataFilters } from 'grommet';

export const DataFiltersPreview = () => {
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
      <Data data={[{ name: 'Scott' }, { name: 'Zelda' }]}>
        <Toolbar>
          <DataFilters />
        </Toolbar>
      </Data>
    </div>
  );
};
