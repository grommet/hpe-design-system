import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import PropTypes from 'prop-types';
import { Box, Button, Form, Heading, Layer, ResponsiveContext } from 'grommet';
import { FormClose } from 'grommet-icons';

export const Feedback = ({
  children,
  layerProps,
  messages,
  modal,
  onChange,
  onClose,
  onEsc,
  onSubmit,
  onReset,
  show,
  title,
  value,
}) => {
  const theme = useContext(ThemeContext);
  
  let content = (
    <Box {...theme?.feedback?.container}>
      <FeedbackHeader title={title}>
        {modal && (
          <Button
            onClick={onClose}
            icon={<FormClose />}
            autoFocus
            {...theme?.feedback?.button}
          />
        )}
      </FeedbackHeader>
      <Form
        value={value}
        onChange={onChange}
        onSubmit={onSubmit}
        onReset={onReset}
        method="post"
        validate="submit"
        // should we accept all form props?
      >
          <Box {...theme?.feedback?.body}>{children}</Box>
          <Box {...theme?.feedback?.footer}>{footerActions}</Box>
      </Form>
    </Box>
  );

  if (modal)
    content = show && (
      <Layer modal={false} onEsc={onEsc} {...layerProps}>
        {content}
      </Layer>
    );

  return content;
};

const FeedbackHeader = ({ children, title }) => {
  const theme = useContext(ThemeContext);
  return (
    <Box {...theme?.feedback?.header?.container}>
      <Heading {...theme?.feedback?.header}>{title}</Heading>
      {children}
    </Box>
  );
};

FeedbackHeader.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  onClose: PropTypes.func,
};

Feedback.propTypes = {
  children: PropTypes.node,
  modal: PropTypes.bool,
  onChange: PropTypes.func,
  onClose: PropTypes.func,
  onEsc: PropTypes.func,
  onSubmit: PropTypes.func,
  onReset: PropTypes.func,
  show: PropTypes.bool,
  title: PropTypes.string,
  value: PropTypes.object,
};
