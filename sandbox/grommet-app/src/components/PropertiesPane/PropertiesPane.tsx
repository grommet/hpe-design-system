import React from 'react';
import { NameValueList, NameValuePair } from 'grommet';
import ContentPane from '../ContentPane';
import { sentenceCase } from '../../utils/format';

export const PropertiesPane = ({
  heading,
  level,
  properties,
  ...rest
}) => {
  return (
    <ContentPane
      heading={heading}
      level={level}
      actions={null}
      skeleton={null}
      {...rest}
    >
      <NameValueList nameProps={{ width: ["3xsmall", 'max-content'] }}>
        {properties && properties.map(({ key, value, render }) =>
          <NameValuePair
            key={key}
            name={render ? render : sentenceCase(key)}
          >{value}</NameValuePair>
        )}
      </NameValueList>
    </ContentPane>
  );
}
