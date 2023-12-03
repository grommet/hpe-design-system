import PropTypes from 'prop-types';
import { Anchor, Text } from 'grommet';
import { FormPrevious } from 'grommet-icons';

export const ReverseAnchor = ({ href, label }) => {
  return (
    <Anchor
      as={Text}
      href={href}
      label={label}
      icon={<FormPrevious />}
      gap="hair"
    />
  );
};

ReverseAnchor.propTypes = {
  href: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};
