import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import PropTypes from 'prop-types';
import {
  AnnounceContext,
  Box,
  Button,
  Form,
  Heading,
  Layer,
  Text,
} from 'grommet';
import { FormClose } from 'grommet-icons';

const Announcer = ({ announce, message, mode, role }) => {
  const theme = useContext(ThemeContext);
  announce(message, mode);
  return (
    <Text
      role={role}
      aria-live={mode}
      {...theme?.feedback?.success}
    >
      {message}
    </Text>
  );
};

const AnnounceContextComponent = props => (
  <AnnounceContext.Consumer>
    {announce => <Announcer announce={announce} {...props} />}
  </AnnounceContext.Consumer>
);

export const Feedback = ({
  children,
  isSuccessful,
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
      >
        <Box {...theme?.feedback?.body}>{children}</Box>
        {messages && !isSuccessful ? (
          <Box {...theme?.feedback?.footer}>
            <Button label={messages?.cancel || 'Cancel'} />
            <Button
              label={messages?.submit || 'Submit'}
              primary
              type="submit"
            />
          </Box>
        ) : (
          <Box {...theme?.feedback?.footer}>
            <AnnounceContextComponent
              mode="assertive"
              role="alert"
              message={messages?.successful || 'Thanks'}
            />
          </Box>
        )}
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
