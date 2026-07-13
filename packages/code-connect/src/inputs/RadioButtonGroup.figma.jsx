import figma from '@figma/code-connect';
import { RadioButtonGroup } from 'grommet';

const FIGMA_URL =
  'https://www.figma.com/design/HDckqS2MWhINfC8EIQPMV1/HPE-Design-System-Components-V2?node-id=3137-14948&m=dev';

figma.connect(RadioButtonGroup, FIGMA_URL, {
  props: {
    disabled: figma.enum('State', {
      enabled: false,
      hovered: false,
      focused: false,
      disabled: true,
    }),
    options: figma.enum('# Options', {
      1: ['Option 1'],
      2: ['Option 1', 'Option 2'],
      3: ['Option 1', 'Option 2', 'Option 3'],
      4: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
      5: ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5'],
      6: [
        'Option 1',
        'Option 2',
        'Option 3',
        'Option 4',
        'Option 5',
        'Option 6',
      ],
      7: [
        'Option 1',
        'Option 2',
        'Option 3',
        'Option 4',
        'Option 5',
        'Option 6',
        'Option 7',
      ],
      8: [
        'Option 1',
        'Option 2',
        'Option 3',
        'Option 4',
        'Option 5',
        'Option 6',
        'Option 7',
        'Option 8',
      ],
      9: [
        'Option 1',
        'Option 2',
        'Option 3',
        'Option 4',
        'Option 5',
        'Option 6',
        'Option 7',
        'Option 8',
        'Option 9',
      ],
      10: [
        'Option 1',
        'Option 2',
        'Option 3',
        'Option 4',
        'Option 5',
        'Option 6',
        'Option 7',
        'Option 8',
        'Option 9',
        'Option 10',
      ],
    }),
  },
  example: ({ disabled, options }) => (
    <RadioButtonGroup
      name="radio-button-group"
      disabled={disabled}
      options={options}
    />
  ),
});
