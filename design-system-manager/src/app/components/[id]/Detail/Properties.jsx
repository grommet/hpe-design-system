'use client';

import { useEffect, useState } from 'react';
import { Button, PageHeader } from 'grommet';
import { ContentContainer } from 'aries-core';
import { Edit } from './Edit';
import { getComponent } from '../actions';

export const Properties = ({ id, view }) => {
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

  return (
    <>
      <PageHeader
        title="Detail"
        level={2}
        actions={<Button label="Edit" onClick={() => setEdit(true)} />}
        pad="none"
      />
      <ContentContainer>
        {!edit ? (
          view
        ) : (
          <Edit component={data} onClose={() => setEdit(false)} />
        )}
      </ContentContainer>
    </>
  );
};
