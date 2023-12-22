'use client';

import { useState } from 'react';
import { Button, Form, FormField, Select, TextArea, TextInput } from 'grommet';
import { ButtonGroup, FormChildObjects } from 'aries-core';
import { LevelType, ResourceType } from '@/utilities/types';
import { updateResources } from '../actions';

const RESOURCE_TYPES = [
  { label: 'Code', value: 'code' },
  { label: 'Documentation', value: 'documentation' },
  { label: 'Design kit', value: 'design' }
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

const touchedValues = (curr: { [key: string]: any }, acc: { [key: string]: any }, keys: string[], index: number) => {
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
    const [formValue, setFormValue] = useState({resources: resources});
    const [saving, setSaving] = useState(false);
    const [success, setSuccess] = useState(false);

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

      let modifiedValues = {};
      Object.keys(touched).map((key) => {
        const keys = key.split(/\[(.*?)\]\./);
        return touchedValues(value, modifiedValues, keys, 0);
      });
      console.log('modifiedValues', modifiedValues);

      setSaving(true);
      // TODO: use modifiedValues instead of value.resources
      // Need to add resource id to the modifiedValues object.
      updateResources(value.resources, componentId)
        .then((updatedResources) => { 
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
          console.log(error);
        }
      );
    };

    const onReset = () => {
      setFormValue({resources: resources});
      onClose();
    }


  return (
    <Form
        value={formValue}
        onChange={onChange}
        onSubmit={(onSubmit)}
      >
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
      </Form>
  );
}

