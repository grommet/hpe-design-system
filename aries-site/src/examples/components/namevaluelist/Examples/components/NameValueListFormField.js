import PropTypes from 'prop-types';
import { FormField } from 'grommet';

export const NameValueListFormField = ({ data, name, ...rest }) => (
  <FormField htmlFor={name} name={name} required={data.required} {...rest} />
);

NameValueListFormField.propTypes = {
  name: PropTypes.string,
  data: PropTypes.shape({
    required: PropTypes.bool,
  }),
};
