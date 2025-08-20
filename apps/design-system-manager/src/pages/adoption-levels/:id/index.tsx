import { useCallback } from 'react';
import PocketBase, { type RecordModel } from 'pocketbase';
import { useParams } from 'react-router-dom';
import { Page, PageContent, PageHeader } from 'grommet';
import { useCollection } from '../../../hooks';
import { InvalidPermissions, ReverseAnchor } from '../../../components';
import { LevelDetail } from './LevelDetail';

const pb = new PocketBase(import.meta.env.VITE_POCKETBASE_URL);

const AdoptionLevel = () => {
	const { id } = useParams<{ id: string }>();
	if (!id) {
		throw new Error('Adoption Level ID is required');
	}
	const getAdoptionLevel = useCallback(
		() => pb.collection('adoption_levels').getOne(id),
		[id],
	);

	const { data, authorized } = useCollection({
		collection: 'adoption_levels',
		method: getAdoptionLevel,
	});

	const adoptionLevel = data as RecordModel;
	const { name, description } = adoptionLevel;

	return (
		<Page pad={{ bottom: 'xlarge' }}>
			<PageContent>
				<PageHeader
					title={name}
					subtitle={description}
					parent={
						<ReverseAnchor label="Adoption Levels" href={'/adoption-levels'} />
					}
				/>
				{authorized ? (
					<LevelDetail level={adoptionLevel} />
				) : (
					<InvalidPermissions onClick={() => {}} />
				)}
			</PageContent>
		</Page>
	);
};

export default AdoptionLevel;
