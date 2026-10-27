// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Wizard,
  WizardContent,
  WizardFooter,
  WizardHeader,
  WizardStepHeader,
} from 'grommet';
import { CancellationLayer } from './components';
import {
  defaultFormValues,
  pageBackground,
  steps,
  wizardTitle,
} from './content/add-resource';

export const AddResourceWizard = ({ containerRef }) => {
  // containerRef is for demonstration purposes on this site. Most
  // implementations should likely remove.
  const [open, setOpen] = useState(false);
  // Wizard is uncontrolled; changing the key remounts it so both the form
  // values and the active step return to their defaults.
  const [wizardKey, setWizardKey] = useState(0);
  const reset = () => setWizardKey(key => key + 1);
  // Wizard's built-in scroll reset targets its own container, so the
  // composed scroll region below is reset explicitly on each step change.
  const bodyRef = useRef();

  return (
    <Box fill background={pageBackground}>
      <Wizard
        key={wizardKey}
        id="add-resource-wizard"
        aria-label={wizardTitle}
        steps={steps}
        defaultValue={defaultFormValues}
        showProgress={false}
        closable
        messages={{ complete: 'Add resources' }}
        onCancel={() => setOpen(true)}
        onStepChange={({ phase }) => {
          if (phase === 'navigated') bodyRef.current?.scrollTo({ top: 0 });
        }}
        onComplete={({ value }) => {
          console.log('onSubmit:', value);
          reset();
        }}
      >
        <WizardHeader title={wizardTitle} />
        {/* constrain the step to a narrow reading column while the header
            and footer span the full width */}
        <Box
          ref={bodyRef}
          flex
          overflow="auto"
          align="center"
          fill="horizontal"
        >
          <Box
            fill="horizontal"
            flex="grow"
            pad={{ horizontal: 'xlarge', top: 'xlarge', bottom: '3xlarge' }}
            width={{ max: 'xlarge' }}
          >
            <WizardStepHeader />
            <WizardContent />
          </Box>
        </Box>
        <WizardFooter />
      </Wizard>
      {open && (
        <CancellationLayer
          target={containerRef && containerRef.current}
          title={wizardTitle}
          onExit={reset}
          onSetOpen={setOpen}
        />
      )}
    </Box>
  );
};

AddResourceWizard.propTypes = {
  containerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};
