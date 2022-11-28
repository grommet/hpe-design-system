/* eslint-disable react/prop-types */
import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  DataTable,
  Drop,
  Form,
  FormField,
  Heading,
  Layer,
  Page,
  PageContent,
  Select,
  TextInput,
  CheckBoxGroup,
  Paragraph,
} from 'grommet';
import { FormClose } from 'grommet-icons';
import {
  useFilters,
  FiltersProvider,
  FilterControls,
} from '../../templates/FilterControls';
import applications from '../../../data/mockData/applications.json';

const defaultFormValues = {
  'flavor-select': 'Center modal',
  'application-title': '',
  'publisher-title': '',
  'pricing-select': [],
  'delivery-select': [],
};

export const ConfigurationForm = ({ fullscreen, containerRef }) => {
  const [open, setOpen] = useState(false);
  const [formValue, setFormValue] = useState(defaultFormValues);
  const [touched, setTouched] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const layerProps = fullscreen
    ? { full: true }
    : { position: 'right', full: 'vertical' };

  const onClose = () => {
    if (touched) {
      setShowConfirmation(true);
    } else {
      setOpen(false);
      setFormValue(defaultFormValues);
    }
  };

  const targetRef = useRef();
  const Confirmation =
    formValue['flavor-select'] === 'Center modal' ? (
      <DoubleConfirmation
        setOpen={setOpen}
        setShowConfirmation={setShowConfirmation}
        setFormValue={setFormValue}
      />
    ) : (
      targetRef.current && (
        <Drop
          align={{ top: 'top', right: 'left' }}
          target={targetRef.current}
          round="small"
        >
          <ConfirmationContent
            setShowConfirmation={setShowConfirmation}
            setOpen={setOpen}
            setFormValue={setFormValue}
            drop
          />
        </Drop>
      )
    );

  let content = (
    <Box pad="medium" gap="medium" overflow="auto">
      <Box
        direction="row"
        align="start"
        gap="small"
        justify="between"
        flex={false}
      >
        <Heading level={2} size="small" margin="none">
          Add application
        </Heading>
        <Button icon={<FormClose />} onClick={onClose} ref={targetRef} />
      </Box>
      <Box flex={false}>
        <LayerForm
          setOpen={setOpen}
          value={formValue}
          setFormValue={setFormValue}
          setTouched={setTouched}
        />
      </Box>
      <Box direction="row" gap="small" flex={false}>
        <Button
          label="Add application"
          primary
          type="submit"
          form="application-form"
        />
        <Button label="Cancel" onClick={onClose} />
      </Box>
    </Box>
  );

  if (fullscreen)
    content = (
      <Page kind="narrow" overflow="auto">
        <Button
          alignSelf="end"
          icon={<FormClose />}
          onClick={onClose}
          ref={targetRef}
        />
        <PageContent align="center">
          <Box gap="medium" pad={{ bottom: 'large' }} flex={false}>
            <Box>
              <Heading level={2} margin="none" size="small">
                Layer title
              </Heading>
              <Paragraph margin="none">
                1. Click close without interacting with form -- no confirmation
              </Paragraph>
              <Paragraph margin="none">
                2. Type something into form then click close -- double
                confirmation confirmation
              </Paragraph>
            </Box>
            <LayerForm
              setOpen={setOpen}
              value={formValue}
              setFormValue={setFormValue}
              setTouched={setTouched}
            />
            <Box direction="row" gap="small" flex={false}>
              <Button
                label="Add application"
                primary
                type="submit"
                form="application-form"
              />
              <Button label="Cancel" onClick={onClose} />
            </Box>
          </Box>
        </PageContent>
      </Page>
    );

  return (
    <FiltersProvider>
      <Page>
        <PageContent>
          <Box gap="medium">
            <Heading id="applications-heading" level={2} margin="none">
              Applications
            </Heading>
            <FilterControls
              data={applications}
              filters={[]}
              primaryKey="title"
              searchFilter={{ placeholder: 'Search' }}
              actions={
                <Button
                  label="Add application"
                  secondary
                  onClick={() => setOpen(true)}
                />
              }
              layerProps={{ target: containerRef?.target }}
            />
            <ApplicationResults />
          </Box>
          {open && (
            <Layer
              // target={containerRef?.current}
              {...layerProps}
              onEsc={onClose}
            >
              {content}
            </Layer>
          )}
          {showConfirmation ? Confirmation : null}
        </PageContent>
      </Page>
    </FiltersProvider>
  );
};

