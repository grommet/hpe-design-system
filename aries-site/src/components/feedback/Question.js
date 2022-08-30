import React from 'react';
import PropTypes from 'prop-types';
import {
  FormField,
  TextArea,
  Text,
  RadioButtonGroup,
  FileInput,
} from 'grommet';
import { StarRating } from './StarRating';
import { ThumbsRating } from './ThumbsRating';

export const Question = ({ label, inputProps, kind, name }) => {
  const accessibilityProps = {
    id: name,
    name,
  };

  const formats = {
    star: StarRating,
    thumbs: ThumbsRating,
    textArea: TextArea,
    radioButtonGroup: RadioButtonGroup,
    fileInput: FileInput,
  };

  const Input = formats[kind];
  return (
    <FormField
      contentProps={{
        border: kind === 'star' || kind === 'thumbs' ? false : 'undefined',
      }}
      label={
        kind === 'star' || kind === 'thumbs' ? <Text>{label}</Text> : label
      }
      name={name}
      htmlFor={name}
    >
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
