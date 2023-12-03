import React from 'react';
import PropTypes from 'prop-types';
import { Anchor } from 'grommet';
import { FormPrevious } from 'grommet-icons';

export const ReverseAnchor = React.forwardRef(
  ({ href, label, ...rest }, ref) => {
    return (
      <Anchor
        ref={ref}
        href={href}
        label={label}
        icon={<FormPrevious />}
        gap="hair"
        {...rest}
      />
    );
  },
);

ReverseAnchor.propTypes = {
  href: PropTypes.string,
  label: PropTypes.string.isRequired,
};
