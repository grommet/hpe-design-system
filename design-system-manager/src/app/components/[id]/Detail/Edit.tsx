'use client';

import { useState } from 'react';
import { Box, Button, Form, FormField, Select, TextInput } from 'grommet';
import { ButtonGroup } from 'aries-core';
import { ComponentType } from "@/utilities/types";
import { updateComponent } from "../actions";

export const Edit = ({ component, onClose } : { component: ComponentType, onClose: () => void }) => {
  const [currentData, setCurrentData] = useState(component);
  const [tempData, setTempData] = useState(currentData);

  const handleSave = async (formValue: ComponentType) => {
    const updatedComponent = await updateComponent(formValue);
    setCurrentData(updatedComponent);
    onClose();
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
              {typeof value === 'string' ? (
                <TextInput
                  id={name}
                  name={name}
                  value={tempData[name]}
                  onChange={(e) => setTempData({ ...tempData, [name]: e.target.value })}
                />
              ) : (
                <Select
                  id={name}
                  name={name}
                  options={value}
                  value={tempData[name]}
                  onChange={({ option }) => setTempData({ ...tempData, [name]: option })}
                />
              )}
            </FormField>
          )): null}
        </Box>
        <ButtonGroup>
          <Button label="Save" primary onClick={() => handleSave(tempData)} 
          />
          <Button label="Cancel" onClick={handleCancel} />
        </ButtonGroup>
      </Box>
    </Form>
  );
}