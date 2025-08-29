import { Box } from 'grommet';

interface ActiveMarkerProps {
  active: boolean | undefined;
  hover: boolean | undefined;
}

export const ActiveMarker = ({ active, hover }: ActiveMarkerProps) => {
  return (
    <Box
      background={
        active
          ? hover
            ? 'background-primary-strong-hover'
            : 'background-primary-strong'
          : undefined
      }
      fill="vertical"
      pad={{ left: '4px' }}
      round
    />
  );
};
