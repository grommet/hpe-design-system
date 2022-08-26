import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Form,
  Heading,
  Layer,
  Text,
  ResponsiveContext,
} from 'grommet';
import { FormClose } from 'grommet-icons';

export const Feedback = ({
  children,
  modal,
  onChange,
  onClose,
  onEsc,
  onSubmit,
  onReset,
  show,
  title,
  value,
  isSucessful,
}) => {
  const breakpoint = useContext(ResponsiveContext);

  let content = (
    <Box
      width={!['xsmall', 'small'].includes(breakpoint) ? 'medium' : undefined}
      pad="medium"
    >
      <Identifier onClose={onClose} title={title} modal={modal} />
      <Form
        value={value}
        onChange={onChange}
        onSubmit={onSubmit}
        onReset={onReset}
        method="post"
        validate="submit"
        // should we accept all form props ?
      >
        <Box gap="medium">
          {children}
          <Box direction="row" justify="end" gap="medium">
            {/* accept all box props ? */}
            {!isSucessful ? (
              <Box direction="row" gap="small">
                <Button
                  onClick={onClose}
                  label="Cancel"
                  a11yTitle="Cancel feedback submission"
                />
                <Button
                  label="Submit"
                  primary
                  type="submit"
                />
              </Box>
            ) : (
              <Text alignSelf="end" weight="bold">
                Thank You!
              </Text>
            )}
          </Box>
        </Box>
      </Form>
    </Box>
  );

  if (modal)
    content = show && (
      <Layer
        margin={{ vertical: 'xlarge', horizontal: 'medium' }}
        position={
          !['xsmall', 'small'].includes(breakpoint) ? 'bottom-right' : 'center'
        }
        modal={false}
        onEsc={onEsc}
      >
        {content}
      </Layer>
    );

  return content;
};

const Identifier = ({ onClose, title, modal }) => (
  <Box align="start" direction="row" justify="between">
    <Heading size="small" level={2} margin={{ vertical: 'none' }}>
      {title}
    </Heading>
    {modal && (
      <Button
        onClick={onClose}
        icon={<FormClose />}
        a11yTitle="Close Feedback Layer"
      />
    )}
  </Box>
);

Identifier.propTypes = {
  title: PropTypes.string,
  onClose: PropTypes.func,
};

Feedback.propTypes = {
  children: PropTypes.node,
  isSucessful: PropTypes.bool,
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
