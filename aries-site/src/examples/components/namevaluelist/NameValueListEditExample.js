import React, { useState } from 'react';
import {
  Box,
  Button,
  FormField,
  NameValueList,
  NameValuePair,
  TextInput,
} from 'grommet';

const data = {
  Country: 'United States',
};

export const NameValueListEditExample = () => {
  const values = Object.values(data);
  const [newValue, setNewValue] = useState(values);
  const [edit, setEdit] = useState(false);

  return (
    <Box gap="medium" direction="row" pad="small">
      <NameValueList pairProps={{ direction: 'column' }}>
        {Object.entries(data).map(([name]) => (
          <>
            {!edit ? (
              <>
                <NameValuePair key={name} name={name}>
                  {newValue}
                </NameValuePair>
              </>
            ) : (
              <>
                <FormField label={name}>
                  <TextInput
                    onChange={event => setNewValue(event.target.value)}
                  />
                </FormField>
              </>
            )}
          </>
        ))}
      </NameValueList>
      {!edit ? (
        <Button
          onClick={() => {
            setEdit(true);
          }}
          label="Edit"
        />
      ) : (
        <Box gap="medium" direction="row">
          <Button
            onClick={() => {
              setEdit(false);
            }}
            label="Save"
          />
          <Button
            onClick={() => {
              setEdit(false);
            }}
            label="Cancel"
          />
        </Box>
      )}
    </Box>
  );
};
