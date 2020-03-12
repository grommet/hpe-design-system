import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FormField as GrommetFormField } from 'grommet';

const StyledFormField = styled(GrommetFormField)`
  ${props =>
    props.visuallyHidden &&
    `label {
      border: 0;
      clip: rect(0 0 0 0);
      height: 1px;
      margin: -1px;
      overflow: hidden;
      padding: 0;
      position: absolute;
      width: 1px;
    }`};
`;

export const FormField = ({ visuallyHidden, ...rest }) => {
  return <StyledFormField visuallyHidden={visuallyHidden} {...rest} />;
};

FormField.defaultProps = {
  visuallyHidden: false,
};

FormField.propTypes = {
  visuallyHidden: PropTypes.bool,
};
