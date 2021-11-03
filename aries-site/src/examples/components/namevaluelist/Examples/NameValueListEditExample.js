import React, { useState } from 'react';
import {
  Anchor,
  Box,
  Button,
  Form,
  FormField,
  Heading,
  NameValueList,
  NameValuePair,
  TextInput,
  Text,
} from 'grommet';
import { profileData } from '../data';

export const NameValueListEditExample = () => {
  const [currentData, setCurrentData] = useState(profileData);
  const [tempData, setTempData] = useState(currentData);
  const [edit, setEdit] = useState(false);

  return (
    <Box>
      <Box justify="between" width="large" direction="row">
        <Heading level={2} size="small">
          Profile Details
        </Heading>
        {!edit && (
          <Box justify="center">
            <Button
              alignSelf="center"
              secondary
              label="Edit Profile"
              onClick={() => setEdit(true)}
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
                  {name === 'Email' ? (
                    <Anchor label={value} href={`mailto:${value}`} />
                  ) : (
                    <Text weight={500}>{value}</Text>
                  )}
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
          <Box
            margin={{ top: 'medium', bottom: 'small' }}
            direction="row"
            gap="small"
            align="center"
          >
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
        </Form>
      )}
    </Box>
  );
};
