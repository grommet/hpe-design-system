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

    const onSubmit = ({ value } : { value: { resources: ResourceType[] } }) => {
      const SUCCESS_ANIMATION_DELAY = 1000;

      setSaving(true);
      updateResources(value.resources, componentId)
        .then((updatedResources) => { setFormValue(updatedResources); })
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

