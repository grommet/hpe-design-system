import { Box } from 'grommet';
import { ActiveMarker } from './ActiveMarker';

interface ItemContainerProps {
  active: boolean | undefined;
  children: React.ReactNode;
  gap?: string;
  hover: boolean;
  round?: string;
}

export const ItemContainer = ({
  active,
  children,
  gap = "3xsmall",
  hover,
  round = 'small',
  ...rest
}: ItemContainerProps) => {
  
  return (
    <Box
      direction="row"
      background={active ? 'background-active' : undefined}
      round={round}
      responsive={false}
      {...rest}
    >
      <Box
        direction="row"
        align="center"
        background={hover ? 'background-hover' : undefined}
        gap={gap}
        pad={{ 
          vertical: "3xsmall", // figma is using element tokens here which are not available in grommet-theme-hpe
          left: "3xsmall", // figma is using element tokens here which are not available in grommet-theme-hpe
          right: "xxsmall" // figma is using element tokens here which are not available in grommet-theme-hpe
        }}
        round={round}
        responsive={false}
        flex
      >
        <ActiveMarker active={active} hover={hover} />
        {children}
      </Box>
    </Box>
  );
};
