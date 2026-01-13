import { Button } from 'grommet';
import { AIGen, Help, User } from '@hpe-design/icons-grommet';
import { ButtonGroup } from '../../../js/components';

interface ContextControlsProps {
  contextContent?: string;
  setContextContent: (value: string) => void;
  contextControlRefs?: React.MutableRefObject<Record<string, HTMLButtonElement | null>>;
  [key: string]: unknown;
}

export const ContextControls = ({
  contextContent,
  setContextContent,
  contextControlRefs,
  ...rest
}: ContextControlsProps) => {
  return (
    <ButtonGroup {...rest}>
      <Button
        ref={(el) => {
          if (contextControlRefs) contextControlRefs.current['help'] = el;
        }}
        a11yTitle={
          contextContent === 'help' ? 'Hide help content' : 'Show help content'
        }
        icon={<Help aria-hidden={true} />}
        active={contextContent === 'help'}
        onClick={() =>
          setContextContent(contextContent === 'help' ? '' : 'help')
        }
        size="small"
      />
      <Button
        ref={(el) => {
          if (contextControlRefs) contextControlRefs.current['genie'] = el;
        }}
        a11yTitle={
          contextContent === 'genie'
            ? 'Hide genie content'
            : 'Show genie content'
        }
        icon={<AIGen aria-hidden={true} />}
        active={contextContent === 'genie'}
        onClick={() =>
          setContextContent(contextContent === 'genie' ? '' : 'genie')
        }
        size="small"
      />
      <Button
        ref={(el) => {
          if (contextControlRefs)
            contextControlRefs.current['user-preferences'] = el;
        }}
        a11yTitle={
          contextContent === 'user-preferences'
            ? 'Hide user preferences'
            : 'Show user preferences'
        }
        icon={<User aria-hidden={true} />}
        active={contextContent === 'user-preferences'}
        onClick={() =>
          setContextContent(
            contextContent === 'user-preferences' ? '' : 'user-preferences',
          )
        }
        size="small"
      />
    </ButtonGroup>
  );
};
