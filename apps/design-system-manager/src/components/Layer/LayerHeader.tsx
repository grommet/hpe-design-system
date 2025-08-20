import { Box, Button, Header, Heading, Paragraph } from 'grommet';
import { Close } from 'grommet-icons';

interface LayerHeaderProps {
  closeId?: string;
  title?: string;
  onClose?: () => void;
  subtitle?: string;
  [key: string]: unknown; // Allow additional props for flexibility
}

export const LayerHeader = ({
  closeId,
  title = 'Layer title',
  onClose,
  subtitle,
  ...rest
}: LayerHeaderProps) => (
  <Header flex={false} align="start" gap="small" justify="between" {...rest}>
    <Box>
      <Heading id="layer-title" level={2} margin="none">
        {title}
      </Heading>
      <Paragraph id="layer-subtitle" margin="none">
        {subtitle}
      </Paragraph>
    </Box>
    {onClose ? (
      <Button
        icon={<Close />}
        onClick={onClose}
        id={closeId}
        a11yTitle="Close modal"
      />
    ) : null}
  </Header>
);
