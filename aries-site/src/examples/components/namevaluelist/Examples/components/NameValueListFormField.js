import PropTypes from 'prop-types';
import { FormField } from 'grommet';

export function NameValueListFormField({ data, name, ...rest }) {
  return <FormField
    // htmlFor={name}
    name={name}
    required={data.required}
    {...rest}
  />;
}

NameValueListFormField.propTypes = {
  name: PropTypes.string,
  data: PropTypes.shape({
    required: PropTypes.bool,
  }),
};
