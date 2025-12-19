import { Button, Header, Text } from 'grommet';
import { AIGen, Help } from '@hpe-design/icons-grommet';
import { ButtonGroup } from '../../../js/components';

interface AppHeaderProps {
  contextContent: string;
  setContextContent: (content: string) => void;
  setActiveItem: (item: string) => void;
  [key: string]: unknown; // For additional props like 'background', 'pad', etc.
}

export const AppHeader = ({
  contextContent,
  setContextContent,
  setActiveItem,
  ...rest
}: AppHeaderProps) => {
  return (
    <Header pad="xsmall" {...rest}>
      <Button onClick={() => setActiveItem('Home')} plain>
        <Text>
          <Text weight="bold">HPE</Text> Design System
        </Text>
      </Button>
      <ButtonGroup>
        <Button
          a11yTitle="Toggle help content"
          icon={<Help aria-hidden={true} />}
          active={contextContent === 'help'}
          onClick={() =>
            setContextContent(contextContent === 'help' ? '' : 'help')
          }
        />
        <Button
          a11yTitle="Toggle genie content"
          icon={<AIGen aria-hidden={true} />}
          active={contextContent === 'genie'}
          onClick={() =>
            setContextContent(contextContent === 'genie' ? '' : 'genie')
          }
        />
      </ButtonGroup>
    </Header>
  );
};
