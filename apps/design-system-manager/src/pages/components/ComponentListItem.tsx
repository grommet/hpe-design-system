import type { RecordModel } from 'pocketbase';
import { Box, Text } from 'grommet';
import { Next } from 'grommet-icons';
import { RoutedButton, TextEmphasis } from '../../components';

export const ComponentListItem = ({ component }: { component: RecordModel }) => {
  return (
    <RoutedButton
      a11yTitle={`View ${component.name}`}
      href={`/components/${component.id}`}
    >
      <Box
        direction="row"
        align="center"
        background="background-front"
        border={{
          side: 'bottom',
          color: 'border-weak'
        }}
        gap="small"
        pad={{ horizontal: 'medium', vertical: 'small' }}
        round="small"
        hoverIndicator
        onClick={() => { }}
      >
        <Box flex>
          <TextEmphasis>{component.name}</TextEmphasis>
          <Text size="small">{component.description}</Text>
        </Box>
        <Next color='brand' aria-hidden={true} />
      </Box>
    </RoutedButton>
  );
}