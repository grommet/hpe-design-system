import { NameValuePair, NameValueList } from 'grommet';

export const SpacingValues = ({ values, ...rest }) => {
  return (
    <NameValueList nameProps={{ width: 'max-content' }} {...rest}>
      {values &&
        values.map(({ size, value }) => {
          return (
            <NameValuePair key={`${size}-${value}`} name={size}>
              {value}
            </NameValuePair>
          );
        })}
    </NameValueList>
  );
};
