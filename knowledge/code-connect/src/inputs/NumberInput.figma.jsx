import figma from '@figma/code-connect';
import { TextInput } from 'grommet';

/**
 * Figma Code Connect mapping for the HPE Design System Number Input - V2
 */
figma.connect(
  TextInput,
  'https://www.figma.com/design/HDckqS2MWhINfC8EIQPMV1/HPE-Design-System-Components-V2?node-id=4955-3437',
  {
    props: {
      value: figma.enum('Value', {
        false: undefined,
        true: '33',
      }),
      disabled: figma.enum('State', {
        enabled: false,
        hovered: false,
        focused: false,
        disabled: true,
      }),
      focusIndicator: figma.enum('State', {
        enabled: false,
        hovered: false,
        focused: true,
        disabled: false,
      }),
    },
    example: ({ value, disabled, focusIndicator }) => (
      <TextInput
        type="number"
        value={value}
        disabled={disabled}
        focusIndicator={focusIndicator}
      />
    ),
  },
);
