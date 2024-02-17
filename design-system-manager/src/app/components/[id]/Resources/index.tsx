import type { LevelType } from '@/utilities/types';
import { getResources } from '../actions.ts';
import { Editable } from './Editable.tsx';
import { ResourcesList } from './ResourcesList.tsx';


export const Resources = async (
  { id, level } : 
  { id: string, level: LevelType }
) => {
  const resources = await getResources(id);

  return (
    <Editable level={level} componentId={id} resources={resources} >
      <ResourcesList data={resources} />
    </Editable>
  );
}
