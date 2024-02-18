'use client';

import { useState, JSX } from 'react';
import { Box, Button, Form, FormField, Notification, Select, TextArea, TextInput } from 'grommet';
import { ButtonGroup, FormChildObjects } from 'aries-core';
import type { LevelType, ResourceType } from '@/utilities/types.d.ts';
import { updateResources } from '../actions';

const RESOURCE_TYPES = [
  'Code',
  'Documentation',
  'Design'
];

interface InputMap {
  [key: string]: ({ ...rest }: { [x: string]: any }) => JSX.Element | null;
}

const INPUT_MAP = {
  name: ({ key, index, ...rest } : InputMap) => (
    <FormField 
      key={key}
      htmlFor={`resources[${index}].name`} 
      name={`resources[${index}].name`} 
      label="Name"
      contentProps={{ width: 'medium' }}
    >
      <TextInput id={`resources[${index}].name`} name={`resources[${index}].name`} />
    </FormField>
  ),
  type: ({ key, index, ...rest } : InputMap) => (
    <FormField 
      key={key}
      htmlFor={`resources[${index}].type`} 
      name={`resources[${index}].type`} 
      label="Type" 
      contentProps={{ width: 'medium' }}
    >
      <Select 
        id={`resources[${index}].type`} 
        name={`resources[${index}].type`} 
        options={RESOURCE_TYPES}
      />
    </FormField>
  ),
  url: ({ key, index, ...rest } : InputMap) => (
    <FormField 
      key={key}
      htmlFor={`resources[${index}].url`} 
      name={`resources[${index}].url`} 
      label="URL"
      contentProps={{ width: 'medium' }}
    >
      <TextArea id={`resources[${index}].url`} name={`resources[${index}].url`} />
    </FormField>
  ),
}

const resourceTemplate = {
  name: '',
  type: '',
  url: '',
};

const touchedValues = (
  curr: { [key: string]: any }, 
  acc: { [key: string]: any }, 
  keys: string[], 
  index: number
) => {
  if (index === keys.length - 1) {
    acc[keys[index]] = curr[keys[index]];
  } else {
    acc[keys[index]] = { ...acc[keys[index]] };
    touchedValues(curr[keys[index]], acc[keys[index]], keys, index + 1);
  }
  return acc;
}

export const Edit = (
  {
    resources, 
    componentId,
    onClose,
    level
  } : {
    resources: ResourceType[], 
    componentId: string,
    onClose: () => void,
    level: LevelType
  }) => {
    const [formValue, setFormValue] = useState({resources});
    const [saving, setSaving] = useState(false);
    const [success, setSuccess] = useState(false);
    const [validationError, setValidationError] = useState({title: '', message: {}});

    const handleAdd = () => {
      const nextResources = [...formValue.resources, { ...resourceTemplate }];
      setFormValue({ ...formValue, resources: nextResources });
    };

    const handleRemove = (index: number) => {
      if (formValue.resources?.length > 0) {
        const nextResources = [...formValue.resources];
        nextResources.splice(index, 1);
        setFormValue({ ...formValue, resources: nextResources });
      }
    };

    const handleRemoveAll = () => {
      setFormValue({ ...formValue, resources: [] });
    }

    const onChange = (value: { resources: ResourceType[] }) => {
      setFormValue(value);
    };

    const onSubmit = ({ 
      value, 
      touched 
    } : { 
      value: {resources: ResourceType[]}, 
      touched: {} 
    }) => {
      const SUCCESS_ANIMATION_DELAY = 1000;

      const modifiedValues = {
        resources: [] as ResourceType[]
      };

      // Isolate touched values from untouched.
      Object.keys(touched).forEach((key) => {
        // Split the key by '[]' and '.'.
        const regex =/\[(.*?)\]\./;
        const keys = key.split(regex);
        touchedValues(value, modifiedValues, keys, 0);
      });

      // Add the resource id to the modifiedValues object and convert to an array.
      modifiedValues.resources = Object.entries(modifiedValues.resources)
        .map((resource) => {
          const index = parseInt(resource[0], 10);
          modifiedValues.resources[index].id = value.resources[index].id;
          return resource[1];
        });

      setSaving(true);

      updateResources(modifiedValues.resources, componentId)
        .then((updatedResources) => { 
          if (updatedResources.errors) {
            throw new Error('Validation rules were not met.', {cause: updatedResources});
          }
          setFormValue({...formValue, resources: updatedResources}); 
        })
        .then(() => { 
          setSaving(false); 
          setSuccess(true);
        })
        .then(() => { 
          setTimeout(() => { 
            onClose();
            setSuccess(false);
          }, SUCCESS_ANIMATION_DELAY);
        }).catch((error) => {
          console.error(error, 'Validation rules:', error.cause.errors);
          setValidationError({title: error.message, message: error.cause.errors});
          setSaving(false);
          setSuccess(false);
        }
      );
    };

    const onReset = () => {
      setFormValue({resources});
      onClose();
    }

  return (
    <Form
        value={formValue}
        onChange={onChange}
        onSubmit={(onSubmit)}
      >
        <Box gap='medium'>
        <FormChildObjects 
          collection={{
            name: 'Resources',
            itemName: 'resource',
            parentName: 'component',
          }}
          fields={INPUT_MAP}
          headingLevel={level + 1}
          onAdd={handleAdd}
          onRemove={handleRemove}
          onRemoveAll={handleRemoveAll}
          primaryKey="id"
          required={false}
          values={formValue?.resources}
        />
        {validationError.title.length > 0 ? 
          <Notification 
            status='critical' 
            title={validationError.title} 
            message={JSON.stringify(validationError.message)} 
          /> : 
          null
        }
        <ButtonGroup>
          <Button 
            type="submit" 
            primary 
            label="Save resources" 
            busy={saving} 
            success={success}
          />
          <Button 
            type="reset" 
            label="Cancel"
            a11yTitle="Cancel resources changes"
            onClick={onReset}
          />
        </ButtonGroup>
        </Box>
      </Form>
  );
}

