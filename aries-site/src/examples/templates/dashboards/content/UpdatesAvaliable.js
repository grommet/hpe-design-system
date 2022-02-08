import { useEffect, useState } from 'react';
import { NotificationItem, UpdatesFeed } from '../components';

const MOCK_DATA = require('../../../../data/mockData/firmware-bundles.json');

export const UpdatesAvaliable = () => {
  const data = MOCK_DATA['firmware-bundles'].items;
  const [updates, setUpdates] = useState([]);

  useEffect(() => {
    if (data) {
      const updateArray = [];
      const sortedDates = data.sort((a, b) => {
        const c = new Date(a.releaseDate);
        const d = new Date(b.releaseDate);
        return d - c;
      });
      const base = sortedDates.filter(updates => updates.type === 'base');
      const hotfix = sortedDates.filter(updates => updates.type === 'hotfix');
      updateArray.push(hotfix[0], base[0]);
      setUpdate(updateArray);
    }
  }, [data]);

  return (
    <UpdatesFeed background="validation-warning" title="Updates Available!">
      {update && (
        <NotificationItem
          items={update}
          defaultItemProps={{
            pad: { vertical: 'medium' },
          }}
          itemProps={{ 0: { border: 'bottom' } }}
        />
      )}
    </UpdatesFeed>
  );
};
