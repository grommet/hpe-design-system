import { useState } from "react";
import { Menu } from "grommet";
import { Comfortable, Compact, Spacious } from '../../../icons';


export const DensityControl = () => {
  const [density, setDensity] = useState('comfortable');
  return (
    <Menu
      icon={<Compact />}
      tip="Change density"
      kind="toolbar"
      items={[
        {
          label: 'Compact',
          icon: <Compact />,
          justify: 'start',
          active: density === 'compact',
          onClick: () => {
            document
              .querySelector('#devices-table')
              .classList.remove('comfortable');
            document
              .querySelector('#devices-table')
              .classList.remove('spacious');
            document.querySelector('#devices-table').classList.add('compact');
            setDensity('compact');
          },
        },
        {
          label: 'Comfortable',
          icon: <Comfortable />,
          justify: 'start',
          active: density === 'comfortable',
          onClick: () => {
            document
              .querySelector('#devices-table')
              .classList.remove('compact');
            document
              .querySelector('#devices-table')
              .classList.remove('spacious');
            document
              .querySelector('#devices-table')
              .classList.add('comfortable');
            setDensity('comfortable');
          },
        },
        {
          label: 'Spacious',
          icon: <Spacious />,
          justify: 'start',
          active: density === 'spacious',
          onClick: () => {
            document
              .querySelector('#devices-table')
              .classList.remove('compact');
            document
              .querySelector('#devices-table')
              .classList.remove('comfortable');
            document.querySelector('#devices-table').classList.add('spacious');
            setDensity('spacious');
          },
        },
      ]}
      dropProps={{ animate: 'select' }}
    />
  );
};
