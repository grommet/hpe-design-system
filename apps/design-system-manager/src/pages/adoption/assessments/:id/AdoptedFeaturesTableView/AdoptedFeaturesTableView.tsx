import { Box, DataTable, Pagination } from "grommet";
import { columnsConfig } from "./tableConfig";

export const AdoptedFeaturesTableView = ({ ...rest }) => {
  return (
    <Box pad={{ top: 'small' }}>
      <DataTable columns={columnsConfig} {...rest} />
      <Pagination summary stepOptions border="top" pad={{ vertical: 'small' }}/>
    </Box>
  )
}