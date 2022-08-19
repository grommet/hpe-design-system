import React from 'react';
import PropTypes from 'prop-types';
import { Box, Paragraph, FormField, TextArea } from 'grommet';
import { StarRating } from './StarRating';
import { ThumbsRating } from './ThumbsRating';

export const Question = ({ label, inputProps, kind, name, primary }) => {
  let Input;
  const accessibilityProps = {
    id: name,
    name,
  };

  if (kind === 'star') Input = StarRating;
  else if (kind === 'thumbs') Input = ThumbsRating;
  else if (kind === 'textArea') Input = TextArea;
  if (primary)
    return (
      <Box>
        <Paragraph as="label" htmlFor={name} name={name}>
          {label}
        </Paragraph>
        <Input {...accessibilityProps} {...inputProps} />
      </Box>
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
