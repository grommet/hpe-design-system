import React from 'react';
import PropTypes from 'prop-types';
import { SubmitFeedback } from '../../components/content/SubmitFeedback';

export const MainContent = ({ children }) => {
  return (
    <>
      {children}
      <SubmitFeedback />
    </>
  );
};

MainContent.defaultProps = {
  /* eslint-disable-next-line react/default-props-match-prop-types */
  MainContent: true,
};

MainContent.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
};
