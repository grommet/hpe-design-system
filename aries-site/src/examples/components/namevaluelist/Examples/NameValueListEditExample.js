import React, { useContext, useState } from 'react';
import { ThemeContext } from 'styled-components';
import {
  Anchor,
  Box,
  Button,
  Form,
  FormField,
  MaskedInput,
  NameValueList,
  NameValuePair,
  PageHeader,
  TextInput,
  Text,
} from 'grommet';
import { profileData } from '../data';

export function NameValueListEditExample() {
  const theme = useContext(ThemeContext);
  const [currentData, setCurrentData] = useState(profileData);
  const [tempData, setTempData] = useState(currentData);
  const [edit, setEdit] = useState(false);

  return (
    <Box gap="medium">
      <PageHeader
        title="Profile Details"
        actions={
          !edit && (
            <Box justify="center">
              <Button
                alignSelf="center"
                secondary
                label="Edit Profile"
                onClick={() => setEdit(true)}
              />
            </Box>
          )
        }
      />
      {!edit ? (
        <NameValueList pairProps={{ direction: 'column' }}>
          {Object.entries(currentData).map(
            ([name, value]) =>
              value && (
                <NameValuePair
                  key={name}
                  name={<Text {...theme.formField.label}>{name}</Text>}
                >
                  {name === 'Email' ? (
                    <Anchor label={value} href={`mailto:${value}`} />
                  ) : (
                    <Text {...theme.global.input.font}>{value || '--'}</Text>
                  )}
                </NameValuePair>
              ),
          )}
        </NameValueList>
      ) : (
        <Form>
          {Object.entries(currentData).map(([name]) => (
            <FormField
              label={name}
              htmlFor={name}
              name={name}
              contentProps={{ width: 'medium' }}
            >
              {name !== 'Phone Number' ? (
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
              ) : (
                <MaskedInput
                  mask={[
                    { fixed: '(' },
                    {
                      length: 3,
                      regexp: /^[0-9]{1,3}$/,
                      placeholder: 'xxx',
                    },
                    { fixed: ')' },
                    { fixed: ' ' },
                    {
                      length: 3,
                      regexp: /^[0-9]{1,3}$/,
                      placeholder: 'xxx',
                    },
                    { fixed: '-' },
                    {
                      length: 4,
                      regexp: /^[0-9]{1,4}$/,
                      placeholder: 'xxxx',
                    },
                  ]}
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
              )}
            </FormField>
          ))}
          <Box
            direction="row"
            gap="small"
            align="center"
            margin={{ top: 'medium' }}
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
}
