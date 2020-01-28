import React from 'react';
import PropTypes from 'prop-types';
import { Accordion, AccordionPanel, Box, Grommet } from 'grommet';
import { aries } from '../../../../../../aries-site/src/themes/aries';

export default {
  title: 'Accordion',
};

const AccordionPanelWrapper = ({ label, ...rest }) => (
  <AccordionPanel label={label}>
    <Box pad={{ vertical: 'medium' }} {...rest} />
  </AccordionPanel>
);

AccordionPanelWrapper.propTypes = {
  label: PropTypes.string,
};

AccordionPanelWrapper.defaultProps = {
  label: 'undefined',
};

export const Simple = () => {
  return (
    <Grommet theme={aries} full>
      <Accordion>
        <AccordionPanelWrapper label="Our Company">
          We are HPE.
        </AccordionPanelWrapper>
        <AccordionPanelWrapper label="Our History">
          At Hewlett Packard Enterprise, we advance the way you live and work by
          engineering experiences that unlock your full potential.
        </AccordionPanelWrapper>
        <AccordionPanelWrapper label="Our Purpose">
          We advance the way you live and work by engineering experiences that
          unlock your full potential.
        </AccordionPanelWrapper>
        <AccordionPanelWrapper label="What's New">
          We make Bold Moves.
        </AccordionPanelWrapper>
      </Accordion>
    </Grommet>
  );
};
