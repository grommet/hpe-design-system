import { Box, BoxProps, Button, Header, Heading } from 'grommet';
import { ContextControls } from './ContextControls';
import { Genie } from './Genie';
import { Help } from './Help';
import { Close } from 'grommet-icons/icons';
import { UserPreferences } from './UserPreferences';

interface ContextPaneProps extends BoxProps {
  title: string;
  contextContent?: string;
  setContextContent: (value: string) => void;
  contextControlRefs?: React.MutableRefObject<Record<string, HTMLButtonElement | null>>;
}

const sentenceCase = (str: string | number) => {
  let adjustedStr = str;
  if (typeof adjustedStr === 'number') adjustedStr = adjustedStr.toString();
  adjustedStr = adjustedStr.toLowerCase();
  return adjustedStr.charAt(0).toUpperCase() + adjustedStr.slice(1);
};

export const ContextPane = ({
  title,
  contextContent,
  setContextContent,
  contextControlRefs,
  ...rest
}: ContextPaneProps) => {
  if (!contextContent) return null;

  return (
    <Box width={{ min: 'small' }} {...rest}>
      <Header pad={{ vertical: '3xsmall', left: 'medium',right: 'xsmall' }}>
         <Heading level={2} size="small" margin="none">
          {sentenceCase(title)}
        </Heading>
        <Button
          a11yTitle="Close context pane"
          icon={<Close aria-hidden="true" />}
          onClick={() => {
            const previousContent = contextContent;
            setContextContent('');
            if (previousContent && contextControlRefs) {
              contextControlRefs.current[previousContent]?.focus();
            }
          }}
          size="small"
        />
      </Header>
      <Box pad={{ horizontal: 'medium', bottom: 'xsmall' }}>
        {contextContent === 'help' && <Help />}
        {contextContent === 'genie' && <Genie />}
        {contextContent === 'user-preferences' && <UserPreferences />}
      </Box>
    </Box>
  );
};
