// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React, { useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import {
  Anchor,
  Box,
  Form,
  Grid,
  Heading,
  Page,
  PageContent,
  PageHeader,
  ResponsiveContext,
  Stepper,
} from 'grommet';
import { Left } from '@hpe-design/icons-grommet';
import { CancellationLayer, WizardContext } from './components';
import {
  DescriptionField,
  FollowUpFields,
  OnPageWizardFooter,
  PriorityField,
  ProductDetailsFields,
  ProductSeriesField,
  RequestTypeField,
  SerialNumberField,
  SubjectField,
  ValidationSummary,
  WatchlistField,
  defaultValues,
  steps,
  useOnPageWizard,
} from './on-page';

const id = 'on-page-wizard';

// The wizard sits directly on the page, with no container behind it. Inputs
// stay in a single column on the left. The space to their right is kept
// free for form-level messages, so they never push the inputs down. The
// buttons sit below the inputs, outside of the form.
export const OnPageWizardExample = ({ containerRef }) => {
  // containerRef is for demonstration purposes on this site. Most
  // implementations should likely remove.
  const size = useContext(ResponsiveContext);
  const stacked = ['xsmall', 'small'].includes(size);
  const wizard = useOnPageWizard({
    defaultValues,
    id,
    steps,
    onSubmit: value => console.log('onSubmit:', value),
  });
  const step = steps[wizard.activeIndex];
  const contextValue = useMemo(
    () => ({
      defaultFormValues: defaultValues,
      setFormValues: wizard.reset,
      wizardTitle: 'Create case',
    }),
    [wizard.reset],
  );

  return (
    <WizardContext.Provider value={contextValue}>
      {/* flex={false} keeps the page from shrinking inside the fixed-height
      docs frame; the frame scrolls instead. */}
      <Page
        background="background-front"
        flex={false}
        kind="narrow"
        pad={{ bottom: '3xlarge' }}
      >
        <PageContent>
          <PageHeader
            parent={<Anchor label="Case dashboard" icon={<Left />} href="#" />}
            title="Create case"
          />
          {/* Main is commented out for this example, but should be used in a
          real application. */}
          {/* <Main> */}
          <Box gap="xlarge">
            <Box gap="small">
              <Heading level={2} margin="none">
                New case: Admin case
              </Heading>
              <Stepper
                aria-label="Create case progress"
                clickableSteps={false}
                currentStep={step.id}
                flex={false}
                showDescription={false}
                steps={steps.map((item, index) => ({
                  ...item,
                  status: index < wizard.activeIndex ? 'completed' : 'pending',
                }))}
              />
            </Box>
            <Box gap="large">
              <Grid
                columns={stacked ? '100%' : ['medium', 'flex']}
                gap="xlarge"
              >
                <Box width={{ max: 'medium' }}>
                  <Form
                    id={wizard.formId}
                    key={step.id}
                    onChange={wizard.setValue}
                    onSubmit={wizard.handleSubmit}
                    onValidate={wizard.handleValidate}
                    value={wizard.value}
                  >
                    {wizard.activeIndex === 0 ? (
                      <>
                        <SubjectField idPrefix={id} />
                        <DescriptionField idPrefix={id} />
                        <RequestTypeField idPrefix={id} />
                        <PriorityField idPrefix={id} />
                        <FollowUpFields idPrefix={id} required />
                        <SerialNumberField idPrefix={id} />
                        <ProductSeriesField idPrefix={id} />
                        <WatchlistField idPrefix={id} required />
                      </>
                    ) : (
                      <ProductDetailsFields idPrefix={id} />
                    )}
                  </Form>
                </Box>
                {wizard.errorCount > 0 && (
                  <Box alignSelf="start">
                    <ValidationSummary
                      errorCount={wizard.errorCount}
                      onClose={wizard.dismissErrors}
                      onGoToFirstError={wizard.focusFirstError}
                    />
                  </Box>
                )}
              </Grid>
              <OnPageWizardFooter
                activeIndex={wizard.activeIndex}
                finishLabel="Create case"
                formId={wizard.formId}
                isLastStep={wizard.isLastStep}
                onCancel={() => wizard.setCancelOpen(true)}
                onPrevious={wizard.handlePrevious}
              />
            </Box>
          </Box>
          {/* </Main> */}
        </PageContent>
      </Page>
      {wizard.cancelOpen && (
        <CancellationLayer
          target={containerRef && containerRef.current}
          onSetOpen={wizard.setCancelOpen}
        />
      )}
    </WizardContext.Provider>
  );
};

OnPageWizardExample.propTypes = {
  containerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};
