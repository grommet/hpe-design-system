// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import {
  Anchor,
  Box,
  Form,
  Heading,
  Page,
  PageContent,
  PageHeader,
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
  SubjectField,
  ValidationSummary,
  WatchlistField,
  defaultValues,
  steps,
  useOnPageWizard,
} from './on-page';

const id = 'centered-on-page-wizard';

// The wizard sits directly on the page, with no container behind it. The
// header, stepper, inputs and buttons share one narrow, centered column. Since
// there is no free space beside the inputs, the form-level validation summary
// appears directly above the buttons.
export const CenteredOnPageWizardExample = ({ containerRef }) => {
  // containerRef is for demonstration purposes on this site. Most
  // implementations should likely remove.
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
          <Box alignSelf="center" fill="horizontal" width={{ max: 'medium' }}>
            <PageHeader
              parent={
                <Anchor label="Case dashboard" icon={<Left />} href="#" />
              }
              title="Create case"
            />
            {/* Main is commented out for this example, but should be used in a
            real application. */}
            {/* <Main> */}
            <Box gap="xlarge">
              <Box gap="small">
                <Heading level={2} margin="none">
                  New case: Technical
                </Heading>
                <Stepper
                  aria-label="Create case progress"
                  clickableSteps={false}
                  currentStep={step.id}
                  flex={false}
                  showDescription={false}
                  steps={steps.map((item, index) => ({
                    ...item,
                    status:
                      index < wizard.activeIndex ? 'completed' : 'pending',
                  }))}
                />
              </Box>
              <Box gap="large">
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
                      <PriorityField idPrefix={id} />
                      <FollowUpFields idPrefix={id} />
                      <WatchlistField idPrefix={id} />
                    </>
                  ) : (
                    <ProductDetailsFields idPrefix={id} />
                  )}
                </Form>
                <Box gap="medium">
                  {wizard.errorCount > 0 && (
                    <ValidationSummary
                      errorCount={wizard.errorCount}
                      onClose={wizard.dismissErrors}
                      onGoToFirstError={wizard.focusFirstError}
                    />
                  )}
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
            </Box>
            {/* </Main> */}
          </Box>
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

CenteredOnPageWizardExample.propTypes = {
  containerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};
