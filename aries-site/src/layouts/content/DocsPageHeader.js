import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'grommet';
import { getPageDetails } from '../../utils';
import { Status, SubsectionText } from '../../components';
import { Subsection } from '.';

export const DocsPageHeader = ({ title, topic }) => {
  const page = getPageDetails(title);

  return (
    <Subsection name={title} topic={topic} level={1}>
      <Box margin={{ bottom: 'small' }}>
        <SubsectionText>{page.description}</SubsectionText>
        {page.status && <Status status={page.status} />}
      </Box>
    </Subsection>
  );
};

DocsPageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  topic: PropTypes.string.isRequired,
};
