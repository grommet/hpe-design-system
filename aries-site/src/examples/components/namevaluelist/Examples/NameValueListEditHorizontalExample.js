import React, { Fragment, useContext, useState } from 'react';
import { ThemeContext } from 'styled-components';
import {
  Anchor,
  Box,
  Button,
  Form,
  Heading,
  MaskedInput,
  NameValueList,
  NameValuePair,
  TextInput,
  Text,
  ResponsiveContext,
} from 'grommet';
import {
  FormGrid,
  NameValueListFormField,
  NameValueListFormLabel,
} from './components';
import { companyInfomation } from '../data';

export const NameValueListEditHorizontalExample = () => {
  const theme = useContext(ThemeContext);
  const size = useContext(ResponsiveContext);
  const [currentData, setCurrentData] = useState(companyInfomation);
  const [tempData, setTempData] = useState(currentData);
  const [edit, setEdit] = useState(false);

  const Wrapper = size !== 'small' ? Fragment : Box;

  return (
    <Box gap="medium">
      <Box justify="between" width="large" direction="row" align="start">
        <Box gap="xsmall">
          <Heading level={2} size="small" margin="none">
            Company Information
          </Heading>
          <Text size="large">Add your company information.</Text>
        </Box>
        {!edit && (
          <Button secondary label="Edit" onClick={() => setEdit(true)} />
        )}
      </Box>
      {!edit ? (
        <NameValueList>
          {Object.entries(currentData).map(([name, value]) => (
            <NameValuePair key={name} name={<Text weight="bold">{name}</Text>}>
              {name === 'Email' ? (
                <Anchor label={value.value} href={`mailto:${value.value}`} />
              ) : (
                <Text {...theme.global.input.font}>{value.value || '--'}</Text>
              )}
            </NameValuePair>
          ))}
        </NameValueList>
      ) : (
        <Form
          messages={{ required: 'This is a required field.' }}
          onSubmit={() => {
            setCurrentData(tempData);
            setEdit(false);
          }}
        >
          <FormGrid>
            {Object.entries(currentData).map(([name]) => (
              <Wrapper key={name}>
                <NameValueListFormLabel name={name} data={currentData[name]} />
                <NameValueListFormField name={name} data={currentData[name]}>
                  {name !== 'Phone Number' ? (
                    <TextInput
                      id={name}
                      name={name}
                      value={tempData[name].value}
                      onChange={event => {
                        const nextValue = {
                          ...tempData,
                          [name]: {
                            ...tempData[name],
                            value: event.target.value,
                          },
                        };
                        setTempData(nextValue);
                      }}
                      placeholder={tempData[name].placeholder}
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
                      value={tempData[name].value}
                      onChange={event => {
                        const nextValue = {
                          ...tempData,
                          [name]: event.target.value,
                        };
                        setTempData(nextValue);
                      }}
                      placeholder={tempData[name].placeholder}
                    />
                  )}
                </NameValueListFormField>
              </Wrapper>
            ))}
          </FormGrid>
          <Box
            direction="row"
            gap="medium"
            align="center"
            margin={{ top: 'medium' }}
          >
            <Button label="Save Changes" primary type="submit" />
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
