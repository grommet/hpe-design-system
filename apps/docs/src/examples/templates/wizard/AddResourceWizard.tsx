// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { useRef, useState } from 'react';
import type { RefObject } from 'react';
import {
  Box,
  Notification,
  Wizard,
  WizardContent,
  WizardFooter,
  WizardHeader,
  WizardStepHeader,
} from 'grommet';
import { CancellationLayer } from './components';
import {
  defaultFormValues,
  type ResourceFormValues,
  pageBackground,
  steps,
  wizardTitle,
} from './content/add-resource';

type AddResourceWizardProps = {
  containerRef?: RefObject<HTMLElement | null>;
  onCancel?: () => void;
  onComplete?: (value: ResourceFormValues) => void;
};

export const AddResourceWizard = ({
  containerRef,
  onCancel,
  onComplete,
}: AddResourceWizardProps = {}) => {
  // containerRef is for demonstration purposes on this site. Most
  // implementations should likely remove.
  const [open, setOpen] = useState(false);
  const [completed, setCompleted] = useState(false);
  // Wizard is uncontrolled; changing the key remounts it so both the form
  // values and the active step return to their defaults.
  const [wizardKey, setWizardKey] = useState(0);
  const reset = () => setWizardKey(key => key + 1);
  // Wizard's built-in scroll reset targets its own container, so the
  // composed scroll region below is reset explicitly on each step change.
  const bodyRef = useRef<HTMLDivElement>(null);

  return (
    <Box fill background={pageBackground}>
      <Wizard<ResourceFormValues>
        key={wizardKey}
        id="add-resource-wizard"
        aria-label={wizardTitle}
        steps={steps}
        defaultValue={defaultFormValues}
        showProgress={false}
        messages={{ complete: 'Add resources' }}
        onCancel={() => setOpen(true)}
        onStepChange={({ phase }) => {
          if (phase === 'navigated') bodyRef.current?.scrollTo({ top: 0 });
        }}
        onComplete={({ value }) => {
          if (onComplete) onComplete(value);
          else {
            setCompleted(true);
            reset();
          }
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
            {/* Grommet's base theme renders step content inside a padded
            "card" (wizard.content). Each FormSection here is already a card,
            so flatten the wrapper to avoid card-in-card and the lost width */}
            <WizardContent
              pad="none"
              background="none"
              round={false}
              margin={{ top: 'medium' }}
            />
          </Box>
        </Box>
        <WizardFooter />
      </Wizard>
      {open && (
        <CancellationLayer
          target={containerRef && containerRef.current}
          title={wizardTitle}
          onExit={onCancel || reset}
          onSetOpen={setOpen}
        />
      )}
      {completed && (
        <Notification
          toast={{ autoClose: false }}
          status="normal"
          title="Resources added (demo)"
          message={
            'The resource form was completed. ' +
            'No live resources were provisioned.'
          }
          onClose={() => setCompleted(false)}
        />
      )}
    </Box>
  );
};
