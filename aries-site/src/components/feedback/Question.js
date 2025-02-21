import React from 'react';
import PropTypes from 'prop-types';
import {
  FileInput,
  FormField,
  RadioButtonGroup,
  StarRating,
  ThumbsRating,
  TextArea,
  Text,
  TextInput,
} from 'grommet';

export const Question = ({ formProps, label, inputProps, kind, name }) => {
  const accessibilityProps = {
    id: name,
    name,
  };

  const formats = {
    star: {
      render: StarRating,
      border: false,
      label: <Text>{label}</Text>,
    },
    thumbs: {
      render: ThumbsRating,
      border: false,
      label: <Text>{label}</Text>,
    },
    textArea: { render: TextArea },
    textInput: { render: TextInput },
    radioButtonGroup: { render: RadioButtonGroup },
    fileInput: { render: FileInput },
  };

  const Input = formats[kind].render;
  return (
    // https://github.com/grommet/eslint-plugin-grommet/issues/48
    // eslint-disable-next-line max-len
    // eslint-disable-next-line grommet/formfield-htmlfor-id, grommet/formfield-name
    <FormField
      contentProps={{
        border: formats[kind].border ?? true,
      }}
      label={formats[kind].label || <Text>{label}</Text>}
      name={name}
      htmlFor={name}
      {...formProps}
    >
      <Input {...accessibilityProps} {...inputProps} />
    </FormField>
  );
};

Question.propTypes = {
  formProps: PropTypes.shape({}),
  label: PropTypes.string.isRequired,
  inputProps: PropTypes.object,
  kind: PropTypes.string,
  name: PropTypes.string.isRequired,
  primary: PropTypes.bool,
};
