import { Fragment, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, List, Text, ThemeContext } from 'grommet';

// apply rounding to Button corners by wrapping in Box
const LegendButton = ({ ...rest }) => (
  <Box round="xxsmall" overflow="hidden">
    <Button hoverIndicator {...rest} />
  </Box>
);
export const Legend = ({ mode, onClick, values, ...rest }) => {
  const [active, setActive] = useState();
  const theme = useContext(ThemeContext);
  const size = theme.global.edgeSize.small;

  const Wrapper = onClick ? LegendButton : Fragment;

  return (
    <List
      data={values}
      defaultItemProps={{ pad: { vertical: !onClick ? 'xxsmall' : 'none' } }}
      {...rest}
    >
      {datum => (
        <Wrapper
          {...(onClick
            ? {
                onClick: () => {
                  onClick(datum);
                  setActive(active !== datum ? datum : undefined);
                },
                active: active === datum,
              }
            : {})}
        >
          <Box
            direction="row"
            gap="small"
            justify="between"
            pad={
              onClick
                ? { horizontal: 'xsmall', vertical: 'xxsmall' }
                : undefined
            }
          >
            <Box direction="row" align="center" gap="xsmall">
              <Box background={datum.color} height={size} width={size} round />
              <Text>{datum.label}</Text>
            </Box>
            {mode !== 'compact' && <Text>{datum.displayValue}</Text>}
          </Box>
        </Wrapper>
      )}
    </List>
  );
};

Legend.propTypes = {
  mode: PropTypes.oneOf(['compact']),
  onClick: PropTypes.func,
  values: PropTypes.arrayOf(PropTypes.object),
};
