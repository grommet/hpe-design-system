import React, { useContext } from 'react';
import {
  Anchor,
  Box,
  Button,
  Form,
  FormField,
  Header,
  Heading,
  RadioButtonGroup,
  ResponsiveContext,
  Text,
} from 'grommet';
import { ContentPane } from '../../../layouts';

export const CustomizeExample = () => {
  const [formValues, setFormValues] = React.useState({});
  const size = useContext(ResponsiveContext);

  // eslint-disable-next-line no-unused-vars
  const onSubmit = ({ value, touched }) => {
    // Your submission logic here
  };

  return (
    <ContentPane gap="medium" width="medium">
      <Header
        direction="column"
        align="start"
        gap="5xsmall"
        pad={{ horizontal: '5xsmall' }}
      >
        {/* Use semantically correct heading level and adjust size as 
        needed. In this instance, this example is presented within an 
        HTML section element and this is the first heading within the 
        section, therefor h2 is the semantically correct heading. For 
        additional detail, see https://design-system.hpe.design/foundation/typography#semantic-usage-of-heading-levels). */}
        <Heading level={2} margin="none">
          Customize
        </Heading>
        <Text>your HPE Edgeline Server </Text>
      </Header>
      <Box
        // Padding used to prevent focus from being cutoff
        pad={{ horizontal: '5xsmall' }}
      >
        <Form
          validate="blur"
          value={formValues}
          onChange={setFormValues}
          onSubmit={({ value, touched }) => onSubmit({ value, touched })}
          method="post"
        >
          <FormField
            label="Memory"
            help={
              <Anchor href="#" size="xsmall">
                How much memory does my server need?
              </Anchor>
            }
            htmlFor="memory"
            name="memory"
          >
            <RadioButtonGroup
              id="memory"
              name="memory"
              options={[
                '8GB (1x8GB) DDR4-2400 ECC memory',
                '32GB (2x16GB) DDR4-2400 ECC memory',
                '64GB (2x32GB) DDR4-2400 ECC memory',
              ]}
            />
          </FormField>
          <FormField
            label="CPU"
            help={
              <Anchor href="#" size="xsmall">
                What is the right processor for my workload?
              </Anchor>
            }
            htmlFor="cpu"
            name="cpu"
          >
            <RadioButtonGroup
              id="cpu"
              name="cpu"
              options={[
                'AMD Opteron™ 1.6GHz (Turbo Boost 2.8GHz), 4 cores, 6 ' +
                  'graphic cores, 1MB',
                'AMD Opteron™ 2.1GHz (Turbo Boost 3.4GHz), 4 cores, 8 ' +
                  'graphic cores, 2MB',
              ]}
            />
          </FormField>
          <Box
            align={!['xsmall', 'small'].includes(size) ? 'start' : undefined}
            margin={{ top: 'medium', bottom: 'xsmall' }}
          >
            <Button label="Continue" primary type="submit" />
          </Box>
        </Form>
      </Box>
    </ContentPane>
  );
};
