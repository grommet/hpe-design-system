import {
	Card,
	CardBody,
	CardHeader,
	Cards,
	NameValueList,
	NameValuePair,
	Text,
} from 'grommet';
import { formatRelativeTime } from '../../utils';
import { Identifier, RoutedButton } from '../../components';

type TeamType = {
	id: string;
	team_id: string;
	team_name: string;
	assessment_date: string;
	assessment_type: string;
	adoption_level: string;
	num_code_adopted: number;
	num_design_adopted: number;
	num_features_available: number;
};

export const TeamsView = ({ ...rest }) => {
	return (
		<Cards
			as="ul"
			columns={{ count: 'fit', size: ['medium', 'auto'] }}
			{...rest}
		>
			{(item: TeamType) => {
				const {
					id,
					team_id,
					team_name,
					assessment_date,
					assessment_type,
					adoption_level,
					num_code_adopted,
					num_features_available,
				} = item;

				const adoption_percentage = num_features_available
					? `${Math.round((num_code_adopted / num_features_available) * 100)}%`
					: null;

				return (
					<RoutedButton
						key={id}
						a11yTitle="View team adoption details"
						href={`/adoption/${team_id}`}
					>
						<Card as="li" fill="vertical" pad="medium" gap="small" onClick={() => {}}>
							<CardHeader pad="none">
								<Identifier heading={team_name} level={2} />
							</CardHeader>
							<CardBody pad="none">
								<NameValueList
									layout="grid"
									columns={{ count: 'fit', size: 'xsmall' }}
									gap="small"
									pairProps={{ direction: 'column' }}
									nameProps={{ width: { min: 'medium', max: 'medium' } }}
								>
									<NameValuePair name="Adoption level">
										{adoption_level ? adoption_level : '--'}
									</NameValuePair>
									<NameValuePair name="Adoption %">
										{adoption_percentage ? adoption_percentage : '--'}
									</NameValuePair>
									<NameValuePair name="Latest assessment">
										{assessment_date ? (
											<>
												<Text>
													{formatRelativeTime(
														new Date(assessment_date),
														undefined,
													)}
												</Text>
												<Text size="small">{assessment_type}</Text>
											</>
										) : (
											'--'
										)}
									</NameValuePair>
								</NameValueList>
							</CardBody>
						</Card>
					</RoutedButton>
				);
			}}
		</Cards>
	);
};
