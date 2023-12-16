import { LevelType } from '@/utilities/types';
import { getResources } from '../actions';
import { Editable } from './Editable';
import { ResourcesList } from './ResourcesList';


export const Resources = async (
  { id, level } : 
  { id: string, level: LevelType }
) => {
  const resources = await getResources(id);

  return (
    <Editable level={level} resources={resources} >
      <ResourcesList data={resources} />
    </Editable>
  );
}
