import { Data, Heading } from 'grommet';
import { LevelType } from '@/utilities/types';
import { CardGroup } from './CollectionViews';

export const Collection = (
  {data, level}: {data: [], level: LevelType}
) => {
  return (
    <>
      <Heading level={level}>Manage</Heading>
      <Data data={data} toolbar >
        {/* <ComponentList /> */}
        <CardGroup />
      </Data>
    </>
  );
}