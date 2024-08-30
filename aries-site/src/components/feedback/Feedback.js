import React, { useContext, useEffect, useState } from 'react';
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
  // ResponsiveContext,
} from 'grommet';
import { Close } from 'grommet-icons/icons/Close';

const Announcer = ({ announce, message, mode, role }) => {
  const theme = useContext(ThemeContext);
  announce(message, mode);
  return (
    <Text role={role} aria-live={mode} {...theme?.feedback?.success}>
      {message}
    </Text>
  );
};

Announcer.propTypes = {
  announce: PropTypes.func,
  message: PropTypes.string,
  mode: PropTypes.string,
  role: PropTypes.string,
};

const AnnounceContextComponent = props => (
  <AnnounceContext.Consumer>
    {announce => <Announcer announce={announce} {...props} />}
  </AnnounceContext.Consumer>
);

export const Feedback = ({
  children,
  layerProps,
  messages,
  modal,
  onClose,
  onSubmit,
  show,
  title,
}) => {
  const theme = useContext(ThemeContext);
  // const breakpoint = useContext(ResponsiveContext);
  // tracks if feedback has successfully been submitted
  const [successfulSubmit, setSuccessfulSubmit] = useState(false);

  useEffect(() => {
    if (show) setSuccessfulSubmit(false);
  }, [show]);

  let footerContent;
  if (!successfulSubmit) {
    footerContent = (
      <Box {...theme?.feedback?.footer}>
        <Button label={messages?.submit || 'Submit'} primary type="submit" />
        <Button onClick={onClose} label={messages?.cancel || 'Cancel'} />
      </Box>
    );
  } else
    footerContent = (
      <Box {...theme?.feedback?.footer}>
        <AnnounceContextComponent
          mode="assertive"
          role="alert"
          message={messages?.successful || 'Thank you!'}
        />
      </Box>
    );

  let content = (
    <Box {...theme?.feedback?.container}>
      <FeedbackHeader title={title}>
        {modal && (
          <Button
            a11yTitle="Close"
            onClick={onClose}
            icon={<Close />}
            autoFocus
            {...theme?.feedback?.closeButton}
          />
        )}
      </FeedbackHeader>
      <Form
        onSubmit={event => {
          onSubmit(event);
          setSuccessfulSubmit(true);
        }}
        method="post"
        validate="submit"
      >
        <Box {...theme?.feedback?.body}>{children}</Box>
        {footerContent}
      </Form>
    </Box>
  );

  if (modal)
    content = show && (
      <Layer
        position="center"
        margin={{ vertical: 'xlarge', horizontal: 'medium' }}
        modal
        onEsc={onClose}
        {...layerProps}
      >
        {content}
      </Layer>
    );

  return content;
};

const FeedbackHeader = ({ children, title }) => {
  const theme = useContext(ThemeContext);
  return (
    <Box {...theme?.feedback?.header} gap="small">
      <Heading {...theme?.feedback?.heading}>{title}</Heading>
      {children}
    </Box>
  );
};

FeedbackHeader.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
};

Feedback.propTypes = {
  children: PropTypes.node,
  layerProps: PropTypes.shape({}),
  messages: PropTypes.object,
  modal: PropTypes.bool,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
  show: PropTypes.bool,
  title: PropTypes.string,
};
