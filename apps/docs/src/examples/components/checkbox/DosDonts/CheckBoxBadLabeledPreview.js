import React from 'react';
import { CheckBox } from 'grommet';

// Anti-pattern: no label, aria-label, or
// aria-labelledby — inaccessible to screen reader users.
export const CheckBoxBadLabeledPreview = () => (
  <CheckBox
    id="unlabeled-checkbox"
    name="unlabeled-checkbox"
    defaultChecked
  />
);
