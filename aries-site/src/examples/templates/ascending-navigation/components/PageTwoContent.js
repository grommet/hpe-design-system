/* eslint-disable react/prop-types */
import { Markdown, Text } from 'grommet';

export const PageTwoContent = () => (
  <>
    <Text weight="bold">Components in use in this example:</Text>
    <Markdown>
      {`- \`Page\`, \`PageContent\`, \`PageHeader\`
      - \`Box\`, \`Header\`, \`Nav\`, \`Button\`  
      - \`Text\`, \`Paragraph\`, \`Anchor\``}
    </Markdown>
  </>
);
