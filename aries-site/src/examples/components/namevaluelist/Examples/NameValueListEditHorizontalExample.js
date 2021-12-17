import React, { Fragment, useContext, useState } from 'react';
import { ThemeContext } from 'styled-components';
import {
  Box,
  Button,
  Form,
  Heading,
  NameValueList,
  NameValuePair,
  TextInput,
  Text,
  ResponsiveContext,
} from 'grommet';
import { NameValueListFormField, NameValueListFormLabel } from './components';
import { formattedData } from '../data';

export const NameValueListEditHorizontalExample = () => {
  const theme = useContext(ThemeContext);
  const size = useContext(ResponsiveContext);
  const [currentData, setCurrentData] = useState(formattedData);
  const [tempData, setTempData] = useState(currentData);
  const [edit, setEdit] = useState(false);

  // when user is editting, wrap in a Form
  const Wrapper = edit ? Form : Fragment;
  const wrapperProps = edit
    ? {
        messages: { required: 'This is a required field.' },
        onSubmit: () => {
          setCurrentData(tempData);
          setEdit(false);
        },
      }
    : undefined;

  const onChange = (event, name) => {
    const nextValue = {
      ...tempData,
      [name]: {
        ...tempData[name],
        value: event.target.value,
      },
    };
    setTempData(nextValue);
  };

  return (
    <Box gap="medium">
      <Box
        justify="between"
        width="large"
        direction="row-responsive"
        align="start"
        gap="medium"
      >
        <Box gap="xsmall">
          <Heading level={2} size="small" margin="none">
            Company Information
          </Heading>
          <Text size="large">Add your company information.</Text>
        </Box>
        {!edit && (
          <Button
            secondary
            label="Edit"
            onClick={() => setEdit(true)}
            fill={size === 'small' ? 'horizontal' : undefined}
          />
        )}
      </Box>
      <Wrapper {...wrapperProps}>
        <NameValueList valueProps={{ width: ['auto', 'medium'] }}>
          {Object.entries(currentData).map(([name, value]) => {
            let nameRender = <Text weight="bold">{value.displayName}</Text>;
            let valueRender = currentData[name].render ? (
              currentData[name].render(value.value || '--')
            ) : (
              <Text {...theme.global.input.font}>{value.value || '--'}</Text>
            );

            if (edit) {
              nameRender = (
                <NameValueListFormLabel data={currentData[name]} name={name} />
              );
              valueRender = (
                <NameValueListFormField data={currentData[name]} name={name}>
                  {currentData[name].formRender ? (
                    currentData[name].formRender(
                      name,
                      tempData[name].value,
                      event => onChange(event, name),
                    )
                  ) : (
                    <TextInput
                      id={name}
                      name={name}
                      value={tempData[name].value}
                      onChange={event => onChange(event, name)}
                      placeholder={tempData[name].placeholder}
                    />
                  )}
                </NameValueListFormField>
              );
            }

            return (
              <NameValuePair key={name} name={nameRender}>
                {valueRender}
              </NameValuePair>
            );
          })}
        </NameValueList>
        {edit ? (
          <Box
            direction="row-responsive"
            gap="medium"
            align="center"
            margin={{ top: 'medium' }}
          >
            <Button
              label="Save Changes"
              primary
              type="submit"
              fill={size === 'small' ? 'horizontal' : undefined}
            />
            <Button
              label="Cancel"
              onClick={() => {
                setEdit(false);
                setTempData(currentData);
              }}
              fill={size === 'small' ? 'horizontal' : undefined}
            />
          </Box>
        ) : (
          undefined
        )}
      </Wrapper>
    </Box>
  );
};
