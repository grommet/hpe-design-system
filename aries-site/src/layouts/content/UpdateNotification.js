import { Anchor, Text, Notification } from 'grommet';
import { CircleInformation } from 'grommet-icons';
import { ViewContext } from '../../pages/_app';
import { useContext } from 'react';

function InlineNotification({ dateText, message, updateDate }) {
  return (
    <Notification
      width="large"
      title={
        dateText +
        new Date(updateDate).toDateString().split(' ').slice(1).join(' ')
      }
      message={message}
      margin={{ bottom: 'medium' }}
      icon={<CircleInformation />}
    />
  );
}

export const UpdateNotification = ({ name }) => {
  const { contentHistory } = useContext(ViewContext) || undefined;
  const updateDate = contentHistory[name]?.date;

  if (contentHistory && name in contentHistory) {
    return (
      <InlineNotification
        dateText={
          contentHistory[name]?.changeKind === 'Update'
            ? 'Updated '
            : 'Added on '
        }
        message={
          contentHistory[name]?.changeKind === 'Update' ? (
            <Text>
              {contentHistory[name]?.description + '    '}
              {contentHistory[name]?.action?.length > 1 && (
                <Anchor label="Link" href={contentHistory[name]?.action} />
              )}
            </Text>
          ) : (
            <Text>
              This item is new. Let the Design System team know if you have any
              feedback.
            </Text>
          )
        }
        updateDate={updateDate}
      />
    );
  }
};
