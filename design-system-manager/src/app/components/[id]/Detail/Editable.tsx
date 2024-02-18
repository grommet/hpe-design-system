'use client';

import { useEffect, useState, ReactNode } from 'react';
import { Button } from 'grommet';
import { Close, Edit as EditIcon } from 'grommet-icons';
import { Pane } from '../../../../components/Pane.tsx';
import { getComponent } from '../actions.ts';
import { Edit } from './Edit.tsx';

export const Editable = (
  { children, id } : 
  {children: ReactNode, id: string}
) => {
  const [data, setData] = useState({id: '', name: ''});
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if (!edit) {
      const fetchData = async () => {
        const component = await getComponent(id);
        setData(component);
      };
      fetchData();
    }
  }, [id, edit]);

  const content = !edit ? (
    children
  ) : (
    <Edit component={data} onClose={() => setEdit(false)} />
  );

  const EditButton = () => {
    return (
      // eslint-disable-next-line grommet/button-icon-a11ytitle
      <Button
        tip={!edit ? `Edit ${data.name} detail` : 'Cancel editing'}
        icon={
          !edit ? (
            <EditIcon aria-hidden="true" />
          ) : (
            <Close aria-hidden="true" />
          )
        }
        onClick={() => setEdit(!edit)}
      />
    );
  }

  return (
    <Pane 
      heading="Detail" 
      level={2} 
      actions={<EditButton />}
    >
      {content}
    </Pane>
  );
};
