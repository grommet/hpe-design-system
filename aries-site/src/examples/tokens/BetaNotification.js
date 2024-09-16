import { Notification } from 'grommet';

export const BetaNotification = () => (
  <Notification
    message={`Design tokens are currently in beta testing. It's possible 
    that token names will have breaking changes in v1.`}
    width={{ max: 'large' }}
    margin={{ bottom: 'medium' }}
    status="warning"
  />
);
