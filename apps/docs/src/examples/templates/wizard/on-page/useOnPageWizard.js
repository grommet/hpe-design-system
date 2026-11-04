// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { useCallback, useEffect, useRef, useState } from 'react';

// Fields are looked up inside the wizard's own form so that several wizards
// can live on the same page.
const getField = (formId, name) =>
  document.getElementById(formId)?.querySelector(`[name="${name}"]`);

// State and behavior shared by the on-page wizard examples: the active step,
// form values that persist between steps, the form-level validation summary
// and the cancellation confirmation.
export const useOnPageWizard = ({ defaultValues, id, steps, onSubmit }) => {
  const formId = `${id}-form`;
  const [activeIndex, setActiveIndex] = useState(0);
  const [value, setValue] = useState(defaultValues);
  // names of fields that failed validation, populated once the user
  // attempts to continue. Empty means the validation summary is hidden.
  const [errorNames, setErrorNames] = useState([]);
  const [cancelOpen, setCancelOpen] = useState(false);

  const isLastStep = activeIndex === steps.length - 1;

  // Move the user to the start of the new step so that they do not have to
  // scroll back up after advancing from the bottom of a long step. Comparing
  // to the previous step keeps this from running on mount.
  const previousIndex = useRef(activeIndex);
  useEffect(() => {
    if (previousIndex.current === activeIndex) return;
    previousIndex.current = activeIndex;
    document
      .getElementById(formId)
      ?.querySelector('input, select, textarea')
      ?.focus();
  }, [activeIndex, formId]);

  const focusFirstError = useCallback(
    names => getField(formId, names[0])?.focus(),
    [formId],
  );

  const handleValidate = useCallback(
    ({ errors, submitting }) => {
      const names = Object.keys(errors);
      // Form reports results while it is rendering, so defer state updates.
      setTimeout(() => {
        // Once shown, keep the summary in sync as the user fixes errors.
        // Otherwise only show it in response to a submit attempt.
        setErrorNames(prev => (submitting || prev.length > 0 ? names : prev));
        if (submitting && names.length > 0) focusFirstError(names);
      }, 0);
    },
    [focusFirstError],
  );

  const handleSubmit = event => {
    setErrorNames([]);
    if (isLastStep) onSubmit?.(event.value);
    else setActiveIndex(activeIndex + 1);
  };

  const handlePrevious = () => {
    setErrorNames([]);
    setActiveIndex(activeIndex - 1);
  };

  // Used as the WizardContext setFormValues, which CancellationLayer calls
  // with the default values when the user confirms they want to exit.
  const reset = useCallback(nextValue => {
    setValue(nextValue);
    setErrorNames([]);
    setActiveIndex(0);
  }, []);

  return {
    activeIndex,
    cancelOpen,
    dismissErrors: () => setErrorNames([]),
    errorCount: errorNames.length,
    focusFirstError: () => focusFirstError(errorNames),
    formId,
    handlePrevious,
    handleSubmit,
    handleValidate,
    isLastStep,
    reset,
    setCancelOpen,
    setValue,
    value,
  };
};
