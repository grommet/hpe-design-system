// url=https://www.figma.com/design/HDckqS2MWhINfC8EIQPMV1/HPE-Design-System-Components-V2?node-id=42874-916&m=dev
// source=https://github.com/grommet/grommet/blob/master/src/js/components/Notification/Notification.js
// component=Notification

import figma from 'figma';

const title = figma.selectedInstance.getBoolean('Title', {
  true: 'Title optional',
  false: undefined,
});
const onClose = figma.selectedInstance.getBoolean('onClose', {
  true: figma.helpers.react.function('() => {}'),
  false: undefined,
});
const actions = figma.selectedInstance.getBoolean('Actions', {
  true: figma.helpers.react.array([
    figma.helpers.react.object({ href: '#', label: 'Anchor' }),
  ]),
  false: undefined,
});
const status = figma.selectedInstance.getEnum('Status', {
  Warning: 'warning',
  Critical: 'critical',
  Info: 'info',
  Normal: 'normal',
  Unknown: 'unknown',
});
const global = figma.selectedInstance.getEnum('Kind', {
  Inline: false,
  Global: true,
  Toast: false,
});
const toast = figma.selectedInstance.getEnum('Kind', {
  Inline: false,
  Global: false,
  Toast: true,
});

export default {
  id: 'Notification',
  imports: ["import { Notification } from 'grommet';"],
  example: figma.code`<Notification${figma.helpers.react.renderProp(
    'title',
    title,
  )} message="Notifications provide timely, relevant information about task outcomes and system conditions."${figma.helpers.react.renderProp(
    'onClose',
    onClose,
  )}${figma.helpers.react.renderProp(
    'actions',
    actions,
  )}${figma.helpers.react.renderProp(
    'status',
    status,
  )}${figma.helpers.react.renderProp(
    'global',
    global,
  )}${figma.helpers.react.renderProp('toast', toast)}/>`,
  metadata: { nestable: true },
};
