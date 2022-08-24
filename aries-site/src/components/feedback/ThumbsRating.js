import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { RadioButtonGroup } from 'grommet';
import { Like, LikeFill, Dislike, DislikeFill } from 'grommet-icons';

export const ThumbsRating = ({ color, value, onChange, ...rest }) => {
  const [thumbs, setThumbs] = useState(value);

  return (
    <RadioButtonGroup
      direction="row"
      options={['thumbsUp', 'thumbsDown']}
      value={thumbs}
      onChange={event => {
        setThumbs(event.target.value);
        if (onChange) onChange(event);
      }}
      {...rest}
    >
      {(option, { checked }) => {
        let Icon;
        if (option === 'thumbsUp' && !checked) Icon = Like;
        else if (option === 'thumbsUp' && checked) Icon = LikeFill;
        else if (option !== 'thumbsUp' && !checked) Icon = Dislike;
        else if (option !== 'thumbsUp' && checked) Icon = DislikeFill;
        return <Icon color="purple!" />;
      }}
    </RadioButtonGroup>
  );
};

ThumbsRating.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
};
