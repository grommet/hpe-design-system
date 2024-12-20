import { Box, Notification } from 'grommet';
import { Compare } from '../../components';
import ContentPane from '../../../../components/ContentPane';

export const Notifications = () => {
  return (
    <ContentPane>
      <Box gap="medium">
        <Compare>
          <Notification
            status="critical"
            message="this is a message"
            title="this is a title"
          />
        </Compare>
        <Compare>
          <Notification
            status="warning"
            message="this is a message"
            title="this is a title"
            onClose={() => {}}
          />
        </Compare>
        <Compare>
          <Notification
            status="normal"
            message="this is a message"
            title="this is a title"
            onClose={() => {}}
          />
        </Compare>
        <Compare>
          <Notification
            status="info"
            message="this is a message"
            title="this is a title"
            onClose={() => {}}
          />
        </Compare>
        <Compare>
          <Notification
            status="unknown"
            message="this is a message"
            title="this is a title"
            onClose={() => {}}
          />
        </Compare>
      </Box>
    </ContentPane>
  );
};
