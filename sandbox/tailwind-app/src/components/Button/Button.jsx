// eslint-disable-next-line react/prop-types
export const Button = ({ label, kind = 'default', ...rest }) => {
  return (
    <button type="button" className={`hpe-button-${kind}`} {...rest}>
      {label}
    </button>
  );
};
