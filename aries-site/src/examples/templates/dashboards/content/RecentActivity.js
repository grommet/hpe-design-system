import { useEffect, useState } from 'react';
import { Button } from 'grommet';
import { CircleInformation, FormNext } from 'grommet-icons';
import { Activity, ActivityFeed } from '../components';

const MOCK_DATA = require('../../../../data/mockData/activities.json');

const generateMessage = (type, count) => {
  let title = type;
  let message;
  switch (type) {
    case 'Device added':
      message =
        count === 1
          ? `${count} device was added.`
          : `${count} devices were added.`;
      break;
    case 'Firmware update':
      message =
        count === 1
          ? `A firmware update was applied to ${count} device.`
          : `A firmware update was applied to ${count} devices.`;
      break;
    case 'Firmware update failed':
      title = 'Firmware update unsuccessful';
      message =
        count === 1
          ? `Firmware update was unsuccessful for ${count} device.`
          : `Firmware update was unsuccessful for ${count} devices.`;
      break;
    case 'Power on':
      message =
        count === 1
          ? `${count} device was powered on.`
          : `${count} devices were powered on.`;
      break;
    case 'Power off':
      message =
        count === 1
          ? `${count} device was powered off.`
          : `${count} devices were powered off.`;
      break;
    case 'Reset':
      message =
        count === 1
          ? `${count} device was reset.`
          : `${count} devices were reset.`;
      break;
    case 'Activate':
      message =
        count === 1
          ? `${count} device was activated.`
          : `${count} devices were activated.`;
      break;

    default:
      break;
  }
  return { title, message };
};

export const RecentActivity = () => {
  const data = MOCK_DATA;
  const [activities, setActivities] = useState();

  // Group like activities and create activity summary
  useEffect(() => {
    if (data) {
      const nextActivities = data.activities.items.reduce(
        (previous, current) => {
          const { title, createdAt, selfUri } = current;
          const next = { ...previous };
          const count = previous[title]?.count + 1 || 1;
          let mostRecent = createdAt;
          let nextSelfUri = selfUri;

          if (Date(createdAt) < Date(previous[title]?.mostRecent)) {
            mostRecent = previous[title].mostRecent;
            nextSelfUri = previous[title].selfUri;
          }

          const { title: adjustedTitle, message } = generateMessage(
            title,
            count,
          );

          next[title] = {
            title: adjustedTitle,
            count,
            mostRecent,
            message,
            selfUri: nextSelfUri,
          };

          return next;
        },
        {},
      );

      setActivities(nextActivities);
    }
  }, [data]);

  return (
    <ActivityFeed title="Activity" footer={<FeedFooter />}>
      {activities &&
        Object.entries(activities)
          .sort((a, b) => {
            if (a[1].mostRecent > b[1].mostRecent) return -1;
            if (a[1].mostRecent < b[1].mostRecent) return 1;
            return 0;
          })
          .slice(0, 5)
          .map(([, activity]) => (
            <Activity
              key={activity.title}
              title={activity.title}
              icon={<CircleInformation size="small" />}
              message={activity.message}
              timestamp={activity.mostRecent}
              detailUrl={activity.selfUri}
            />
          ))}
    </ActivityFeed>
  );
};

const FeedFooter = () => (
  <Button
    label="View All"
    icon={<FormNext />}
    onClick={() => {
      // eslint-disable-next-line no-alert
      alert(`
Typically this would route to a view displaying all activities.
          `);
    }}
    reverse
  />
);
