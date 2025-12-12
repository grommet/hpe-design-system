import { Box, Button } from 'grommet';
import { AIGen, Help } from '@hpe-design/icons-grommet';
import { ButtonGroup } from '../../../js/components';

export const ContextControls = ({ contextContent, setContextContent, ...rest }: { contextContent?: string; setContextContent: (value: string) => void; [key: string]: unknown; }) => {
  return (
    <ButtonGroup {...rest}>
      <Button
        a11yTitle="Show help content"
        icon={<Help aria-hidden={true} />}
        active={contextContent === 'help'}
        onClick={() =>
          setContextContent(contextContent === 'help' ? '' : 'help')
        }
      />
      <Button
        a11yTitle="Show genie content"
        icon={<AIGen aria-hidden={true} />}
        active={contextContent === 'genie'}
        onClick={() =>
          setContextContent(contextContent === 'genie' ? '' : 'genie')
        }
      />
    </ButtonGroup>
  );
};