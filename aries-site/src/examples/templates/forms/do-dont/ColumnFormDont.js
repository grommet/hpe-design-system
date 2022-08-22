import React, { useContext } from 'react';
import { Box, Button, ResponsiveContext } from 'grommet';
import { ContactInformation, ShippingInfomation } from '../Shipping';
import { ShippingExample } from '../ShippingExample';

export const ColumnFormDont = () => {
  const size = useContext(ResponsiveContext);
  return (
    <ShippingExample>
      <Box gap="large" direction="row">
        <ShippingInfomation />
        <>
          <ContactInformation />
          <Box
            align={['xsmall', 'small'].includes(size) ? undefined : 'start'}
            margin={{ vertical: 'small' }}
          >
            <Button label="Continue" primary type="submit" />
          </Box>
        </>
      </Box>
    </ShippingExample>
  );
};
