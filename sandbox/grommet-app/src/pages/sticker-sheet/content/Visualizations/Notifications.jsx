import { Box, Notification } from 'grommet';
import { Compare } from '../../components';
import ContentPane from '../../../../components/ContentPane';

export const Notifications = () => {
  return (
    <ContentPane overflow="auto">
      <Box gap="medium">
        <Compare>
          <Notification
            status="critical"
            message="This is a critical notification. It should be used to alert the user of a critical issue."
            title="this is a title"
            width="large"
          />
        </Compare>
        <Compare>
          <Notification
            status="warning"
            message="This is a warning notification. It should be used to indicate caution to the user."
            title="this is a title"
            onClose={() => {}}
            width="large"
          />
        </Compare>
        <Compare>
          <Notification
            status="normal"
            message="This is a success notification. It should be used to inform the user of a successful action."
            title="this is a title"
            onClose={() => {}}
            width="large"
          />
        </Compare>
        <Compare>
          <Notification
            status="info"
            message="This is an information notification. It should be used for teriary information."
            title="this is a title"
            onClose={() => {}}
            width="large"
          />
        </Compare>
        <Compare>
          <Notification
            status="unknown"
            message="This is an unknown notification. It should be used when that status can't be inferred."
            title="this is a title"
            onClose={() => {}}
            width="large"
          />
        </Compare>
      </Box>
    </ContentPane>
  );
};
