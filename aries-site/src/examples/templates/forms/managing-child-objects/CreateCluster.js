import { useEffect, useState } from 'react';
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
import { FormChildObject } from '../../../../examples/templates/FormChildObject';

// const hosts = [
//   {
//     name: 'worker 1',
//     host: 'mip-bd-vm257.mip.storage.hpecorp.net',
//     cpu: '4 cores',
//     memory: '32 GB',
//   },
//   {
//     name: 'worker 2',
//     hostname: 'mip-bd-vm258.mip.storage.hpecorp.net',
//     cpu: '4 cores',
//     memory: '32 GB',
//   },
// ];

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
      aria-required="true"
    >
      <TextInput
        id={`hosts[${index}].host`}
        name={`hosts[${index}].host`}
        {...rest}
      />
    </FormField>
  ),
  cpu: ({ key, index, ...rest }) => (
    <FormField
      key={key}
      htmlFor={`hosts[${index}].cpu`}
      name={`hosts[${index}].cpu`}
      label="CPU"
      required
      aria-required="true"
    >
      <Select
        id={`hosts[${index}].cpu`}
        name={`hosts[${index}].cpu`}
        options={['2 cores', '4 cores', '6 cores']}
        {...rest}
      />
    </FormField>
  ),
  memory: ({ key, index, ...rest }) => (
    <FormField
      key={key}
      htmlFor={`hosts[${index}].memory`}
      name={`hosts[${index}].memory`}
      label="Memory"
      required
      aria-required="true"
    >
      <Select
        id={`hosts[${index}].memory`}
        name={`hosts[${index}].memory`}
        options={['32 GB', '64 GB', '128 GB']}
        {...rest}
      />
    </FormField>
  ),
};

export const CreateCluster = () => {
  const [formValues, setFormValues] = useState({
    'cluster-name': '',
    'resource-manager': false,
    'automation-level': '',
    'migration-threshold': 15,
    hosts: [{ ...hostTemplate }],
  });

  const handleAdd = () => {
    const nextHosts = [...formValues.hosts, { ...hostTemplate }];
    setFormValues({ ...formValues, hosts: nextHosts });
  };

  const handleRemove = index => {
    if (formValues.hosts?.length > 0) {
      setFormValues({
        ...formValues,
        hosts: formValues.hosts.filter((value, i) => i !== index),
      });
    }
  };

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

  useEffect(() => {
    console.log(formValues);
  }, [formValues]);

  return (
    <>
      <Heading level={2} margin="none">
        Create Cluster
      </Heading>
      <Box width="medium">
        <Form value={formValues} onChange={onChange} onSubmit={onSubmit}>
          <Box gap="medium">
            <>
              <FormField
                htmlFor="cluster-name"
                name="cluster-name"
                label="Cluster name"
                required
                aria-required="true"
              >
                <TextInput id="cluster-name" name="cluster-name" />
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
                  <FormField
                    htmlFor="migration-threshold"
                    name="migration-threshold"
                    label="Migration threshold"
                  >
                    <Box
                      direction="row"
                      gap="small"
                      pad={{ horizontal: 'small', vertical: 'xsmall' }}
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
            <Box gap="small">
              <Heading level={3} margin="none">
                Hosts
              </Heading>
              <>
                {formValues.hosts &&
                  formValues.hosts.map((host, index) => {
                    return (
                      <FormChildObject
                        key={index}
                        collectionName="host"
                        index={index}
                        level={4}
                        name={host.name}
                        onRemove={handleRemove}
                        open={host.host === ''}
                        values={host}
                      >
                        {Object.entries(host).map(([key, value]) => {
                          return INPUT_MAP[key]({ key, value, index });
                        })}
                      </FormChildObject>
                    );
                  })}
              </>
              <Box direction="row" justify="end" gap="xsmall">
                {formValues.hosts?.length >= 2 && (
                  <Button
                    label="Remove all"
                    aria-label="Remove all hosts"
                    onClick={handleRemoveAll}
                  />
                )}
                <Button
                  label="Add host"
                  a11yTitle="Add host to cluster"
                  secondary
                  onClick={handleAdd}
                />
              </Box>
            </Box>
            <Box direction="row" gap="xsmall">
              <Button
                label="Create"
                a11yTitle="Create cluster"
                primary
                type="submit"
              />
              <Button
                label="Cancel"
                a11yTitle="Cancel cluster creation"
                onClick={() => {}}
              />
            </Box>
          </Box>
        </Form>
      </Box>
    </>
  );
};
