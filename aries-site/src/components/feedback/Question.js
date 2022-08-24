import React from 'react';
import PropTypes from 'prop-types';
import { FormField, TextArea, RadioButtonGroup, FileInput } from 'grommet';
import { StarRating } from './StarRating';
import { ThumbsRating } from './ThumbsRating';

export const Question = ({ label, inputProps, kind, name }) => {
  const accessibilityProps = {
    id: name,
    name,
  };

  let Input;
  if (kind === 'star') Input = StarRating;
  else if (kind === 'thumbs') Input = ThumbsRating;
  else if (kind === 'textArea') Input = TextArea;
  else if (kind === 'radioButtonGroup') Input = RadioButtonGroup;
  else if (kind === 'fileInput') Input = FileInput;

  if (kind === 'star' || kind === 'thumbs')
    return (
      <FormField
        contentProps={{
          border: false,
        }}
        label={label}
        name={name}
        htmlFor={name}
      >
        <Input {...accessibilityProps} {...inputProps} />
      </FormField>
    );

  return (
    <FormField label={label} name={name} htmlFor={name}>
      <Input {...accessibilityProps} {...inputProps} />
    </FormField>
  );
};

Question.propTypes = {
  label: PropTypes.string.isRequired,
  inputProps: PropTypes.object,
  kind: PropTypes.string,
  name: PropTypes.string.isRequired,
  primary: PropTypes.bool,
};
