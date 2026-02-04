/* eslint-disable no-use-before-define */
import { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { AnnounceContext, Box, Button } from 'grommet';
import { ModalDialog } from '@shared/aries-core';
import { config, PowerOnFlow } from './PowerOnFlow';
import { TaskFlowFeedback } from './TaskFlowFeedback';

const showFeedback = () => {
  let result = false;
  // A check for whether the should be shown the feedback survey
  // could be implemented here. Solicitation of users' feedback
  // should respect users' time and be mindful to not over sample.

  // always returning true for demo purposes
  result = true;
  return result;
};

export const ModalTaskFlowExample = ({ containerRef }) => {
  // containerRef is for demonstration purposes on this site. Most
  // implementations should likely remove.
  const [showModal, setShowModal] = useState(true);
  // announce when the layer opens
  const announce = useContext(AnnounceContext);
  const flowTitle = config.title;
  const flowContent = (
    <PowerOnFlow
      onCancel={() => {
        announce('Power on device modal cancelled and closed.', 'assertive');
        setShowModal(false);
      }}
      onClose={() => {
        if (showFeedback()) {
          setTitle(feedbackTitle);
          setContents(feedbackContent);
        } else {
          setShowModal(false);
        }
      }}
    />
  );

  ModalTaskFlowExample.propTypes = {
    containerRef: PropTypes.shape({ current: PropTypes.any }),
  };

  const feedbackTitle = "We'd love your feedback";
  const feedbackContent = (
    <TaskFlowFeedback
      onClose={() => {
        setShowModal(false);
        setTitle(flowTitle);
        setContents(flowContent);
      }}
    />
  );
  const [title, setTitle] = useState(flowTitle);
  const [contents, setContents] = useState(flowContent);

  return (
    <Box align="center" justify="center" fill>
      <Button
        primary
        label="Power on device"
        onClick={() => {
          setShowModal(true);
        }}
      />
      {showModal && (
        <ModalDialog
          target={containerRef && containerRef.current}
          title={title}
          onEsc={() => {
            announce(
              'Power on device modal cancelled and closed.',
              'assertive',
            );
            setShowModal(false);
          }}
        >
          {contents}
        </ModalDialog>
      )}
    </Box>
  );
};
