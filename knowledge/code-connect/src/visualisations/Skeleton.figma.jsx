import figma from '@figma/code-connect';
import { Skeleton } from 'grommet';

const FIGMA_URL =
  'https://www.figma.com/design/HDckqS2MWhINfC8EIQPMV1/HPE-Design-System-Components-V2?node-id=11459-1660&m=dev';

figma.connect(Skeleton, FIGMA_URL, {
  variant: { Shape: 'rectangular' },
  example: () => <Skeleton round="xsmall" width="medium" height="small" />,
});

figma.connect(Skeleton, FIGMA_URL, {
  variant: { Shape: 'circular' },
  example: () => <Skeleton round="full" width="5xsmall" height="5xsmall" />,
});
