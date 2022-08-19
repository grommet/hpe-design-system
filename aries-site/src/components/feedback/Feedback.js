import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Form,
  Heading,
  Header,
  Layer,
  ResponsiveContext,
} from 'grommet';
import { FormClose } from 'grommet-icons';

export const Feedback = ({
  children,
  modal,
  onChange,
  onClickOutside,
  onEsc,
  onReset,
  onSubmit,
  show: showProp,
  title,
  value,
}) => {
  const size = useContext(ResponsiveContext);
  const [show, setShow] = useState(showProp);

  useEffect(() => {
    if (showProp) setShow(true);
  }, [showProp]);

  const onClose = () => {
    setShow(false);
    if (onClickOutside) onClickOutside();
  };

  let content = (
    <Box
      overflow="auto"
      width={!['xsmall', 'small'].includes(size) ? 'medium' : undefined}
      pad="medium"
    >
      <FeedbackHeader onClick={onClose} title={title} modal={modal} />
      <Form
        value={value}
        onChange={onChange}
        onSubmit={onSubmit}
        method="post"
        validate="submit"
      >
        {children}
        <Box
          align="center"
          justify="end"
          gap="small"
          direction="row"
          pad={{ top: 'medium' }}
        >
          <Button
            onClick={onClose}
            label="Cancel"
            type="reset"
            onReset={onReset}
          />
          <Button label="Submit" primary type="submit" />
        </Box>
      </Form>
    </Box>
  );

  if (modal)
    content = show && (
      <Layer
        margin={{ vertical: 'xlarge', horizontal: 'medium' }}
        position="bottom-right"
        modal={modal}
        onClickOutside={onClose}
        onEsc={onEsc}
      >
        {content}
      </Layer>
    );

  return content;
};

const FeedbackHeader = ({ onClick, title, modal }) => (
  <Header>
    <Heading level={4} size="small" margin={{ vertical: 'none' }}>
      {title}
    </Heading>
    {modal && (
      <Box justify="center">
        <Button onClick={onClick} icon={<FormClose />} />
      </Box>
    )}
  </Header>
);

FeedbackHeader.propTypes = {
  modal: PropTypes.bool,
  title: PropTypes.string,
  onClick: PropTypes.func,
};

Feedback.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf([PropTypes.element]),
  ]),
  modal: PropTypes.bool,
  onChange: PropTypes.func,
  onClickOutside: PropTypes.func,
  onEsc: PropTypes.func,
  onSubmit: PropTypes.func,
  onReset: PropTypes.func,
  show: PropTypes.bool,
  title: PropTypes.string,
  value: PropTypes.object,
};
