import { useEffect, useState } from 'react';
import { ItemCountList } from '../components';

// eslint-disable-next-line max-len
const MOCK_FIRMWARE = require('../../../../data/mockData/firmware-bundles.json');
const MOCK_SERVERS = require('../../../../data/mockData/servers.json');

export const FirmwareBaselines = () => {
  const firmware = MOCK_FIRMWARE['firmware-bundles'].items;
  const servers = MOCK_SERVERS.servers.items;
  const [baselineCounts, setBaselineCounts] = useState();

  useEffect(() => {
    const nextbaselineCounts = [];

    if (firmware && servers) {
      Object.entries(firmware).forEach(([, baseline]) => {
        nextbaselineCounts.push({
          id: baseline.id,
          selfUri: baseline.selfUri,
          title: baseline.displayName,
          description: baseline.name,
          count: 0,
        });
      });

      servers.forEach(server => {
        const result = nextbaselineCounts.find(
          bundle => bundle.selfUri === server.firmwareBundleUri,
        );
        if (result) result.count += 1;
      });

      nextbaselineCounts.sort((a, b) => {
        if (a.title > b.title) return -1;
        if (a.title < b.title) return 1;
        return 0;
      });

      setBaselineCounts(nextbaselineCounts);
    }
  }, [firmware, servers]);

  console.log(baselineCounts);

  return (
    <ItemCountList
      title="Firmware Baselines"
      items={baselineCounts}
      menuItems={[
        { label: 'Move', onClick: () => {} },
        { label: 'Share', onClick: () => {} },
      ]}
      defaultItemProps={{
        pad: { vertical: 'small', right: 'small' },
      }}
    />
  );
};
