import { Menu } from 'grommet';
import ContentPane from '../../../../components/ContentPane';
import { Compare } from '../../components/Compare';

export const Menus = () => {
  return (
    <ContentPane>
      <Compare>
        <Menu label="Menu" items={[{ label: 'Item 1' }, { label: 'Item 2' }]} />
      </Compare>
      <Compare>
        <Menu
          label="Menu"
          items={[
            [{ label: 'Item 1' }, { label: 'Item 2' }],
            [{ label: 'Delete' }],
          ]}
        />
      </Compare>
      <Compare>
        <Menu
          label="Menu"
          kind="toolbar"
          items={[
            [{ label: 'Item 1' }, { label: 'Item 2' }],
            [{ label: 'Delete' }],
          ]}
        />
      </Compare>
    </ContentPane>
  );
};
