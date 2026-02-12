import React, { useRef, useEffect } from 'react';
import { Data, Toolbar, DataSort } from 'grommet';

export const DataSortPreview = () => {
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
          <DataSort />
        </Toolbar>
      </Data>
    </div>
  );
};
