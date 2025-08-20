import { useCallback } from 'react';
import { Data, List, Page, PageContent, PageHeader } from 'grommet';
import PocketBase, { type RecordModel } from 'pocketbase';
import { useCollection } from '../../hooks';
import { InvalidPermissions } from '../../components';
import { AdoptionLevelListItem } from './AdoptionLevelListItem';

const pb = new PocketBase(import.meta.env.VITE_POCKETBASE_URL);

const AdoptionLevels = () => {
  const getAdoptionLevels = useCallback(() => pb.collection('adoption_levels').getFullList({ sort: 'name' }), []);

	const { data, authorized } = useCollection({
		collection: 'adoption_levels',
		method: getAdoptionLevels,
	});

  const adoptionLevels = data as RecordModel[];

  return (
    <Page pad={{ bottom: 'xlarge' }}>
			<PageContent>
				<PageHeader
					title="Adoption Levels"
				/>
        {authorized ? (
					<Data data={adoptionLevels} toolbar>
						<List defaultItemProps={{ pad: { vertical: 'xsmall' } }}>
              {(datum: RecordModel) => (
                <AdoptionLevelListItem key={datum.id} level={datum} />
              )}
            </List>
					</Data>
				) : (
					<InvalidPermissions onClick={() => {}} />
				)}
			</PageContent>
		</Page>
	  );
};

export default AdoptionLevels;