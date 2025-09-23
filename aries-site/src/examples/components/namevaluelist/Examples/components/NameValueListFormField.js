import PropTypes from 'prop-types';
import { FormField } from 'grommet';

export const NameValueListFormField = ({ data, name, ...rest }) => (
  // https://github.com/grommet/eslint-plugin-grommet/issues/48
  // eslint-disable-next-line max-len
  // eslint-disable-next-line grommet/formfield-htmlfor-id, grommet/formfield-name
  (<FormField
    // htmlFor={name}
    name={name}
    required={data.required}
    {...rest}
  />)
);

NameValueListFormField.propTypes = {
  name: PropTypes.string,
  data: PropTypes.shape({
    required: PropTypes.bool,
  }),
};
