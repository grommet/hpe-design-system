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
  ResponsiveContext,
} from 'grommet';
import { FormClose } from 'grommet-icons';

const Announcer = ({ announce, message, mode, role }) => {
  const theme = useContext(ThemeContext);
  announce(message, mode);
  return (
    <Text role={role} aria-live={mode} {...theme?.feedback?.success}>
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
  layerProps,
  messages,
  modal,
  onChange,
  onClose,
  onSubmit,
  show,
  title,
  value,
}) => {
  const theme = useContext(ThemeContext);
  const breakpoint = useContext(ResponsiveContext);
  // tracks if feedback has successfully been submitted
  const [successfulSubmit, setSuccessfulSubmit] = useState(false);

  useEffect(() => {
    setSuccessfulSubmit(false);
  }, [show]);

  let footerContent;
  if (!successfulSubmit) {
    footerContent = (
      <Box {...theme?.feedback?.footer}>
        <Button onClick={onClose} label={messages?.cancel || 'Cancel'} />
        <Button label={messages?.submit || 'Submit'} primary type="submit" />
      </Box>
    );
  } else
    footerContent = (
      <Box {...theme?.feedback?.footer}>
        <AnnounceContextComponent
          mode="assertive"
          role="alert"
          message={messages?.successful || 'Thanks'}
        />
      </Box>
    );

  let content = (
    <Box {...theme?.feedback?.container}>
      <FeedbackHeader title={title}>
        {modal && (
          <Button
            onClick={onClose}
            icon={<FormClose />}
            autoFocus
            {...theme?.feedback?.closeButton}
          />
        )}
      </FeedbackHeader>
      <Form
        value={value}
        onChange={onChange}
        onSubmit={onSubmit}
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
        position={
          !['xsmall', 'small'].includes(breakpoint) ? 'bottom-right' : 'center'
        }
        margin={{ vertical: 'xlarge', horizontal: 'medium' }}
        modal={false}
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
    <Box {...theme?.feedback?.header}>
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
