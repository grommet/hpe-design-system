import { Button, Header, Text } from 'grommet';
import { AIGen, Help } from '@hpe-design/icons-grommet';
import { ButtonGroup } from '../../../js/components';
import { ContextControls } from './ContextControls';

interface AppHeaderProps {
  contextContent?: string;
  setContextContent: (value: string) => void;
  setActiveItem: (value: string) => void;
  [key: string]: unknown; // For additional props like 'background', 'pad', etc.
}

export const AppHeader = ({ contextContent, setContextContent, setActiveItem, ...rest }: AppHeaderProps) => {

  return (
    <Header height={{min: '5xsmall'}} pad={{horizontal: 'medium', vertical: '3xsmall'}} {...rest}>
      <Button onClick={() => setActiveItem('Home')} plain>
        <Text>
          <Text weight="bold">HPE</Text> Design System
        </Text>
      </Button>
      {contextContent === '' && <ContextControls
        contextContent={contextContent}
        setContextContent={setContextContent}
      />}
    </Header>
  );
};
