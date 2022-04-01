import PropTypes from 'prop-types';
import { Button } from 'grommet';
import { FormPrevious } from 'grommet-icons';

export const UpButton = ({ label, href, ...rest }) => (
  <Button
    label={label}
    href={href}
    icon={<FormPrevious />}
    margin={{ left: '-12px' }}
    {...rest}
  />
);

UpButton.propTypes = {
  label: PropTypes.string,
  href: PropTypes.string,
};
