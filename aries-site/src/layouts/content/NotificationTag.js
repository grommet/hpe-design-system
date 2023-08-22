import { Tag } from 'grommet';

export const NotificationTag = ({ size, color, ...rest }) => {
  return (
    <Tag
      size={size}
      border={{
        color: 'border-weak',
        size: 'xsmall',
        style: 'solid',
        side: 'all',
      }}
      background={{ dark: true, color: color }}
      {...rest}
    />
  );
};
