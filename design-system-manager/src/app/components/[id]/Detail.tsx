'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Box, Button, Form, FormField, Heading, Layer, NameValueList, NameValuePair, Page, PageContent, PageHeader, Select, TextArea, TextInput } from 'grommet';
import { ButtonGroup, ContentContainer, ReverseAnchor } from 'aries-core';
import { ComponentType } from '@/utilities/types';

export const Detail = ({ component } : {component: ComponentType}) => {
  const [currentData, setCurrentData] = useState(component);
  const [tempData, setTempData] = useState(currentData);
  const [edit, setEdit] = useState(false);

  return (
    <>
      <PageHeader
        title={component.name}
        level={2}
        actions={<Button label="Edit" onClick={() => setEdit(true)} />}
        pad={{bottom: 'medium'}}
      />
      {!edit ? (
        <NameValueList>
          {Object.entries(currentData).map(([name, value]) => (
            <NameValuePair key={name} name={name}>
              {`${typeof value} ${typeof value === 'object' ? JSON.stringify(value) : value}`}
            </NameValuePair>
          ))}
        </NameValueList>
      ) : (
        <Layer full>
          <Page kind="narrow">
            <PageContent>
              <PageHeader level={2} title={`${component.name} detail`} />
              <Form>
                <Box gap="medium">
                  <>
                    {Object.entries(currentData).map(([name, value]) => (
                      <FormField 
                        key={name} 
                        label={name}
                        htmlFor={name}
                        name={name}
                        contentProps={{ width: 'medium' }}
                      >
                        {typeof value === 'string' ? (
                          <TextInput
                            id={name}
                            name={name}
                            value={value}
                            onChange={(event) => {
                              setTempData({ ...tempData, [name]: event.target.value });
                            }}
                          />
                        ) : (
                          <Select
                            id={name}
                            name={name}
                            options={value}
                            value={value}
                            onChange={({ option }) => {
                              setTempData({ ...tempData, [name]: option });
                            }}
                          />
                        )}
                      </FormField>
                    ))}
                </>
              <ButtonGroup>
                <Button label="Save changes" primary onClick={() => {
                  setCurrentData(tempData);
                  setEdit(false);
                }} />
                <Button label="Cancel" onClick={() => {
                  setTempData(currentData);
                  setEdit(false);
                }} />
              </ButtonGroup>
              </Box>
            </Form>
            </PageContent>
          </Page>
        </Layer>
      )
      }
    </>
  );
};
