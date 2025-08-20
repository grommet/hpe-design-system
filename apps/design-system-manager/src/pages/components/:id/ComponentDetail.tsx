import { Box } from 'grommet';
import type { RecordModel } from 'pocketbase';
import { ContentPane } from '../../../components';
import { MetaData } from './MetaData';
import { UseCases } from './UseCases';

export const ComponentDetail = ({ component }: { component: RecordModel }) => {
    return (
      <Box gap="large">
        <ContentPane>
          <MetaData component={component} />
        </ContentPane>
        <ContentPane heading="Use cases" level={2}>
          <UseCases component={component} level={3} />
        </ContentPane>
        <ContentPane heading="Anatomy" level={2}>
          Anatomy
        </ContentPane>
      </Box>
    );
  }