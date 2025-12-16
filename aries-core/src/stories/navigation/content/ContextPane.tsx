import { Box, BoxProps, Button, Header, Heading } from 'grommet';
import { ContextControls } from './ContextControls';
import { Genie } from './Genie';
import { Help } from './Help';
import { Close } from 'grommet-icons/icons';

interface ContextPaneProps extends BoxProps {
  title: string;
  contextContent?: string;
  setContextContent: (value: string) => void;
}

const sentenceCase = (str: string | number) => {
  let adjustedStr = str;
  if (typeof adjustedStr === 'number') adjustedStr = adjustedStr.toString();
  adjustedStr = adjustedStr.toLowerCase();
  return adjustedStr.charAt(0).toUpperCase() + adjustedStr.slice(1);
}

export const ContextPane = ({
  title,
  contextContent,
  setContextContent,
  ...rest
}: ContextPaneProps) => {
  if (!contextContent) return null;

  return (
    <Box width={{min: 'small'}} {...rest}>
      <Header pad={{vertical: '3xsmall', horizontal: 'xsmall'}}>
        <ContextControls
          contextContent={contextContent}
          setContextContent={setContextContent}
        />
        <Button
          a11yTitle="Close context pane"
          icon={<Close aria-hidden="true" />}
          onClick={() => {
            setContextContent('');
          }}
          size='small'
        />
      </Header>
      <Box pad={{ horizontal: 'medium', vertical: 'xsmall' }}>
        <Heading level={2} size="small" margin="none">{sentenceCase(title)}</Heading>
        {contextContent === 'help' && <Help />}
        {contextContent === 'genie' && <Genie />}
      </Box>
    </Box>
  );
};
