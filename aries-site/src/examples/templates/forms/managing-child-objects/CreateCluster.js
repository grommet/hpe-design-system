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
import { FormChildObject } from '../../../../examples/templates/FormChildObject';

const hosts = [
  {
    name: 'worker 1',
    host: 'mip-bd-vm257.mip.storage.hpecorp.net',
    cpu: '4 cores',
    memory: '32 GB',
  },
  {
    name: 'worker 2',
    host: 'mip-bd-vm257.mip.storage.hpecorp.net',
    cpu: '4 cores',
    memory: '32 GB',
  },
];

const INPUT_MAP = {
  name: ({ key, ...rest }) => (
    <FormField key={key} htmlFor="hostname" name="hostname" label="Host name">
      <TextInput id="hostname" name="hostname" {...rest} />
    </FormField>
  ),
  host: ({ key, ...rest }) => (
    <FormField
      key={key}
      htmlFor="host"
      name="host"
      label="Host address"
      required
      aria-required="true"
    >
      <TextInput id="host" name="host" {...rest} />
    </FormField>
  ),
  cpu: ({ key, ...rest }) => (
    <FormField
      key={key}
      htmlFor="cpu"
      name="cpu"
      label="CPU"
      required
      aria-required="true"
    >
      <Select
        id="cpu"
        name="cpu"
        options={['2 cores', '4 cores', '6 cores']}
        {...rest}
      />
    </FormField>
  ),
  memory: ({ key, ...rest }) => (
    <FormField
      key={key}
      htmlFor="memory"
      name="memory"
      label="Memory"
      required
      aria-required="true"
    >
      <Select
        id="memory"
        name="memory"
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
  });

  const onChange = value => {
    setFormValues(value);
  };

  return (
    <>
      <Heading level={2} margin="none">
        Create Cluster
      </Heading>
      <Box width="medium">
        <Form value={formValues} onChange={onChange}>
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
                {hosts &&
                  hosts.map((host, index) => {
                    return (
                      <FormChildObject
                        key={index}
                        collectionName="host"
                        index={index}
                        level={4}
                        name={host.name}
                        onRemove={() => {}}
                        values={host}
                      >
                        {Object.entries(host).map(([key, value]) => {
                          return INPUT_MAP[key]({ key, value });
                        })}
                      </FormChildObject>
                    );
                  })}
              </>
              <Button label="Add host" secondary alignSelf="end" />
            </Box>
          </Box>
        </Form>
      </Box>
    </>
  );
};
