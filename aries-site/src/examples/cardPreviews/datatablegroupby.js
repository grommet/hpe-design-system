import React, { useRef, useEffect } from 'react';
import { Data, Toolbar, DataTableGroupBy } from 'grommet';

export const DataTableGroupbyPreview = () => {
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
          { id: 1, name: 'Scott', country: 'AUS' },
          { id: 2, name: 'Zelda', country: 'AUS' },
        ]}
      >
        <Toolbar>
          <DataTableGroupBy options={['country']} drop />
        </Toolbar>
      </Data>
    </div>
  );
};
