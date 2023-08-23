import { Tag } from 'grommet';

export const NotificationTag = ({ backgroundColor, ...rest }) => {
  return (
    <Tag
      border={{
        color: 'border-weak',
        size: 'xsmall',
        style: 'solid',
        side: 'all',
      }}
      background={{ dark: true, color: backgroundColor }}
      {...rest}
    />
  );
};
