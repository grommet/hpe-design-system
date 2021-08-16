import React from 'react';
import { StatusGoodSmall } from 'grommet-icons/icons/StatusGoodSmall';
import { FormClose } from 'grommet-icons/icons/FormClose';

import { Box, Button, Text } from 'grommet';

export const ToastPreview = () => (
    <Box align="center" justify="center" fill background="background-back">
      <Box 
            elevation="medium" 
            round="xsmall" 
            pad={{ horizontal: 'small', vertical: 'xsmall' }} 
            background={{ color: 'background-front' }}
      >
        <Box direction="row">
          <Box pad={{ right: 'small' }}>
            <StatusGoodSmall color="status-ok" />
          </Box>
          <Box
            gap="medium"
            align="start"
            direction="row"
            justify="between"
            fill
          >
            <>
                <Text 
                    weight="bold" 
                    color={{ light: 'black', dark: 'white' }}
                >Hooray!</Text>
                <Text 
                    color={{ light: 'black', dark: 'white' }}
                >Your toast is done!</Text>
            </>
            <Button
              icon={<FormClose color={{ light: 'black', dark: 'white' }} />}
              plain
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
