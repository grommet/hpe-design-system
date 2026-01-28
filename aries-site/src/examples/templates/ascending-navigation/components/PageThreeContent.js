/* eslint-disable react/prop-types */
import {  Markdown, Text } from 'grommet';


export const PageThreeContent = ({ onNavigate }) => (
  <>
    <Text weight="bold">To create this demo application:</Text>
    <Markdown>
      {`1. Create a React sandbox
          2. Install \`grommet\`, \`grommet-theme-hpe\`, \`@hpe-design/icons-grommet\`
          3. Replace your App.js with this template`}
    </Markdown>
  </>
);
