import React from 'react';
import { Box, Card, CardBody, CardFooter, Text } from 'grommet';

import { data } from './data';

export const CardsInRowExample = () => {
  return (
    <Box
      background="background-back"
      overflow={{ vertical: 'auto', horizontal: 'hidden' }}
      pad="small"
      fill
    >
      <Box direction="row" wrap>
        {data &&
          data
            .slice(0, 5)
            .map(
              (
                { deviceName: title, ipAddress: subtitle, icon, status },
                index,
              ) => (
                <Card key={index} flex={false} width="219px" margin="small">
                  <CardBody direction="row" gap="small">
                    <Box pad={{ vertical: 'xsmall' }}>
                      {icon('text', 'large')}
                    </Box>
                    <Box>
                      <Text color="text-strong" size="xxlarge" weight="bold">
                        {title}
                      </Text>
                      <Text>{subtitle}</Text>
                    </Box>
                  </CardBody>
                  <CardFooter
                    background="none"
                    border={{ color: 'border-weak', side: 'top' }}
                    height={{ min: 'xxsmall' }}
                  >
                    {status && (
                      <Box direction="row" align="center" gap="xsmall">
                        <Box
                          background={status.value}
                          height="12px"
                          width="12px"
                          round="100%"
                        />
                        <Text weight="bold">{status.message}</Text>
                      </Box>
                    )}
                  </CardFooter>
                </Card>
              ),
            )}
      </Box>
    </Box>
  );
};
