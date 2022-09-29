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
        let Icon;
        if (option === '1' && !checked) Icon = Like;
        else if (option === '1' && checked) Icon = LikeFill;
        else if (option !== '1' && !checked) Icon = Dislike;
        else if (option !== '1' && checked) Icon = DislikeFill;
        return <Icon color="purple!" />;
      }}
    </RadioButtonGroup>
  );
};

ThumbsRating.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
};
