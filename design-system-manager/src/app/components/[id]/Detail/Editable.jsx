'use client';

import { useEffect, useState } from 'react';
import { Button, Heading, Header } from 'grommet';
import { Close, Edit as EditIcon } from 'grommet-icons';
import { Panel } from 'aries-core';
import { Edit } from './Edit';
import { getComponent } from '../actions';

export const Editable = ({ children, id }) => {
  const [data, setData] = useState({});
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

  return (
    <Panel>
      <Header pad={{ bottom: 'medium' }}>
        <Heading level={2} margin="none">
          Detail
        </Heading>
        <Button
          a11yTitle={!edit ? `Edit ${data.name} detail` : 'Cancel editing'}
          icon={!edit ? <EditIcon /> : <Close />}
          onClick={() => setEdit(!edit)}
        />
      </Header>
      {content}
    </Panel>
  );
};
