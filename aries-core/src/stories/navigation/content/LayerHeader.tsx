import { Button, Header, Heading } from 'grommet';
import { Sidebar } from '@hpe-design/icons-grommet';

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
        active
        icon={<Sidebar aria-hidden={true} style={{ rotate: '180deg' }} />}
        a11yTitle="Close navigation menu"
        onClick={onClose}
      />
    </Header>
  );
};
