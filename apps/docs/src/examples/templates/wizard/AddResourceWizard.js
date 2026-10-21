// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
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
  ResponsiveContext,
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
  const size = useContext(ResponsiveContext);
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
              <Box
                pad={{ top: 'xlarge', bottom: '3xlarge' }}
                gap="medium"
                flex={false}
              >
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
        {/* mirrors Page kind="narrow" so the footer border spans the
            content column rather than the full viewport width */}
        <Box
          alignSelf="center"
          fill="horizontal"
          flex={false}
          pad={{ horizontal: size === 'medium' ? 'medium' : 'xlarge' }}
          width={{ max: 'xlarge' }}
        >
          <Footer
            border={{ side: 'top', color: 'border' }}
            pad={{ vertical: 'xxsmall' }}
          >
            <Box
              direction="row"
              gap="xsmall"
              justify="between"
              fill="horizontal"
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
