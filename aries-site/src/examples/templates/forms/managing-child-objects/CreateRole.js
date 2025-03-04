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
import { ContentPane } from '../../../../layouts';
import { FormChildObjects } from '../../FormChildObject';

const permissionTemplate = {
  name: '',
  access: '',
};

const INPUT_MAP = {
  name: ({ key, index, ...rest }) => (
    <FormField
      key={key}
      htmlFor={`permissions[${index}].name__input`}
      name={`permissions[${index}].name`}
      label="Resource"
      required
    >
      <Select
        id={`permissions[${index}].name`}
        name={`permissions[${index}].name`}
        options={['Clusters', 'Hosts', 'Datasets']}
        placeholder="Select a resource"
        {...rest}
      />
    </FormField>
  ),
  access: ({ key, index, ...rest }) => (
    <FormField
      key={key}
      htmlFor={`permissions[${index}].access__input`}
      name={`permissions[${index}].access`}
      label="Access"
      required
    >
      <Select
        id={`permissions[${index}].access`}
        name={`permissions[${index}].access`}
        options={['Read', 'Write', 'Admin']}
        placeholder="Select an access type"
        {...rest}
      />
    </FormField>
  ),
};

const defaultValues = {
  'role-name': '',
  permissions: [],
};

export const CreateRole = () => {
  const [formValues, setFormValues] = useState(defaultValues);

  // add a new permission onto the existing ones
  const handleAdd = () => {
    const nextPermissions = [
      ...formValues.permissions,
      { ...permissionTemplate },
    ];
    setFormValues({ ...formValues, permissions: nextPermissions });
  };

  // remove a permission
  const handleRemove = index => {
    if (formValues.permissions?.length > 0) {
      setFormValues({
        ...formValues,
        permissions: formValues.permissions.filter((value, i) => i !== index),
      });
    }
  };

  // remove all permissions
  const handleRemoveAll = () => {
    setFormValues({
      ...formValues,
      permissions: [],
    });
  };

  const onChange = value => {
    setFormValues(value);
  };

  const onSubmit = event => {
    console.log(event.value);
  };

  return (
    <ContentPane alignSelf="center" gap="medium" width="medium">
      <Heading level={2} margin="none">
        Create role
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
            htmlFor="role-name"
            name="role-name"
            label="Role name"
            required
          >
            <TextInput id="role-name" name="role-name" />
          </FormField>
          <Box gap="small">
            <Box>
              <Heading level={3} margin="none">
                Permissions
              </Heading>
              {!formValues.permissions.length ? (
                <Paragraph margin="none">
                  Add permissions to the role.
                </Paragraph>
              ) : null}
            </Box>
            <FormChildObjects
              collection={{
                name: 'Permissions',
                itemName: 'permission',
                parentName: 'role',
              }}
              fields={INPUT_MAP}
              headingLevel={4}
              onAdd={handleAdd}
              onRemove={handleRemove}
              onRemoveAll={handleRemoveAll}
              primaryKey="name"
              summarize={[{ name: 'access', showName: false }]}
              values={formValues.permissions}
            />
          </Box>
          <ButtonGroup pad={{ top: 'medium' }}>
            <Button label="Create role" primary type="submit" />
            <Button
              label="Cancel"
              a11yTitle="Cancel role creation"
              onClick={() => {}}
            />
          </ButtonGroup>
        </Box>
      </Form>
    </ContentPane>
  );
};
