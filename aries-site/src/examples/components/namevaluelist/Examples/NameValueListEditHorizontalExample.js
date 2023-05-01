import React, { Fragment, useContext, useState } from 'react';
import { ThemeContext } from 'styled-components';
import {
  Box,
  Button,
  Form,
  NameValueList,
  NameValuePair,
  PageHeader,
  TextInput,
  Text,
  ResponsiveContext,
} from 'grommet';
import { TextEmphasis } from 'aries-core';
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
      <PageHeader
        title="Company Information"
        subtitle="Add your company information."
        actions={
          !edit && (
            <Button
              secondary
              label="Edit"
              onClick={() => setEdit(true)}
              fill={
                ['xsmall', 'small'].includes(size) ? 'horizontal' : undefined
              }
            />
          )
        }
      />

      <Wrapper {...wrapperProps}>
        <NameValueList valueProps={{ width: ['auto', 'medium'] }}>
          {Object.entries(currentData).map(([name, value]) => {
            let nameRender = <TextEmphasis>{value.displayName}</TextEmphasis>;
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
              label="Save changes"
              primary
              type="submit"
              fill={
                ['xsmall', 'small'].includes(size) ? 'horizontal' : undefined
              }
            />
            <Button
              label="Cancel"
              onClick={() => {
                setEdit(false);
                setTempData(currentData);
              }}
              fill={
                ['xsmall', 'small'].includes(size) ? 'horizontal' : undefined
              }
            />
          </Box>
        ) : undefined}
      </Wrapper>
    </Box>
  );
};
