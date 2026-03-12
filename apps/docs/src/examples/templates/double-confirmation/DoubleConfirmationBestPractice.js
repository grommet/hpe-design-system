import PropTypes from 'prop-types';
import { Box, Button, Card, CardBody, CardFooter } from 'grommet';
import { LayerHeader } from '@shared/aries-core';

export const DoubleConfirmationBestPractice = ({ bestPractice = true }) => (
  <Card elevation="large" background="background-floating">
    <CardBody pad="medium" gap="medium">
      <LayerHeader
        title={
          bestPractice
            ? 'Discard application?'
            : 'Are you sure you want to do this?'
        }
        subtitle="Your changes will not be applied."
      />
    </CardBody>
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
