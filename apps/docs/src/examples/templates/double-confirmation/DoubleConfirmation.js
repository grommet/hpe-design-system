import PropTypes from 'prop-types';
import { Box, Button, Card, CardBody, CardFooter, Layer } from 'grommet';
import { LayerHeader } from '@shared/aries-core';
import { useConfirmation } from '@shared/hooks';

export const DoubleConfirmation = ({ title, ...rest }) => {
  const { acceptConfirmation, cancelConfirmation } = useConfirmation();

  return (
    <Layer {...rest}>
      <Card>
        <CardBody pad="medium" gap="medium">
          <LayerHeader
            title={`Discard ${title}?`}
            subtitle="Your changes will not be applied."
          />
        </CardBody>
        <CardFooter
          pad={{ top: 'none', bottom: 'medium', horizontal: 'medium' }}
        >
          <Box fill direction="row" gap="xsmall" justify="end">
            <Button label="Cancel" onClick={cancelConfirmation} />
            <Button label="Discard" primary onClick={acceptConfirmation} />
          </Box>
        </CardFooter>
      </Card>
    </Layer>
  );
};

DoubleConfirmation.propTypes = {
  title: PropTypes.string,
};
