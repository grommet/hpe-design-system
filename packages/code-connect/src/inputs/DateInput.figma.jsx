import figma from '@figma/code-connect';
import { DateInput } from 'grommet';
import { Calendar } from 'grommet-icons';

/**
 * Figma Code Connect mapping for the HPE Design System Date Input - V2
 */
figma.connect(
  DateInput,
  'https://www.figma.com/design/HDckqS2MWhINfC8EIQPMV1/HPE-Design-System-Components-V2?node-id=3136-2109',
  {
    props: {
      placeholder: figma.enum('Kind', {
        single: 'mm/dd/yyyy',
        range: 'mm/dd/yyyy-mm/dd/yyyy',
      }),
      value: figma.enum('Value', {
        False: undefined,
        True: '10/30/2024',
      }),
      icon: figma.boolean('show Calendar', {
        true: <Calendar />,
        false: undefined,
      }),
      readOnlyFocus: figma.boolean('show ReadOnlyFocus', {
        true: true,
        false: false,
      }),
      a11yTitle: figma.boolean('show readOnlyCopy', {
        true: 'Date input with copy action',
        false: 'Date input',
      }),
      disabled: figma.enum('State', {
        enabled: false,
        hovered: false,
        focused: false,
        'focused (button)': false,
        disabled: true,
        readOnly: false,
      }),
      readOnly: figma.enum('State', {
        enabled: false,
        hovered: false,
        focused: false,
        'focused (button)': false,
        disabled: false,
        readOnly: true,
      }),
      id: figma.enum('State', {
        enabled: 'enabled',
        hovered: 'hovered',
        focused: 'focused',
        'focused (button)': 'focused-button',
        disabled: 'disabled',
        readOnly: 'readOnly',
      }),
    },
    example: ({
      placeholder,
      value,
      icon,
      readOnlyFocus,
      a11yTitle,
      disabled,
      readOnly,
      id,
    }) => (
      <DateInput
        id={id}
        a11yTitle={a11yTitle}
        format={placeholder}
        value={value}
        icon={icon}
        readOnly={readOnly}
        disabled={disabled}
        focusIndicator={readOnlyFocus}
      />
    ),
  },
);
