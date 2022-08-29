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

  if (kind === 'star' || kind === 'thumbs')
    return (
      <FormField
        contentProps={{
          border: false,
        }}
        label={<Text>{label}</Text>}
        name={name}
        htmlFor={name}
      >
        <Input {...accessibilityProps} {...inputProps} />
      </FormField>
    );
  return (
    <FormField label={label} name={name} htmlFor={name}>
      <Text>
        <Input {...accessibilityProps} {...inputProps} />
      </Text>
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
