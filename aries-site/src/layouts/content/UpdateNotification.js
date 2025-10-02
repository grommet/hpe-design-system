import PropTypes from 'prop-types';
import { Anchor, Text, Notification } from 'grommet';
import { useContext } from 'react';
import { ViewContext } from '../../pages/_app';

export const UpdateNotification = ({ name }) => {
  const { contentHistory } = useContext(ViewContext);
  const updateDate = contentHistory[name]?.date;

  if (contentHistory && name in contentHistory) {
    return (
      <Notification
        status="info"
        margin={{ bottom: 'medium' }}
        width="xlarge"
        message={
          contentHistory[name]?.changeKind === 'Update' ? (
            <Text>
              {`${contentHistory[name]?.description}    `}
              {contentHistory[name]?.action?.length > 1 && (
                <Anchor
                  label="Jump to section"
                  href={contentHistory[name]?.action}
                />
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
        }${Intl.DateTimeFormat(undefined, { dateStyle: 'long' }).format(
          new Date(updateDate),
        )}`}
      />
    );
  }
  return null;
};

UpdateNotification.propTypes = {
  name: PropTypes.string,
};
