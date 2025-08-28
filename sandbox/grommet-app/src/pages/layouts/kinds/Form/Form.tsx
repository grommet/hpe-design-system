import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Button,
  CheckBox,
  Form as GrommetForm,
  FormField,
  FileInput,
  Page,
  PageContent,
  Select,
  ResponsiveContext,
  TextInput,
  TextArea,
  CheckBoxGroup,
  PageHeader,
} from 'grommet';
import { Previous } from 'grommet-icons';
import { RoutedAnchor } from '../../../../components';
import ContentPane from '../../../../components/ContentPane';

const superPower = ['Flying', 'Sky Runner', 'Invisibility'];
const weakness = ['Fire', 'PB & J', 'Kryptonite'];

export const Form = () => {
  const [formValues, setFormValues] = React.useState({
    name: 'Enduro',
    superPower: 'Sky Runner',
    nemesis: true,
    email: 'enduro@skyrunner.io.com',
    weakness: [],
    comments: '',
  });
  const size = useContext(ResponsiveContext);
  const onFormChange = value => {
    setFormValues(value);
  };
  // eslint-disable-next-line no-unused-vars
  const onSubmit = ({ value, touched }) => {
    // Your submission logic here
  };

  const [numFiles, setNumFiles] = useState(0);

  return (
    <Page pad={{
      bottom: '3xlarge'
    }} kind="narrow">
      <PageContent>
        <PageHeader
          title="Form"
          parent={
            <RoutedAnchor
              as={Link}
              label="Layouts"
              to="/layouts"
              icon={<Previous />}
            />
          }
        />
        <ContentPane
          width={{ min: 'medium', max: 'medium' }}
          heading="Create a new character"
          level={2}
          actions={undefined}
          skeleton={undefined}
        >
          <GrommetForm
            messages={{
              required: 'This is a required field.',
            }}
            onSubmit={({ value, touched }) => onSubmit({ value, touched })}
            value={formValues}
            onChange={onFormChange}
            method="post"
          >
            <FormField
              required
              error="Provide a unique name."
              htmlFor="name"
              name="name"
              label="Name"
            >
              <TextInput id="name" name="name" />
            </FormField>
            {/* https://github.com/grommet/eslint-plugin-grommet/issues/46 */}
            {/* eslint-disable-next-line grommet/formfield-htmlfor-id */}
            <FormField
              required
              htmlFor="superPower__input"
              name="superPower"
              label="Superpower"
            >
              <Select options={superPower} id="superPower" name="superPower" />
            </FormField>
            <FormField
              required
              htmlFor="weakness"
              name="weakness"
              label="Weakness"
              error={
                !formValues.weakness.length ? 'This is a required field.' : ''
              }
            >
              <CheckBoxGroup options={weakness} id="weakness" name="weakness" />
            </FormField>
            <FormField required htmlFor="email" name="email" label="Email">
              <TextInput id="email" name="email" />
            </FormField>
            <FormField
              help="Would you like to apply nemesis character?"
              htmlFor="nemesis"
              name="nemesis"
              label="Nemesis"
            >
              <CheckBox
                id="nemesis"
                name="nemesis"
                label="Bring it on"
                toggle
                reverse
              />
            </FormField>
            <FormField htmlFor="comments" name="comments" label="Comments">
              <TextArea
                id="comments"
                name="comments"
                placeholder="Comments"
                resize="vertical"
              />
            </FormField>
            <FormField
              htmlFor="fileinput"
              name="fileinput"
              label="Upload a file"
              required
            >
              <FileInput
                messages={{
                  dropPrompt: 'Drag and drop',
                  browse: numFiles > 0 ? 'Replace file' : 'Select file',
                }}
                id="fileinput"
                onChange={(event, { files }) => setNumFiles(files.length)}
                name="fileinput"
              />
            </FormField>
            <Box
              align={!['xsmall', 'small'].includes(size) ? 'start' : undefined}
              margin={{
                top: 'medium',
                bottom: 'xsmall'
              }}
            >
              <Button label="Create" primary type="submit" />
            </Box>
          </GrommetForm>
        </ContentPane>
      </PageContent>
    </Page>
  );
};
