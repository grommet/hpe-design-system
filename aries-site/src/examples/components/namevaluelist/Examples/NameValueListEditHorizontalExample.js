import React, { useContext, useState } from 'react';
import { ThemeContext } from 'styled-components';
import {
  Anchor,
  Box,
  Button,
  Form,
  FormField,
  Heading,
  MaskedInput,
  NameValueList,
  NameValuePair,
  TextInput,
  Text,
} from 'grommet';
import { companyInfomation } from '../data';

export const NameValueListEditHorizontalExample = () => {
  const theme = useContext(ThemeContext);
  const [currentData, setCurrentData] = useState(companyInfomation);
  const [tempData, setTempData] = useState(currentData);
  const [edit, setEdit] = useState(false);

  return (
    <Box gap="medium">
      <Box justify="between" width="large" direction="row">
        <Heading level={2} size="small" margin="none">
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
        <NameValueList>
          {Object.entries(currentData).map(([name, value]) => (
            <NameValuePair key={name} name={<Text weight="bold">{name}</Text>}>
              {name === 'Email' ? (
                <Anchor label={value} href={`mailto:${value}`} />
              ) : (
                <Text {...theme.global.input.font}>{value || '--'}</Text>
              )}
            </NameValuePair>
          ))}
        </NameValueList>
      ) : (
        <Form>
          {Object.entries(currentData).map(([name]) => (
            <Box gap="xlarge" direction="row-responsive">
              <Box width="small" alignSelf="center">
                <Text as="label" htmlFor={name} name={name}>
                  {name}
                </Text>
              </Box>
              <Box width="medium">
                <FormField htmlFor={name} name={name}>
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
              </Box>
            </Box>
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
};
