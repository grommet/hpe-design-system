import React, { useRef, useEffect } from 'react';
import { Data, Toolbar, DataView } from 'grommet';

export const DataViewPreview = () => {
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
        data={[{ age: 12 }, { age: 91 }]}
        views={[
          { name: 'oldest', sort: { property: 'age', direction: 'desc' } },
          { name: 'youngest', sort: { property: 'age', direction: 'asc' } },
        ]}
      >
        <Toolbar>
          <DataView />
        </Toolbar>
      </Data>
    </div>
  );
};
