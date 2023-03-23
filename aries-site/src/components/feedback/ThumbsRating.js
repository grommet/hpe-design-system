import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { RadioButtonGroup } from 'grommet';
import { Like, LikeFill, Dislike, DislikeFill } from 'grommet-icons';

export const ThumbsRating = ({ color, value, onChange, ...rest }) => {
  const [thumbs, setThumbs] = useState(value);

  return (
    <RadioButtonGroup
      direction="row"
      options={['1', '2']}
      value={thumbs}
      onChange={event => {
        setThumbs(event.target.value);
        if (onChange) onChange(event);
      }}
      {...rest}
    >
      {(option, { checked }) => {
        if (option === '1') {
          return checked ? <LikeFill color="brand" /> : <Like color="brand" />;
        }
        return checked ? (
          <DislikeFill color="brand" />
        ) : (
          <Dislike color="brand" />
        );
      }}
    </RadioButtonGroup>
  );
};

ThumbsRating.propTypes = {
  color: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
};
