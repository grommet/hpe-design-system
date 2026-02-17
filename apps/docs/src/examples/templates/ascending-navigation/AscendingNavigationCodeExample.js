/* eslint-disable react/prop-types */
import React from 'react';
import { Anchor, Button, PageHeader } from 'grommet';
import { Left } from '@hpe-design/icons-grommet';

export const AscendingNavigationCodeExample = () => {
  return (
    <PageHeader
      title="Child page title"
      subtitle="Page subtitle goes here. It can be a little bit longer to 
      provide more context about the page."
      size="large"
      parent={
        <Anchor
          label="Home"
          icon={<Left />}
          a11yTitle="Link to the home page"
        />
      }
      actions={<Button label="Action" primary />}
    />
  );
};
