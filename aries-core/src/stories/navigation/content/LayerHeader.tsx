import { Button, Header, Heading } from 'grommet';
import { Close } from '@hpe-design/icons-grommet';

interface LayerHeaderProps {
  onClose: () => void;
  title: string;
}

export const LayerHeader = ({ onClose, title, ...rest }: LayerHeaderProps) => {
  return (
    <Header
      pad={{
        left: 'medium',
        right: '3xsmall',
        vertical: 'xsmall',
      }}
      direction="row"
      align="center"
      justify="between"
      {...rest}
    >
      <Heading level={2} margin="none">
        {title}
      </Heading>
      <Button
        icon={<Close aria-hidden={true} />}
        a11yTitle="Close navigation menu"
        onClick={onClose}
      />
    </Header>
  );
};
