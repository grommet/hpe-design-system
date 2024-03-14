import PropTypes from 'prop-types';
import { RadioButtonGroup, ThemeContext, Box } from 'grommet';

export const ToggleGroup = ({ options, value, setValue }) => {
  return (
    <ThemeContext.Extend
      value={{
        radioButton: {
          container: {
            extend: ``,
          },
          extend: ``,
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
        value={value}
        onChange={event =>
          setValue(event.target.value === 'true' ? true : false)
        }
      >
        {(option, { checked }) => {
          return (
            <Box
              background={checked ? 'active-background' : undefined}
              pad={{ horizontal: '9px', vertical: '9px' }}
              border={option.id < options.length - 1 && { side: 'right' }}
            >
              {option.label}
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
