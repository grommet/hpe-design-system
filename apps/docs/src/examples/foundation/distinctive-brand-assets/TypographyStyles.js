import { Box, Text } from 'grommet';

export const TypographyStyles = () => (
    <Box
      fill
      background={{ color: 'background-front', dark: false }}
      pad={{ vertical: '3xlarge' }}
    >
      <Box
        background={{
          image: 'purple-magenta-yellow',
          clip: 'text',
          rotate: 285,
        }}
        alignSelf="center"
        align="end"
      >
        <Text size="xxlarge" weight="bold" margin="none">
          Modernize
        </Text>
        <Text size="medium" margin="none">
          edge to cloud
        </Text>
      </Box>
    </Box>
  );
