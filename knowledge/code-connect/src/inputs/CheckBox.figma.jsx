import figma from '@figma/code-connect';
import { CheckBox } from 'grommet';

/**
 * Figma Code Connect mapping for the HPE Design System Checkbox - V2
 */
figma.connect(
  CheckBox,
  'https://www.figma.com/design/HDckqS2MWhINfC8EIQPMV1/HPE-Design-System-Components-V2?node-id=3060-10921',
  {
    props: {
      label: figma.boolean('show Label', {
        true: 'CheckBox label',
        false: undefined,
      }),
      disabled: figma.enum('State', {
        enabled: false,
        hovered: false,
        focused: false,
        disabled: true,
      }),
      checked: figma.enum('Checked', {
        unchecked: false,
        checked: true,
        indeterminate: true,
      }),
      indeterminate: figma.enum('Checked', {
        unchecked: false,
        checked: false,
        indeterminate: true,
      }),
      reverse: figma.enum('is Reversed', {
        false: false,
        true: true,
      }),
    },
    example: ({ label, disabled, checked, indeterminate, reverse }) => (
      <CheckBox
        label={label}
        disabled={disabled}
        checked={checked}
        indeterminate={indeterminate}
        reverse={reverse}
      />
    ),
  },
);
