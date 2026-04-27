import PropTypes from 'prop-types';
import { Box, Button, Header, Heading } from 'grommet';

export const CustomizeHeader = ({ onCancel, onSave, onAddWidget }) => (
  <Header background="background-front" pad="medium">
    <Box direction="row" gap="small" align="center">
      <Heading level={2} margin="none">
        Customize
      </Heading>
      <Button label="Add widget" secondary onClick={onAddWidget} />
    </Box>
    <Box direction="row" gap="small">
      <Button label="Cancel" onClick={onCancel} />
      <Button label="Save" primary onClick={onSave} />
    </Box>
  </Header>
);

CustomizeHeader.propTypes = {
  onCancel: PropTypes.func,
  onSave: PropTypes.func,
  onAddWidget: PropTypes.func,
};