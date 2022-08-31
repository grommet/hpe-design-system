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
    star: { render: StarRating, border: false },
    thumbs: { render: ThumbsRating, border: false },
    textArea: { render: TextArea },
    radioButtonGroup: { render: RadioButtonGroup },
    fileInput: { render: FileInput },
  };

  const Input = formats[kind].render;
  return (
    <FormField
      contentProps={{
        border: formats[kind].border ?? true,
      }}
      label={formats[kind].label || <Text>{label}</Text>}
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
