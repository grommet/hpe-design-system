import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { RadioButtonGroup } from 'grommet';
import { Star, StarOutline } from 'grommet-icons';

export const StarRating = ({ value, onChange, ...rest }) => {
  const [rating, setRating] = useState(value);

  const options = [];
  for (let i = 0; i < 5; i += 1) {
    options.push(i);
  }

  return (
    <RadioButtonGroup
      direction="row"
      options={options}
      value={rating}
      name="starRating"
      onChange={event => {
        const adjustedRating = parseInt(event.target.value, 10) + 1;
        setRating(adjustedRating);
      }}
      {...rest}
    >
      {option =>
        option < rating ? <Star color='green' /> : <StarOutline />
      }
    </RadioButtonGroup>
  );
};

StarRating.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.number,
};
