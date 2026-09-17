import figma from '@figma/code-connect';
import { Spinner } from 'grommet';

const FIGMA_URL =
  'https://www.figma.com/design/HDckqS2MWhINfC8EIQPMV1/HPE-Design-System-Components-V2?node-id=2128-593&m=dev';

const sharedProps = {
  size: figma.enum('Size', {
    xSmall: 'xsmall',
    small: 'small',
    medium: 'medium',
    large: 'large',
    xLarge: 'xlarge',
  }),
};

figma.connect(Spinner, FIGMA_URL, {
  variant: { 'has Label': 'true' },
  props: sharedProps,
  example: ({ size }) => <Spinner size={size} message="Loading" />,
});

figma.connect(Spinner, FIGMA_URL, {
  variant: { 'has Label': 'false' },
  props: sharedProps,
  example: ({ size }) => <Spinner size={size} />,
});
