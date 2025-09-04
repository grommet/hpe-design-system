import { useState } from 'react';
import {
  Box,
  Button,
  CheckBox,
  Form,
  FormField,
  Heading,
  RangeInput,
  Select,
  Text,
  TextInput,
} from 'grommet';
import { ButtonGroup } from 'aries-core';
import { ContentPane } from '../../../../layouts';
import { FormChildObjects } from '../../FormChildObject';

const hostTemplate = {
  name: '',
  host: '',
  cpu: '',
  memory: '',
};

const INPUT_MAP = {
  name: ({ key, index, ...rest }) => (
    <FormField
      key={key}
      htmlFor={`hosts[${index}].name`}
      name={`hosts[${index}].name`}
      label="Host name"
    >
      <TextInput
        id={`hosts[${index}].name`}
        name={`hosts[${index}].name`}
        {...rest}
      />
    </FormField>
  ),
  host: ({ key, index, ...rest }) => (
    <FormField
      key={key}
      htmlFor={`hosts[${index}].host`}
      name={`hosts[${index}].host`}
      label="Host address"
      required
    >
      <TextInput
        id={`hosts[${index}].host`}
        name={`hosts[${index}].host`}
        aria-required="true"
        {...rest}
      />
    </FormField>
  ),
  cpu: ({ key, index, ...rest }) => (
    <Box key={key} width='3xsmall'>
      <FormField
        htmlFor={`hosts[${index}].cpu`}
        name={`hosts[${index}].cpu`}
        label="CPU cores"
        required
      >
        <Select
          id={`hosts[${index}].cpu`}
          name={`hosts[${index}].cpu`}
          options={[2, 4, 6, 8]}
          aria-required="true"
          {...rest}
        />
      </FormField>
    </Box>
  ),
  memory: ({ key, index, ...rest }) => (
    <Box key={key} width='3xsmall'>
      <FormField
        key={key}
        htmlFor={`hosts[${index}].memory`}
        name={`hosts[${index}].memory`}
        label="Memory (GB)"
        required
      >
        <Select
          id={`hosts[${index}].memory`}
          name={`hosts[${index}].memory`}
          options={[32, 64, 128, 256, 512]}
          aria-required="true"
          {...rest}
        />
      </FormField>
    </Box>
  ),
};

const defaultValues = {
  'cluster-name': '',
  'resource-manager': false,
  'automation-level': '',
  'migration-threshold': 15,
  hosts: [{ ...hostTemplate }],
};

export const CreateCluster = () => {
  const [formValues, setFormValues] = useState(defaultValues);

  // add a host to the set of existing ones
  const handleAdd = () => {
    const nextHosts = [...formValues.hosts, { ...hostTemplate }];
    setFormValues({ ...formValues, hosts: nextHosts });
  };

  // remove a host
  const handleRemove = index => {
    if (formValues.hosts?.length > 0) {
      setFormValues({
        ...formValues,
        hosts: formValues.hosts.filter((value, i) => i !== index),
      });
    }
  };

  // remove all hosts
  const handleRemoveAll = () => {
    setFormValues({
      ...formValues,
      hosts: [],
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
        Create cluster
      </Heading>
      <Form
        value={formValues}
        onChange={onChange}
        onSubmit={onSubmit}
        validate="blur"
      >
        <Box gap="medium">
          <>
            <FormField
              htmlFor="cluster-name"
              name="cluster-name"
              label="Cluster name"
              required
            >
              <TextInput
                aria-required="true"
                id="cluster-name"
                name="cluster-name"
              />
            </FormField>
            <FormField
              htmlFor="resource-manager"
              name="resource-manager"
              label="Distributed resoure manager"
            >
              <CheckBox
                id="resource-manager"
                name="resource-manager"
                label="Use manager"
              />
            </FormField>
            {formValues['resource-manager'] && (
              <>
                <FormField
                  htmlFor="automation-level"
                  name="automation-level"
                  label="Automation level"
                >
                  <Select
                    id="automation-level"
                    name="automation-level"
                    options={['Smart (recommended)', 'High', 'Medium', 'Low']}
                    placeholder="Select ..."
                  />
                </FormField>
                {/* https://github.com/grommet/eslint-plugin-grommet/issues/47 */}
                {/* eslint-disable-next-line grommet/formfield-htmlfor-id, 
                grommet/formfield-name */}
                <FormField
                  htmlFor="migration-threshold"
                  name="migration-threshold"
                  label="Migration threshold"
                >
                  <Box
                    direction="row"
                    gap='xsmall'
                    pad={{ horizontal: 'xsmall', vertical: '3xsmall' }}
                  >
                    <Text>0%</Text>
                    <RangeInput
                      id="migration-threshold"
                      name="migration-threshold"
                      min={0}
                      max={50}
                    />
                    <Text>50%</Text>
                  </Box>
                </FormField>
              </>
            )}
          </>
          <Box gap='xsmall'>
            <Heading level={3} margin="none">
              Hosts
            </Heading>
            <FormChildObjects
              collection={{
                name: 'Hosts',
                itemName: 'host',
                parentName: 'cluster',
              }}
              fields={INPUT_MAP}
              headingLevel={4}
              onAdd={handleAdd}
              onRemove={handleRemove}
              onRemoveAll={handleRemoveAll}
              primaryKey="host"
              required
              summarize={['cpu', 'memory']}
              values={formValues.hosts}
            />
          </Box>
          <ButtonGroup pad={{ top: 'medium' }}>
            <Button
              label="Create cluster"
              a11yTitle="Create cluster"
              primary
              type="submit"
            />
            <Button
              label="Cancel"
              a11yTitle="Cancel cluster creation"
              onClick={() => {}}
            />
          </ButtonGroup>
        </Box>
      </Form>
    </ContentPane>
  );
};
