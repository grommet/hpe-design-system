import { Anchor, Text, Notification } from 'grommet';
import { ViewContext } from '../../pages/_app';
import { useContext } from 'react';

export const UpdateNotification = ({ name }) => {
  const { contentHistory } = useContext(ViewContext);
  const updateDate = contentHistory[name]?.date;

  if (contentHistory && name in contentHistory) {
    return (
      <Notification
        status="info"
        margin={{ bottom: 'medium' }}
        width="large"
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
        title={`${
          contentHistory[name]?.changeKind === 'Update'
            ? 'Updated '
            : 'Added on '
        } ${new Date(updateDate).toDateString().split(' ').slice(1).join(' ')}`}
      />
    );
  }
};
