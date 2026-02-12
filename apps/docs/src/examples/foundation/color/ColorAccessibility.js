import { Box, Text } from 'grommet';

import { ColorCompliance } from '../../../components';
import { greenDark, greenDarkLarge, greenLight } from '../../../data';

export const LightModeContrast = () => (
  <Box direction="row-responsive" gap="medium">
    <ColorCompliance
      color={{ color: 'decorative-green', dark: false }}
      data={greenLight}
    >
      <Text color="text-strong">
        This text is default size, default weight, and color text-strong.
      </Text>
    </ColorCompliance>
    <ColorCompliance
      color={{ color: 'decorative-green', dark: false }}
      data={greenLight}
    >
      <Text color="text-strong" size="small" weight="bold">
        This text is size small, bold weight, and color text-strong.
      </Text>
    </ColorCompliance>
  </Box>
);

export const DarkModeContrast = () => (
  <Box direction="row-responsive" gap="medium">
    <ColorCompliance
      color={{ color: 'decorative-green', dark: true }}
      data={greenDark}
    >
      <Text color="text-strong">
        This text is default size, default weight, and color text-strong.
      </Text>
    </ColorCompliance>
    <ColorCompliance
      color={{ color: 'decorative-green', dark: true }}
      data={greenDarkLarge}
    >
      <Text color="text-strong" size="large" weight="bold">
        This text is size large, bold weight, and color text-strong.
      </Text>
    </ColorCompliance>
  </Box>
);
