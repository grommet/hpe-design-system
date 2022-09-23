import React from 'react';
import { Diagram, Grid, Stack } from 'grommet';
import { Answer, Destination, Question } from '../../../components';

const connection = (fromTarget, toTarget, { ...rest }) => ({
  fromTarget,
  toTarget,
  color: 'border',
  anchor: 'vertical',
  thickness: 'hair',
  type: 'rectilinear',
  ...rest,
});

export const FormPresentationDecisionTree = () => {
  const connections = [
    connection('question-1', 'answer-1'),
    connection('question-1', 'answer-2'),
    connection('answer-1', 'destination-2'),
    connection('answer-2', 'destination-1'),
    connection('destination-1', 'question-2'),
    connection('question-2', 'answer-4'),
    connection('question-2', 'answer-3'),
    connection('answer-4', 'destination-3'),
    connection('answer-3', 'question-3'),
    connection('question-3', 'answer-5'),
    connection('question-3', 'answer-6'),
    connection('answer-5', 'destination-4'),
    connection('answer-6', 'destination-5'),
  ];

  return (
    <Stack interactiveChild="first">
      <DecisionTree />
      <Diagram connections={connections} />
    </Stack>
  );
};

const columns = ['flex', 'flex'];
const rows = ['auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto'];
const areas = [
  ['question-1', 'null'],
  ['answer-2', 'answer-1'],
  ['destination-1', 'destination-2'],
  ['question-2', 'null-2'],
  ['answer-3', 'answer-4'],
  ['question-3', 'destination-3'],
  ['answer-5', 'answer-6'],
  ['destination-4', 'destination-5'],
];

const DecisionTree = () => (
  <Grid columns={columns} areas={areas} rows={rows} gap="large">
    <Question gridArea="question-1" id="question-1">
      Does the user want to return to their starting context or continue on
      their current path after completing the form?
    </Question>
    <Answer gridArea="answer-2" id="answer-2">
      Return to start
    </Answer>
    <Answer alignSelf="center" gridArea="answer-1" id="answer-1">
      Continue on new path
    </Answer>
    <Destination
      gridArea="destination-1"
      id="destination-1"
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
      gridArea="destination-2"
      id="destination-2"
      detail="A dedicated page allows for focused attention. Upon completion, 
  it can display the resulting data for review, further edits, and may 
  allow for other actions to be taken from or applied to the result. It 
  also provides the benefit that it may be linked to from multiple 
  locations or flows within an application."
      useCases={['Creating/editing an account, role, user, profile, etc.']}
    >
      Use a dedicated page.
    </Destination>
    <Question gridArea="question-2" id="question-2">
      Is there a need or benefit for the user to reference information on the
      current page?
    </Question>
    <Answer gridArea="answer-3" id="answer-3">
      No
    </Answer>
    <Answer alignSelf="center" gridArea="answer-4" id="answer-4">
      Yes
    </Answer>
    <Question gridArea="question-3" id="question-3">
      Is the form lengthy or benefit from being presented in multiple discrete
      steps?
    </Question>
    <Destination
      gridArea="destination-3"
      id="destination-3"
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
    <Answer gridArea="answer-5" id="answer-5">
      Yes
    </Answer>
    <Answer alignSelf="center" gridArea="answer-6" id="answer-6">
      No
    </Answer>
    <Destination
      gridArea="destination-4"
      id="destination-4"
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
      gridArea="destination-5"
      id="destination-5"
      detail={`If the form is brief, the center modal presentation draws 
  the user’s eye and presents the form task focussed and distraction free.`}
    >
      Use a centered modal.
    </Destination>
  </Grid>
);
