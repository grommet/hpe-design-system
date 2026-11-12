// url=https://www.figma.com/design/HDckqS2MWhINfC8EIQPMV1/HPE-Design-System-Components-V2?node-id=3137-13553&m=dev
// source=https://github.com/grommet/grommet/blob/master/src/js/components/CheckBoxGroup/CheckBoxGroup.js
// component=CheckBoxGroup

import figma from 'figma';

const disabled = figma.selectedInstance.getEnum('State', {
  enabled: false,
  hovered: false,
  focused: false,
  disabled: true,
});
const options = figma.selectedInstance.getEnum('# Options', {
  '2': figma.helpers.react.array(['Option 1', 'Option 2']),
  '3': figma.helpers.react.array(['Option 1', 'Option 2', 'Option 3']),
  '4': figma.helpers.react.array([
    'Option 1',
    'Option 2',
    'Option 3',
    'Option 4',
  ]),
  '5': figma.helpers.react.array([
    'Option 1',
    'Option 2',
    'Option 3',
    'Option 4',
    'Option 5',
  ]),
  '6': figma.helpers.react.array([
    'Option 1',
    'Option 2',
    'Option 3',
    'Option 4',
    'Option 5',
    'Option 6',
  ]),
  '7': figma.helpers.react.array([
    'Option 1',
    'Option 2',
    'Option 3',
    'Option 4',
    'Option 5',
    'Option 6',
    'Option 7',
  ]),
  '8': figma.helpers.react.array([
    'Option 1',
    'Option 2',
    'Option 3',
    'Option 4',
    'Option 5',
    'Option 6',
    'Option 7',
    'Option 8',
  ]),
  '9': figma.helpers.react.array([
    'Option 1',
    'Option 2',
    'Option 3',
    'Option 4',
    'Option 5',
    'Option 6',
    'Option 7',
    'Option 8',
    'Option 9',
  ]),
  '10': figma.helpers.react.array([
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
  ]),
  '11': figma.helpers.react.array([
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
    'Option 11',
  ]),
  '12': figma.helpers.react.array([
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
    'Option 11',
    'Option 12',
  ]),
});

export default {
  id: 'CheckBoxGroup',
  imports: ["import { CheckBoxGroup } from 'grommet';"],
  example: figma.code`<CheckBoxGroup name="checkbox-group"${figma.helpers.react.renderProp(
    'disabled',
    disabled,
  )}${figma.helpers.react.renderProp('options', options)}/>`,
  metadata: { nestable: true },
};
