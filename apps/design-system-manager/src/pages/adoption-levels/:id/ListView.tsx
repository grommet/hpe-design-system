import type { RecordModel } from 'pocketbase';
import { Box, Grid, List, Text, Tag } from 'grommet';
import { ContentContainer, Identifier } from '../../../components';
import { sentenceCase } from '../../../utils';

export const ListView = ({...rest}) => {
  return (
    <List defaultItemProps={{ pad: { vertical: 'xsmall' } }} {...rest}>
						{(datum: RecordModel) => (
							<ContentContainer
								key={datum.id}
								direction="row"
								align="center"
								gap="medium"
							>
								<Grid
									columns={[['xsmall', 'small'], ['xsmall', 'small'], ['xsmall', 'small'], 'flex']}
									gap="small"
									fill
									align="center"
								>
									<Identifier
										heading={datum.name}
										level={3}
                    description={sentenceCase(datum.expand?.category_id.name)}
									/>
									<Text>{sentenceCase(datum.type)}</Text>
                  <Text>{datum.design_token ? "Design token" : ""}</Text>
									<Box align="end">
										<Tag
											value={sentenceCase(datum.status)}
											background={
												datum.status === 'available'
													? 'background-ok'
													: 'background-warning'
											}
											size="small"
										/>
									</Box>
								</Grid>
							</ContentContainer>
						)}
					</List>
  );
}