import { Box } from 'grommet';
import { ActiveMarker } from './ActiveMarker';

interface ItemContainerProps {
  active: boolean | undefined;
  children: React.ReactNode;
  gap?: string;
  hover: boolean;
}

export const ItemContainer = ({
  active,
  children,
  gap = "3xsmall",
  hover,
  ...rest
}: ItemContainerProps) => {
  return (
    <Box
      direction="row"
      background={active ? 'background-active' : undefined}
      round="xsmall"
      responsive={false}
      {...rest}
    >
      <Box
        direction="row"
        align="center"
        background={hover ? 'background-hover' : undefined}
        gap={gap}
        pad={{ vertical: "3xsmall", left: "3xsmall", right: "xsmall" }}
        round="xsmall"
        responsive={false}
        flex
      >
        <ActiveMarker active={active} hover={hover} />
        {children}
      </Box>
    </Box>
  );
};
