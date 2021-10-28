import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'grommet';
import { getPageDetails } from '../../utils';
import { Status, SubsectionText } from '../../components';
import { Subsection } from '.';

export const DocsPageHeader = ({ title, topic, render }) => {
  const page = getPageDetails(title);

  return (
    <Subsection name={render || title} topic={topic} level={1}>
      <Box>
        <SubsectionText>{page.description}</SubsectionText>
        {page.status && <Status status={page.status} />}
      </Box>
    </Subsection>
  );
};

DocsPageHeader.propTypes = {
  render: PropTypes.string,
  title: PropTypes.string.isRequired,
  topic: PropTypes.string.isRequired,
};
