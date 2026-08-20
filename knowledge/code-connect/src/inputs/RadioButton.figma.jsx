import figma from '@figma/code-connect';
import { RadioButton } from 'grommet';

const FIGMA_URL =
  'https://www.figma.com/design/HDckqS2MWhINfC8EIQPMV1/HPE-Design-System-Components-V2?node-id=4377-1430&m=dev';

const sharedProps = {
  checked: figma.enum('is Checked', {
    false: false,
    true: true,
  }),
  disabled: figma.enum('State', {
    enabled: false,
    hovered: false,
    focused: false,
    disabled: true,
  }),
  reverse: figma.enum('is Reversed', {
    false: false,
    true: true,
  }),
};

/**
 * RadioButton with visible label
 */
figma.connect(RadioButton, FIGMA_URL, {
  variant: { 'show Label': 'true' },
  props: {
    ...sharedProps,
    label: figma.string('Label'),
  },
  example: ({ label, checked, disabled, reverse }) => (
    <RadioButton
      name="radio-button"
      label={label}
      checked={checked}
      disabled={disabled}
      reverse={reverse}
    />
  ),
});

/**
 * RadioButton without visible label
 */
figma.connect(RadioButton, FIGMA_URL, {
  variant: { 'show Label': 'false' },
  props: sharedProps,
  example: ({ checked, disabled, reverse }) => (
    <RadioButton
      name="radio-button"
      checked={checked}
      disabled={disabled}
      reverse={reverse}
    />
  ),
});
