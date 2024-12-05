import { NameValuePair, NameValueList } from 'grommet';

export const SpacingValues = ({ values, ...rest }) => {
  return (
    <NameValueList nameProps={{ width: 'max-content' }} {...rest}>
      {values &&
        values.map(({ key, value }) => {
          return (
            <NameValuePair key={`${key}-${value}`} name={key}>
              {value}
            </NameValuePair>
          );
        })}
    </NameValueList>
  );
};
