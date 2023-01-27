import { Anchor } from 'grommet';
import PropTypes from 'prop-types';
import { FormPrevious } from 'grommet-icons';

export const ReverseAnchor = ({ label, href, onClick, ...rest }) => (
  <Anchor
    label={label}
    href={href || '#'} // placeholder href to ensure it appears in tab flow
    onClick={onClick}
    color="text-strong"
    icon={<FormPrevious color="brand" />}
    weight={500}
    {...rest}
  />
);

ReverseAnchor.propTypes = {
  label: PropTypes.string,
  href: PropTypes.string,
  onClick: PropTypes.func,
};
