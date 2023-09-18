import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'grommet';
import { Note } from 'grommet-icons';
import { EmptyState } from 'library';

export const ListingEmptyState = ({ alignEmptyState }) => {
  return (
    <EmptyState
      align={alignEmptyState}
      title="Start a listing"
      description={`Provide a listing overview to help users 
        learn more about your product.`}
      icon={<Note />}
      actions={<Button label="Start a listing" primary />}
      level={2}
    />
  );
};

ListingEmptyState.propTypes = {
  alignEmptyState: PropTypes.oneOf(['start']),
};
