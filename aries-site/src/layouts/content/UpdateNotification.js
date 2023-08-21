import { Anchor, Text, Notification } from 'grommet';
import { CircleInformation } from 'grommet-icons';
import { ViewContext } from '../../pages/_app';
import { useContext } from 'react';

export const UpdateNotification = ({ name }) => {
  const { wholeViewHistory } = useContext(ViewContext) || undefined;

  function InlineNotification({ dateText, message }) {
    return (
      <Notification
        width="large"
        title={
          dateText +
          new Date(wholeViewHistory[name]?.date)
            .toDateString()
            .split(' ')
            .slice(1)
            .join(' ')
        }
        message={message}
        margin={{ bottom: 'medium' }}
        icon={<CircleInformation />}
      />
    );
  }

  if (wholeViewHistory && name in wholeViewHistory) {
    return (
      <>
        {wholeViewHistory[name]?.type === 'Update' && (
          <InlineNotification
            dateText="Updated "
            message={
              <Text>
                {wholeViewHistory[name]?.description + '    '}
                {wholeViewHistory[name]?.action?.length > 1 && (
                  <Anchor label="Link" href={wholeViewHistory[name]?.action} />
                )}
              </Text>
            }
          />
        )}
        {wholeViewHistory[name]?.type === 'New' && (
          <InlineNotification
            dateText="Added on "
            message={
              <Text>
                This item is new. Let the Design System team know if you have
                any feedback.
              </Text>
            }
          />
        )}
      </>
    );
  }
};
