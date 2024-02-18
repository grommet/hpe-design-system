import {Box} from 'grommet';
import type {LevelType} from '@/utilities/types'
import { Pane } from '../../components/Pane.tsx';

export const Insights = ({ level }: {level: LevelType}) => {
  return (
    <Pane heading="Insights" level={level}>
      <Box direction='row' gap='medium'>
        <Box pad="medium" background="orange-yellow" round>KPI a</Box>
        <Box pad="medium" background="purple-blue" round>KPI b</Box>
        <Box pad="medium" background="purple-blue-yellow" round>KPI c</Box>
      </Box>
    </Pane>
  )
}