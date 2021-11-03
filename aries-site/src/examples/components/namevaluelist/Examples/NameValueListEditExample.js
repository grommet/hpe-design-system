import React, { useState } from 'react';
import {
  Box,
  Button,
  Form,
  FormField,
  NameValueList,
  NameValuePair,
  TextInput,
  Text,
} from 'grommet';

const data = {
  Country: 'United States',
};

export const NameValueListEditExample = () => {
  const [currentData, setCurrentData] = useState(data);
  const [tempData, setTempData] = useState(currentData);
  const [edit, setEdit] = useState(false);

  return (
    <Box>
      <Box direction="row" gap="small">
        {/* placeholder to align with NameValueList -- 
        bad practice, should think on this */}
        <Box width="medium" />
        {!edit ? (
          <Button label="Edit" onClick={() => setEdit(true)} />
        ) : (
          <Box direction="row" gap="small" align="center">
            <Button
              label="Save"
              primary
              onClick={() => {
                setCurrentData(tempData);
                setEdit(false);
              }}
            />
            <Button
              label="Cancel"
              onClick={() => {
                setEdit(false);
                setTempData(currentData);
              }}
            />
          </Box>
        )}
      </Box>
      {!edit ? (
        <Box direction="row" align="center" gap="small">
          <NameValueList pairProps={{ direction: 'column' }} margin="none">
            {Object.entries(currentData).map(([name, value]) => (
              // style name and value to align with formfield styling
              <NameValuePair
                name={
                  <Text size="xsmall" weight={500} margin={{ top: 'xsmall' }}>
                    {name}
                  </Text>
                }
              >
                <Box pad={{ vertical: 'small' }}>
                  <Text weight={500}>{value}</Text>
                </Box>
              </NameValuePair>
            ))}
          </NameValueList>
        </Box>
      ) : (
        <Form>
          {Object.entries(currentData).map(([name]) => (
            <Box direction="row" align="center" gap="small">
              <FormField
                label={name}
                htmlFor={name}
                name={name}
                contentProps={{ width: 'medium' }}
              >
                <TextInput
                  id={name}
                  name={name}
                  value={tempData[name]}
                  onChange={event => {
                    const nextValue = {
                      ...tempData,
                      [name]: event.target.value,
                    };
                    setTempData(nextValue);
                  }}
                />
              </FormField>
            </Box>
          ))}
        </Form>
      )}
    </Box>
  );
};
