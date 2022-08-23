import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { RadioButtonGroup } from 'grommet';
import { Star } from 'grommet-icons';

export const StarRating = ({ value, onChange, max = 5, ...rest }) => {
  const [rating, setRating] = useState(value);

  const options = [];
  for (let i = 0; i < max; i += 1) {
    options.push(i);
  }

  return (
    <RadioButtonGroup
      direction="row"
      options={options}
      value={rating}
      onChange={event => {
        const adjustedRating = parseInt(event.target.value, 10) + 1;
        setRating(adjustedRating);
        // const adjustedEvent = event;
        // adjustedEvent.target.value = adjustedRating;
        // if (onChange) onChange(adjustedEvent);
      }}
      {...rest}
    >
      {option => <Star color={option < rating ? 'green' : 'pink'} />}
    </RadioButtonGroup>
  );
};

StarRating.propTypes = {
  max: PropTypes.number,
  onChange: PropTypes.func,
  value: PropTypes.number,
};
