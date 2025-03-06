import React from 'react';
import {
  Box,
  Heading,
  Page,
  PageContent,
  PageHeader,
  Form,
  FormField,
  Select,
  TextArea,
  RadioButtonGroup,
  Text,
  TextInput,
  Button,
} from 'grommet';
import { ContentPane } from '../../../layouts';

// `demoStyle` is specific for the Design System site and is used
// as a visual aid to help present layout concepts. Remove from
// your implementation.
import { demoStyle } from './demoStyle';

export const PageNarrowExample = () => (
  <Page kind="narrow" flex="grow" pad={{ vertical: 'large' }} {...demoStyle}>
    <PageContent gap="large" {...demoStyle}>
      <PageHeader
        title="Narrow page"
        actions={[<Button key="Action A" secondary label="Action A" />]}
      />
      <ContentPane>
        <FormSection />
      </ContentPane>
    </PageContent>
  </Page>
);

const FormSection = () => (
  <Form>
    <Box width="medium" gap="medium">
      <>
        <Heading level={2} margin="none">
          A form section
        </Heading>
        <FormField
          htmlFor="field1"
          name="field1"
          label="Field 1"
          help="Some descriptive text providing context for the input."
        >
          <TextArea
            id="field1"
            name="field1"
            placeholder="Enter a description ..."
          />
        </FormField>
        {/* https://github.com/grommet/eslint-plugin-grommet/issues/46 */}
        {/* eslint-disable-next-line grommet/formfield-htmlfor-id */}
        <FormField htmlFor="field2__input" name="field2" label="Field 2">
          <Select
            id="field2"
            name="field2"
            placeholder="Select an option"
            options={new Array(12)
              .fill()
              .map((_, index) => `Option ${index + 1}`)}
          />
        </FormField>
        <FormField htmlFor="field3" name="field3" label="Field 3">
          <RadioButtonGroup
            id="field3"
            name="field3"
            options={new Array(4).fill().map((_, index) => ({
              label: <Text>Option {index + 1}</Text>,
              value: index + 1,
            }))}
          />
        </FormField>
      </>
      <>
        <Heading level={2} margin="none">
          Another form section
        </Heading>
        {new Array(5).fill().map((_, index) => (
          <FormField
            key={index + 1}
            htmlFor={`toggle${index + 1}`}
            name={`toggle${index + 1}`}
            label={`Label ${index + 1}`}
          >
            <TextInput
              id={`toggle${index + 1}`}
              name={`toggle${index + 1}`}
              placeholder="Placeholder"
            />
          </FormField>
        ))}
      </>
      <Button alignSelf="start" primary label="Apply settings" />
    </Box>
  </Form>
);
