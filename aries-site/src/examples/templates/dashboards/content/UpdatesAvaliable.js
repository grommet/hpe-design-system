import { useEffect, useState } from 'react';
import { UpdatesFeed, UpdateNotifications } from '../components';

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
      const base = sortedDates.filter(update => update.type === 'base');
      const hotfix = sortedDates.filter(update => update.type === 'hotfix');
      updateArray.push(hotfix[0], base[0]);
      setUpdates(updateArray);
    }
  }, [data]);

  return (
    <UpdatesFeed
      menuItems={[
        { label: 'Move', onClick: () => {} },
        { label: 'Share', onClick: () => {} },
      ]}
      background="validation-warning"
      title="Updates Available!"
    >
      {updates && (
        <UpdateNotifications
          items={updates}
          defaultItemProps={{
            pad: { vertical: 'medium' },
          }}
          itemProps={{ 0: { border: 'bottom' } }}
        />
      )}
    </UpdatesFeed>
  );
};
