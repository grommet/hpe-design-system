import PropTypes from 'prop-types';
import { ThemeContext as SCThemeContext } from 'styled-components';
import { RadioButtonGroup, Box, Text } from 'grommet';
import { useContext } from 'react';
import { ThemeContext } from 'grommet/contexts/ThemeContext/ThemeContext';

export const ToggleGroup = ({ options, value, setValue, ...rest }) => {
  const theme = useContext(SCThemeContext);
  return (
    <ThemeContext.Extend
      value={{
        radioButton: {
          container: {
            extend: `
              flex-grow: 1;
            `,
          },
          extend: `
          flex-grow: 1;
        `,
        },
      }}
    >
      <RadioButtonGroup
        name="radio"
        direction="row"
        margin="none"
        options={options}
        border
        round="6px"
        overflow="hidden"
        value={value}
        onChange={event =>
          setValue(event.target.value === 'true' ? true : false)
        }
        {...rest}
      >
        {(option, { checked }) => {
          return (
            <Box
              background={checked ? 'active-background' : undefined}
              pad={
                typeof option?.label === 'string'
                  ? { ...theme?.button?.size?.medium?.toolbar?.pad }
                  : { horizontal: '9px', vertical: '9px' }
              }
              border={option?.id < options?.length - 1 && { side: 'right' }}
              fill="horizontal"
              align="center"
            >
              {typeof option?.label === 'string' ? (
                <Text
                  {...theme?.button?.default.font}
                  {...theme?.button?.default.color}
                >
                  {option?.label}
                </Text>
              ) : (
                option?.label
              )}
            </Box>
          );
        }}
      </RadioButtonGroup>
    </ThemeContext.Extend>
  );
};

ToggleGroup.propTypes = {
  options: PropTypes.array,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.bool,
  ]),
  setValue: PropTypes.func,
};
