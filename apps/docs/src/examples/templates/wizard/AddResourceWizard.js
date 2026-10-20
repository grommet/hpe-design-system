// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React, { useEffect, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Footer,
  Header,
  Heading,
  Main,
  Page,
  PageContent,
} from 'grommet';
import { Close, LinkNext, LinkPrev } from '@hpe-design/icons-grommet';
import {
  CancellationLayer,
  Error,
  StepHeader,
  WizardContext,
} from './components';
import {
  defaultFormValues,
  pageBackground,
  steps,
  wizardTitle,
} from './content/add-resource';

export const AddResourceWizard = ({ containerRef }) => {
  // containerRef is for demonstration purposes on this site. Most
  // implementations should likely remove.
  const [activeIndex, setActiveIndex] = useState(0);
  const [formValues, setFormValues] = useState(defaultFormValues);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState();
  const mainRef = useRef();
  const errorRef = useRef();

  const id = 'add-resource-wizard';
  const activeStep = activeIndex + 1;
  const lastStep = activeIndex === steps.length - 1;

  // scroll to top of step when step changes
  useEffect(() => {
    if (mainRef.current) mainRef.current.scrollTop = 0;
  }, [activeIndex]);

  // bring the step-level error into view when it appears
  useEffect(() => {
    if (error) errorRef.current?.scrollIntoView({ block: 'nearest' });
  }, [error]);

  const onNext = () => {
    const message = steps[activeIndex].validate?.(formValues);
    setError(message);
    if (message) return;
    if (lastStep) {
      console.log('onSubmit:', formValues);
      setFormValues(defaultFormValues);
      setActiveIndex(0);
    } else {
      setActiveIndex(activeIndex + 1);
    }
  };

  const onPrevious = () => {
    setError(undefined);
    setActiveIndex(activeIndex - 1);
  };

  const contextValue = useMemo(
    () => ({
      activeIndex,
      activeStep,
      defaultFormValues,
      formValues,
      id,
      setActiveIndex,
      setFormValues,
      steps,
      valid: !error,
      // steps call setValid(true) once the user starts correcting the step
      setValid: isValid => {
        if (isValid) setError(undefined);
      },
      wizardTitle,
    }),
    [activeIndex, activeStep, error, formValues],
  );

  return (
    <WizardContext.Provider value={contextValue}>
      <Box fill background={pageBackground}>
        <Header pad={{ horizontal: 'large', vertical: 'xxsmall' }} flex={false}>
          <Heading level={2} margin="none">
            {wizardTitle}
          </Heading>
          <Button
            a11yTitle={`Cancel ${wizardTitle.toLowerCase()} wizard`}
            icon={<Close />}
            onClick={() => setOpen(true)}
          />
        </Header>
        <Main ref={mainRef} flex>
          <Page kind="narrow">
            <PageContent>
              <Box pad={{ top: 'xlarge', bottom: 'xxlarge' }} gap="medium">
                <StepHeader
                  summaryId={`${id}-summary`}
                  titleId={`${id}-title`}
                  descriptionId={`${id}-description`}
                />
                {steps[activeIndex].inputs}
                {error && (
                  <Box ref={errorRef} flex={false}>
                    <Error>{error}</Error>
                  </Box>
                )}
              </Box>
            </PageContent>
          </Page>
        </Main>
        <Footer
          border={{ side: 'top', color: 'border-weak' }}
          justify="center"
          flex={false}
        >
          <Box
            direction="row"
            gap="xsmall"
            justify="between"
            pad={{ horizontal: 'xlarge', vertical: 'xxsmall' }}
            width="xlarge"
          >
            <Box>
              {activeIndex > 0 && (
                <Button
                  icon={<LinkPrev />}
                  label="Previous"
                  onClick={onPrevious}
                />
              )}
            </Box>
            <Box direction="row" gap="xsmall">
              <Button label="Cancel" onClick={() => setOpen(true)} />
              <Button
                icon={<LinkNext />}
                label={lastStep ? 'Add resources' : 'Next'}
                onClick={onNext}
                primary
                reverse
              />
            </Box>
          </Box>
        </Footer>
      </Box>
      {open && (
        <CancellationLayer
          target={containerRef && containerRef.current}
          onSetOpen={setOpen}
        />
      )}
    </WizardContext.Provider>
  );
};

AddResourceWizard.propTypes = {
  containerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};
