import { Data } from 'grommet';
import type { LevelType } from '@/utilities/types';
import { Pane } from '../../components/Pane.tsx';
import { CardGroup } from './CollectionViews.tsx';

export const Collection = (
  {data, level}: {data: [], level: LevelType}
) => {
  return (
    <Pane heading="Manage" level={level}>
      <Data data={data} toolbar >
        {/* <ComponentList /> */}
        <CardGroup level={level + 1} />        
      </Data>
    </Pane>
  );
}