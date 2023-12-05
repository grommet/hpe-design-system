import {Box, Heading} from 'grommet';
import {LevelType} from '../../utilities/types'

export const Insights = ({ level }: {level: LevelType}) => {
  return (
    <>
      <Heading level={level}>Insights</Heading>
      <Box direction='row' gap='medium'>
        <Box pad="medium" background="orange-yellow" round>KPI a</Box>
        <Box pad="medium" background="purple-blue" round>KPI b</Box>
        <Box pad="medium" background="purple-blue-yellow" round>KPI c</Box>
      </Box>
    </>
  )
}