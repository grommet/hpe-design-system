import { Heading } from 'grommet';
import { ContentContainer } from 'aries-core';
import { getResources } from '../actions';
import { ResourcesList } from './ResourcesList';
import { LevelType } from '@/utilities/types';

export const Resources = async ({ id, level } : { id: string, level: LevelType }) => {
  const resources = await getResources(id);

  return (
    <ContentContainer>
      <Heading level={level} margin={{top: 'none', bottom: 'medium'}}>Resources</Heading>
      <ResourcesList data={resources} primaryKey="id" />
    </ContentContainer>
  );
}
