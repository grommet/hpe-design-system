import { useContext } from 'react';
import {
  Box,
  FormField,
  Grid,
  ResponsiveContext,
  Select,
  Stack,
  TextInput,
} from 'grommet';
import { FormChildObject } from '../../FormChildObject';

const childObject = {
  name: '',
  host: 'mip-bd-vm257.mip.storage.hpecorp.net',
  cpu: '4 cores',
  memory: '32 GB',
};

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

export const CollapsedStateAnatomy = () => {
  const breakpoint = useContext(ResponsiveContext);
  const columns = ['auto'];
  const rows = ['auto'];

  const inputs = Object.entries(childObject).map(([key, value]) => {
    return INPUT_MAP[key]({ key, value });
  });

  const handleRemove = () => {
    console.log('Remove me!');
  };

  return (
    <Stack interactiveChild="first">
      <Grid
        columns={columns}
        rows={rows}
        // areas={areas}
      >
        {/* this Box is for defining the anatomy diagram */}
        <Box background="background-front" width="medium">
          <FormChildObject
            collectionName="Host"
            index={1}
            level={3}
            name={childObject.name}
            onRemove={() => handleRemove()}
            summarize={['cpu', 'memory']}
            values={childObject}
          >
            {inputs}
          </FormChildObject>
        </Box>
      </Grid>
    </Stack>
  );
};
