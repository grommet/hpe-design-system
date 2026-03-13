import PropTypes from 'prop-types';
import { Box, Button, Card, CardFooter, CardHeader } from 'grommet';
import { LayerHeader } from '@shared/aries-core';

export const DoubleConfirmationBestPractice = ({ bestPractice = true }) => (
  <Card elevation="large" background="background-floating">
    <CardHeader>
      <LayerHeader
        title={
          bestPractice
            ? 'Discard application?'
            : 'Are you sure you want to do this?'
        }
        subtitle="Your changes will not be applied."
      />
    </CardHeader>
    <CardFooter pad={{ top: 'none', bottom: 'medium', horizontal: 'medium' }}>
      <Box
        fill
        id="confirmation-footer"
        direction="row"
        gap="xsmall"
        round="small"
        justify="end"
      >
        <Button label="Cancel" />
        <Button
          label={bestPractice !== 'badLabel' ? 'Discard' : 'Yes'}
          primary
        />
      </Box>
    </CardFooter>
  </Card>
);

DoubleConfirmationBestPractice.propTypes = {
  bestPractice: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.oneOf(['badLabel']),
  ]),
};