ConfigurationForm.propTypes = {
  containerRef: PropTypes.object,
};

export const LayerForm = ({ setOpen, setFormValue, setTouched, value }) => (
  <Form
    id="application-form"
    onSubmit={event => {
      console.log(event.value);
      setOpen(false);
    }}
    messages={{
      required: 'This is a required field.',
    }}
    value={value}
    onChange={(nextValue, { touched }) => {
      console.log('Change', nextValue, touched);
      setFormValue(nextValue);
      setTouched(Object.keys(touched).length);
    }}
  >
    <FormField
      label="Confirmation flavor"
      contentProps={{ width: 'medium' }}
      required
      name="flavor-select"
      htmlFor="flavor-select__input"
    >
      <Select
        id="flavor-select"
        name="flavor-select"
        options={['Center modal', 'Drop']}
      />
    </FormField>
    <FormField
      label="Title"
      contentProps={{ width: 'medium' }}
      required
      name="application-title"
      htmlFor="application-title"
    >
      <TextInput id="application-title" name="application-title" />
    </FormField>
    <FormField
      label="Publisher"
      contentProps={{ width: 'medium' }}
      required
      name="publisher"
      htmlFor="publisher"
    >
      <TextInput name="publisher" id="publisher" />
    </FormField>
    <FormField
      label="Pricing"
      contentProps={{ width: 'medium' }}
      name="pricing-select"
      htmlFor="pricing-select__input"
      required
    >
      <CheckBoxGroup
        id="pricing-select"
        name="pricing-select"
        options={[
          'Annual license',
          'Free',
          'Free trial',
          'Monthly Subscription',
        ]}
      />
    </FormField>
    <FormField
      label="Delivery"
      contentProps={{ width: 'medium' }}
      name="delivery-select"
      htmlFor="delivery-select__input"
      required
    >
      <CheckBoxGroup
        id="delivery-select"
        name="delivery-select"
        options={['License key', 'Package manager', 'Web application']}
      />
    </FormField>
  </Form>
);

LayerForm.propTypes = {
  setOpen: PropTypes.func.isRequired,
};

const DoubleConfirmation = ({ setShowConfirmation, setOpen, setFormValue }) => (
  <Layer>
    <ConfirmationContent
      setShowConfirmation={setShowConfirmation}
      setOpen={setOpen}
      setFormValue={setFormValue}
    />
  </Layer>
);

const ConfirmationContent = ({
  setShowConfirmation,
  setOpen,
  setFormValue,
  drop,
}) => (
  <Box pad="medium" gap="medium">
    <Box>
      <Heading level={2} size="small" margin="none">
        Leave application form?
      </Heading>
      <Paragraph margin="none">
        You have unsaved changes that will be lost.
      </Paragraph>
    </Box>
    <Box direction={drop ? 'row-reverse' : 'row'} gap="small" justify="end">
      <Button label="Cancel" onClick={() => setShowConfirmation(false)} />
      <Button
        label="Yes, leave"
        primary
        onClick={() => {
          setShowConfirmation(false);
          setOpen(false);
          setFormValue(defaultFormValues);
        }}
      />
    </Box>
  </Box>
);
const columns = [
  {
    property: 'title',
    header: 'Title',
  },
  {
    property: 'publisher',
    header: 'Publisher',
  },
  {
    property: 'pricing',
    header: 'Pricing',
  },
];

const ApplicationResults = ({ height = { max: 'medium' } }) => {
  // const breakpoint = useContext(ResponsiveContext);
  const { filteredResults, selected, setSelected } = useFilters();

  return (
    <Box height={height} overflow="auto">
      <DataTable
        aria-describedby="applications-heading"
        data={filteredResults}
        columns={columns}
        pin
        primaryKey="title"
        sortable
        onSelect={nextSelected => setSelected(nextSelected)}
        select={selected}
      />
    </Box>
  );
};

ApplicationResults.propTypes = {
  height: PropTypes.string,
};
