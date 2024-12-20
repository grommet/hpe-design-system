import { Tab, Tabs } from 'grommet';
import { Compare } from '../../components';
import ContentPane from '../../../../components/ContentPane';

const TabsCompare = () => {
  return (
    <ContentPane>
      <Compare>
        <Tabs>
          <Tab title="Tab 1" active />
          <Tab title="Tab 2" />
          <Tab title="Tab 3 (disabled)" disabled />
          <Tab title="Tab 4" />
        </Tabs>
      </Compare>
    </ContentPane>
  );
};

export { TabsCompare as Tabs };
