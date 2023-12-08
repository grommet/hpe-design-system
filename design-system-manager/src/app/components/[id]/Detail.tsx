'use client';

import { useEffect, useState } from 'react';
import { Box, Button, Form, FormField, Heading, Layer, NameValueList, NameValuePair, Page, PageContent, PageHeader, Select, TextArea, TextInput } from 'grommet';
import { ButtonGroup, ContentContainer } from 'aries-core';
import { ComponentType } from '@/utilities/types';
import { update } from './actions';

export const Detail = ({ component } : {component: ComponentType}) => {
  const [currentData, setCurrentData] = useState(component);
  const [tempData, setTempData] = useState(currentData);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    console.log('tempData', tempData);
  }, [tempData]);

  const handleSave = async (formValue: ComponentType) => {
    console.log('formValue', formValue);
    const updatedComponent = await update(formValue);
    console.log('updatedComponent', updatedComponent);
    setCurrentData(updatedComponent);
    setEdit(false);
  }

  const handleCancel = () => {
    setTempData(currentData);
    setEdit(false);
  }

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
                            value={tempData[name]}
                            onChange={(event) => {
                              setTempData({ ...tempData, [name]: event.target.value });
                            }}
                          />
                        ) : (
                          <Select
                            id={name}
                            name={name}
                            options={value}
                            value={tempData[name]}
                            onChange={({ option }) => {
                              setTempData({ ...tempData, [name]: option });
                            }}
                          />
                        )}
                      </FormField>
                    ))}
                </>
              <ButtonGroup>
                <Button label="Save changes" primary onClick={() => {handleSave(tempData)}} />
                <Button label="Cancel" onClick={handleCancel} />
              </ButtonGroup>
              </Box>
            </Form>
            </PageContent>
          </Page>
        </Layer>
      )
      }
      </ContentContainer>
    </>
  );
};
