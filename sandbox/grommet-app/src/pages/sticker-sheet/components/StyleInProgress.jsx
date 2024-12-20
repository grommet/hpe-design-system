import { Notification } from 'grommet';

export const StyleInProgress = () => (
  <Notification
    status="warning"
    message="This component style is still being refined."
    margin={{ bottom: 'medium' }}
  />
);
