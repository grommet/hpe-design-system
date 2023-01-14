import { useContext, useEffect, useState } from 'react';
import { AnnounceContext, Box, Button } from 'grommet';
import { ModalDialog } from '../../ModalDialog';
import { config, PowerOnFlow } from './PowerOnFlow';
import { TaskFlowFeedback } from './TaskFlowFeedback';

export const ModalTaskFlowExample = ({ containerRef }) => {
  // containerRef is for demonstration purposes on this site. Most
  // implementations should likely remove.
  const [showModal, setShowModal] = useState(true);
  const [showFeedback, setShowFeedback] = useState(false);
  // announce when the layer opens
  const announce = useContext(AnnounceContext);
  const defaultTitle = config.title;
  const defaultContent = (
    <PowerOnFlow
      onCancel={() => {
        announce(`Power on device modal cancelled and closed.`, 'assertive');
        setShowModal(false);
      }}
      onClose={() => {
        setShowFeedback(true);
      }}
    />
  );
  const [title, setTitle] = useState(defaultTitle);
  const [contents, setContents] = useState(defaultContent);

  // set modal contents
  useEffect(() => {
    let nextTitle = defaultTitle;
    let nextContents = defaultContent;

    if (showFeedback) {
      nextTitle = `We'd love your feedback`;
      nextContents = (
        <TaskFlowFeedback
          onClose={() => {
            setShowFeedback(false);
            setShowModal(false);
          }}
        />
      );
    }

    setTitle(nextTitle);
    setContents(nextContents);
  }, [showFeedback]);

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
              `Power on device modal cancelled and closed.`,
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
