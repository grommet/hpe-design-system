import React from 'react';
import { Diagram, Grid, Stack } from 'grommet';
import { Answer, Decision, Destination } from '../../../components';

const connection = (fromTarget, toTarget, { ...rest }) => ({
  fromTarget,
  toTarget,
  label: 'link-5',
  color: 'border',
  anchor: 'vertical',
  thickness: 'hair',
  type: 'curved',
  ...rest,
});

export const FormPresentationDecisionTree = () => {
  const connections = [
    connection('return-or-continue', 'continue-on-new-path'),
    connection('return-or-continue', 'return-to-start'),
    connection('continue-on-new-path', 'dedicated-page'),
    connection('return-to-start', 'layer-path'),
    connection('layer-path', 'reference-needed'),
    connection('reference-needed', 'reference-yes'),
    connection('reference-needed', 'reference-no'),
    connection('reference-yes', 'side-drawer'),
    connection('reference-no', 'lengthy-form'),
    connection('lengthy-form', 'lengthy-yes'),
    connection('lengthy-form', 'lengthy-no'),
    connection('lengthy-yes', 'fullscree-layer'),
    connection('lengthy-no', 'centered-modal'),
  ];

  return (
    <Stack interactiveChild="first">
      <DecisionTree />
      <Diagram connections={connections} />
    </Stack>
  );
};

const columns = [
  'xxsmall',
  'xxsmall',
  'xxsmall',
  'xxsmall',
  'xxsmall',
  'xxsmall',
  'xxsmall',
  'xxsmall',
  'xxsmall',
  'xxsmall',
  'xxsmall',
  'xxsmall',
];
const rows = ['auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto'];
const areas = [
  [
    'null-0-0',
    'null-0-0',
    'null-0-0',
    'null-0-0',
    'return-or-continue',
    'return-or-continue',
    'return-or-continue',
    'return-or-continue',
    'null-0-2',
    'null-0-2',
    'null-0-2',
    'null-0-2',
  ],
  [
    'null-1-0',
    'null-1-0',
    'return-to-start',
    'return-to-start',
    'return-to-start',
    'return-to-start',
    'continue-on-new-path',
    'continue-on-new-path',
    'continue-on-new-path',
    'continue-on-new-path',
    'null-1-2',
    'null-1-2',
  ],
  [
    'null-2-0',
    'null-2-0',
    'layer-path',
    'layer-path',
    'layer-path',
    'layer-path',
    'dedicated-page',
    'dedicated-page',
    'dedicated-page',
    'dedicated-page',
    'null-2-2',
    'null-2-2',
  ],
  [
    'null-3-0',
    'null-3-0',
    'reference-needed',
    'reference-needed',
    'reference-needed',
    'reference-needed',
    'null-3-2',
    'null-3-2',
    'null-3-2',
    'null-3-2',
    'null-3-2',
    'null-3-2',
  ],
  [
    'reference-yes',
    'reference-yes',
    'reference-yes',
    'reference-yes',
    'reference-no',
    'reference-no',
    'reference-no',
    'reference-no',
    'null-4-2',
    'null-4-2',
    'null-4-2',
    'null-4-2',
  ],
  [
    'side-drawer',
    'side-drawer',
    'side-drawer',
    'side-drawer',
    'lengthy-form',
    'lengthy-form',
    'lengthy-form',
    'lengthy-form',
    'null-5-2',
    'null-5-2',
    'null-5-2',
    'null-5-2',
  ],
  [
    'null-6-0',
    'null-6-0',
    'lengthy-yes',
    'lengthy-yes',
    'lengthy-yes',
    'lengthy-yes',
    'lengthy-no',
    'lengthy-no',
    'lengthy-no',
    'lengthy-no',
    'null-6-2',
    'null-6-2',
  ],
  [
    'null-7-0',
    'null-7-0',
    'fullscree-layer',
    'fullscree-layer',
    'fullscree-layer',
    'fullscree-layer',
    'centered-modal',
    'centered-modal',
    'centered-modal',
    'centered-modal',
    'null-7-2',
    'null-7-2',
  ],
];

