import { Button, Header, Heading } from 'grommet';
import { Close } from 'grommet-icons';

interface LayerHeaderProps {
  onClose: () => void;
}

export const LayerHeader = ({ onClose, ...rest }: LayerHeaderProps) => {
  return (
    <Header
      pad={{
        left: 'medium',
        right: 'xsmall',
        vertical: 'small',
      }}
      direction="row"
      align="center"
      justify="between"
    >
      <Heading level={2} margin="none">
        My menu's title
      </Heading>
      <Button
        icon={<Close aria-hidden={true} />}
        a11yTitle="Close navigation menu"
        onClick={onClose}
      />
    </Header>
  );
};
