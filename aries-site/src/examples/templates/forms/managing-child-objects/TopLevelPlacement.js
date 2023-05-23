import { useState } from 'react';
import {
  Box,
  Button,
  Form,
  FormField,
  Heading,
  Paragraph,
  Select,
  TextInput,
} from 'grommet';
import { ButtonGroup } from 'aries-core';
import { FormChildObjects } from '../../FormChildObject';

const resourceTemplate = {
  name: '',
  limit: '',
};

const INPUT_MAP = {
  name: ({ key, index, ...rest }) => (
    <FormField
      key={key}
      htmlFor={`resources[${index}].name__input`}
      name={`resources[${index}].name`}
      label="Resource"
      required
    >
      <Select
        id={`resources[${index}].name`}
        name={`resources[${index}].name`}
        options={['limits.cpu', 'requests.memory']}
        placeholder="Select a resource"
        {...rest}
      />
    </FormField>
  ),
  limit: ({ key, index, ...rest }) => (
    <FormField
      key={key}
      htmlFor={`resources[${index}].limit`}
      name={`resources[${index}].limit`}
      label="Quota"
      required
    >
      <TextInput
        id={`resources[${index}].limit`}
        name={`resources[${index}].limit`}
        placeholder="Number"
        {...rest}
      />
    </FormField>
  ),
};

const defaultValues = {
  'role-name': '',
  resources: [],
};

export const TopLevelPlacement = () => {
  const [formValues, setFormValues] = useState(defaultValues);

  // add a new resource onto the existing ones
  const handleAdd = () => {
    const nextResources = [...formValues.resources, { ...resourceTemplate }];
    setFormValues({ ...formValues, resources: nextResources });
  };

  // remove a resource
  const handleRemove = index => {
    if (formValues.resources?.length > 0) {
      setFormValues({
        ...formValues,
        resources: formValues.resources.filter((value, i) => i !== index),
      });
    }
  };

  // remove all resources
  const handleRemoveAll = () => {
    setFormValues({
      ...formValues,
      resources: [],
    });
  };

  const onChange = value => {
    setFormValues(value);
  };

  const onSubmit = event => {
    console.log(event.value);
  };

  return (
    <Box alignSelf="center" gap="medium" width="medium">
      <Heading level={2} margin="none">
        Add resource quota
      </Heading>
      <Form
        value={formValues}
        onChange={onChange}
        onSubmit={onSubmit}
        validate="blur"
        messages={{
          required: 'This is a required field.',
        }}
      >
        <Box gap="medium">
          <FormField
            htmlFor="quota-name"
            name="quota-name"
            label="Quota name"
            required
          >
            <TextInput id="quota-name" name="quota-name" />
          </FormField>
          <Box gap="small">
            <Box>
              <Heading level={3} margin="none">
                Resources
              </Heading>
              {!formValues.resources.length ? (
                <Paragraph margin="none">Add resource limits.</Paragraph>
              ) : null}
            </Box>
            <FormChildObjects
              collection={{
                name: 'Resources',
                itemName: 'resource',
                parentName: 'quota',
              }}
              fields={INPUT_MAP}
              headingLevel={4}
              onAdd={handleAdd}
              onRemove={handleRemove}
              onRemoveAll={handleRemoveAll}
              primaryKey="name"
              summarize={[{ name: 'limit', showName: false }]}
              values={formValues.resources}
              removeAlternate
            />
          </Box>
          <ButtonGroup pad={{ top: 'medium' }}>
            <Button label="Add" primary type="submit" />
            <Button
              label="Cancel"
              a11yTitle="Cancel resource quota setup"
              onClick={() => {}}
            />
          </ButtonGroup>
        </Box>
      </Form>
    </Box>
  );
};
