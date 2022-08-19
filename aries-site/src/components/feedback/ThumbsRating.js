import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { RadioButtonGroup } from 'grommet';
import { Like, Dislike } from 'grommet-icons';

export const ThumbsRating = ({ value, onChange, ...rest }) => {
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
        const Icon = option === 'thumbsUp' ? Like : Dislike;
        return <Icon color={checked ? 'green' : 'border-strong'} />;
      }}
    </RadioButtonGroup>
  );
};

ThumbsRating.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
};
