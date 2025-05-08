import React from 'react';
import { Box, Button, List, NameValueList, NameValuePair, Text } from 'grommet';
import { Edit, Trash } from 'grommet-icons';
import { sentenceCase } from '../../../../utils/format';

export const JobList = ({
  jobs,
}: {
  jobs: {
    id: string;
    name: string;
    [key: string]: any;
  }[];
}) => {
  return (
    <List
      data={jobs}
      defaultItemProps={{ pad: { horizontal: 'none', vertical: '3xsmall' } }}
    >
      {datum => (
        <Box
          key={datum.id}
          background="background-contrast"
          round="small"
          pad={{ left: 'xsmall', right: '3xsmall', vertical: 'xsmall' }}
          gap="medium"
        >
          <Box direction="row" justify="between">
            <Text color="text-strong" weight={500}>
              {datum.name}
            </Text>
            <Box direction="row">
              <Button icon={<Edit />} size="small" />
              <Button icon={<Trash />} size="small" />
            </Box>
          </Box>
          <NameValueList
            nameProps={{ width: 'max-content' }}
            valueProps={{ width: 'medium' }}
          >
            {Object.entries(datum).map(([key, value]) => (
              <NameValuePair key={key} name={sentenceCase(key)}>
                {Array.isArray(value)
                  ? value.map(item => <Text key={item}>{item}</Text>)
                  : value}
              </NameValuePair>
            ))}
          </NameValueList>
        </Box>
      )}
    </List>
  );
};
