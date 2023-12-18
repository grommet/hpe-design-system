'use client';

import { useState } from 'react';
import { Box, Button, Form, FormField, Select, TextArea, TextInput } from 'grommet';
import { ButtonGroup } from 'aries-core';
import { ComponentType } from "@/utilities/types";
import { updateComponent } from "../actions";

interface InputMap {
  [key: string]: ({ ...rest }: { [x: string]: any }) => JSX.Element | null;
}

const INPUT_MAP: InputMap = {
  id: ({...rest}) => <TextInput readOnly {...rest} />,
  description: ({...rest}) => <TextArea rows={4} {...rest} />,
  keywords: ({...rest}) => <TextArea {...rest} />,
  status: ({...rest}) => <Select options={['draft', 'beta', 'published']} {...rest} />,
  createdAt: ({...rest}) => <TextInput readOnly {...rest} />,
  updatedAt: ({...rest}) => <TextInput readOnly {...rest} />,
};

const DATATYPE_MAP: InputMap = {
  string: ({...rest}) => <TextInput {...rest} />,
  number: ({...rest}) => <TextInput {...rest} />,
  object: ({value, ...rest}) => {
    let result = <TextInput {...rest} />;
    if (Array.isArray(value)) {
      result = <Select options={value} value={value} {...rest} />
    }
    return result;
  },
};

export const Edit = ({ component, onClose } : { component: ComponentType, onClose: () => void }) => {
  const [currentData, setCurrentData] = useState(component);
  const [tempData, setTempData] = useState(currentData);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSave = (formValue: ComponentType) => {
    const SUCCESS_ANIMATION_DELAY = 1000;

    setSaving(true);
    updateComponent(formValue)
      .then((updatedComponent) => { setCurrentData(updatedComponent); })
      .then(() => { 
        setSaving(false); 
        setSuccess(true);
      })
      .then(() => { 
        setTimeout(() => { onClose(); }, SUCCESS_ANIMATION_DELAY);
      });
  }

  const handleCancel = () => {
    setTempData(currentData);
    onClose();
  }

  return (
    <Form>
      <Box gap="medium">
        <Box>
          {currentData ? Object.entries(currentData).map(([name, value]) => (
            <FormField 
              key={name} 
              label={name}
              htmlFor={name}
              name={name}
              contentProps={{ width: 'medium' }}
              >
              {INPUT_MAP[name] ? 
                INPUT_MAP[name]({ 
                  id: name, 
                  name, 
                  value: tempData[name as keyof ComponentType], 
                  onChange: (e) => setTempData({ ...tempData, [name]: e.target.value }) 
                }) :
                 DATATYPE_MAP[typeof value]({
                  id: name,
                  name,
                  value: tempData[name as keyof ComponentType],
                  onChange: (e) => setTempData({ ...tempData, [name]: e.target.value })
                }) 
              }
            </FormField>
          )): null}
        </Box>
        <ButtonGroup>
          <Button 
            label="Save" 
            primary 
            busy={saving} 
            success={success} 
            onClick={() => handleSave(tempData)} 
          />
          <Button label="Cancel" onClick={handleCancel} />
        </ButtonGroup>
      </Box>
    </Form>
  );
}