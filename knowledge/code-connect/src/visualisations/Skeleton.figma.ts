// url=https://www.figma.com/design/HDckqS2MWhINfC8EIQPMV1/HPE-Design-System-Components-V2?node-id=11459-1660&m=dev
// source=https://github.com/grommet/grommet/blob/master/src/js/components/Skeleton/Skeleton.js
// component=Skeleton

import figma from 'figma';

// Branch per variant; no default, else first.

let template;
if (figma.selectedInstance.getPropertyValue('Shape') === 'rectangular') {
  template = {
    id: 'Skeleton',
    imports: ["import { Skeleton } from 'grommet';"],
    example: figma.code`<Skeleton round="xsmall" width="medium" height="small"/>`,
  };
} else if (figma.selectedInstance.getPropertyValue('Shape') === 'circular') {
  template = {
    id: 'Skeleton',
    imports: ["import { Skeleton } from 'grommet';"],
    example: figma.code`<Skeleton round="full" width="5xsmall" height="5xsmall"/>`,
  };
} else {
  template = {
    id: 'Skeleton',
    imports: ["import { Skeleton } from 'grommet';"],
    example: figma.code`<Skeleton round="full" width="5xsmall" height="5xsmall"/>`,
  };
}

export default template;