const DecisionTree = () => (
  <Grid
    columns={columns}
    areas={areas}
    rows={rows}
    gap="large"
    pad={{ vertical: 'medium' }}
  >
    <Decision gridArea="return-or-continue" id="return-or-continue">
      Does the user want to return to their starting context or continue on
      their current path after completing the form?
    </Decision>
    <Answer gridArea="return-to-start" id="return-to-start">
      Return to start
    </Answer>
    <Answer
      alignSelf="center"
      gridArea="continue-on-new-path"
      id="continue-on-new-path"
    >
      Continue on new path
    </Answer>
    <Destination
      gridArea="layer-path"
      id="layer-path"
      detail={`Because the user wants to return to their starting context, 
  presenting the form in a layer is useful because the layer is placed 
  atop the current page. When the form is completed, the layer closes 
  and reveals the starting page.`}
      useCases={[
        `Managing a group of objects which are part of a collection. 
  The user may be able to perform CRUD and/or other actions such as 
  triggering a process on the objects in that collection. After 
  completing the action, they want to return to the collection so that 
  they can review the updated state and or perform additional actions on 
  that collection.`,
      ]}
    >
      Use a layer. Which type?
    </Destination>
    <Destination
      gridArea="dedicated-page"
      id="dedicated-page"
      detail="A dedicated page allows for focused attention. Upon completion, 
  it can display the resulting data for review, further edits, and may 
  allow for other actions to be taken from or applied to the result. It 
  also provides the benefit that it may be linked to from multiple 
  locations or flows within an application."
      useCases={['Creating/editing an account, role, user, profile, etc.']}
    >
      Use a dedicated page.
    </Destination>
    <Decision gridArea="reference-needed" id="reference-needed">
      Is there a need or benefit for the user to reference information on the
      current page?
    </Decision>
    <Answer gridArea="reference-no" id="reference-no">
      No
    </Answer>
    <Answer alignSelf="center" gridArea="reference-yes" id="reference-yes">
      Yes
    </Answer>
    <Decision gridArea="lengthy-form" id="lengthy-form">
      Is the form lengthy or benefit from being presented in multiple discrete
      steps?
    </Decision>
    <Destination
      gridArea="side-drawer"
      id="side-drawer"
      detail="Using a side-drawer presents the form fixed to the edge of 
  the screen, allowing the content on the originating page to be visible 
  to the user as they complete the form."
      useCases={[
        `Creating or editing an object from a page displaying a data 
  collection, where it would be helpful to reference other objects and 
  their attributes in that collection.`,
      ]}
    >
      Use a side-drawer.
    </Destination>
    <Answer gridArea="lengthy-yes" id="lengthy-yes">
      Yes
    </Answer>
    <Answer alignSelf="center" gridArea="lengthy-no" id="lengthy-no">
      No
    </Answer>
    <Destination
      gridArea="fullscree-layer"
      id="fullscree-layer"
      detail={`The form may either be presented as a full-page form or as a 
  wizard. The advantage of presenting the layer in fullscreen mode is that 
  it allows the user’s attention to be solely focused on 
  the task at hand.`}
      useCases={[
        `Creating or editing an object with a lot of attributes to be set or 
    configured.`,
        'Progressive forms revealing inputs based on preceding values.',
        `Performing an action where decisions need to be made and reviewed 
    along the way (e.g. applying new firmware to a group of servers)`,
      ]}
    >
      Use a fullscreen layer.
    </Destination>
    <Destination
      gridArea="centered-modal"
      id="centered-modal"
      detail={`If the form is brief, the center modal presentation draws 
  the user’s eye and presents the form task focussed and distraction free.`}
    >
      Use a centered modal.
    </Destination>
  </Grid>
);
