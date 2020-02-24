import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button } from 'grommet';
import { Subsection } from '.';
import { SubsectionText } from '../../components';

export const ExampleComponents = ({ components }) => (
  <Subsection name="What components make this screen?" level={3}>
    <SubsectionText>
      To find more details about the usage of each of these components, check
      out their documentation.
    </SubsectionText>
    <Box direction="row-responsive" gap="medium" wrap>
      {components.map(component => (
        <Button
          key={component.name}
          label={component.name}
          href={component.href}
          target={component.target}
          margin={{ bottom: 'small' }}
        />
      ))}
    </Box>
  </Subsection>
);

ExampleComponents.propTypes = {
  components: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      href: PropTypes.string,
      target: PropTypes.string,
    }),
  ),
};
