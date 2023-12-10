'use client';

import { useEffect, useState } from 'react';
import { Button, PageHeader } from 'grommet';
import { Close, Edit as EditIcon } from 'grommet-icons';
import { ContentContainer } from 'aries-core';
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
    <>
      <PageHeader
        title="Detail"
        level={2}
        actions={
          <Button
            a11yTitle={!edit ? `Edit ${data.name} detail` : 'Cancel editing'}
            icon={!edit ? <EditIcon /> : <Close />}
            onClick={() => setEdit(!edit)}
          />
        }
        pad="none"
      />
      <ContentContainer>{content}</ContentContainer>
    </>
  );
};
