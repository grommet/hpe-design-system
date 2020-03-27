import React from 'react';
import { Anchor, Text } from 'grommet';

import { Meta, SubsectionText } from '../../components';
import { MenuExample } from '../../examples';
import { ContentSection, Example, Layout, Subsection } from '../../layouts';
import { getPageDetails } from '../../utils';

const title = 'Menu';
const topic = 'Components';
const page = getPageDetails(title);

const Menu = () => {
  return (
    <Layout title={title}>
      <Meta
        title={title}
        description={page.seoDescription}
        canonicalUrl="https://design-system.hpe.design/components/menu"
      />
      <ContentSection>
        <Subsection name={title} level={1} topic={topic}>
          <SubsectionText>{page.description}</SubsectionText>
          <Example
            code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/components/controls/MenuExample.js"
            details={[
              <Text size="large">
                Menu is used to filter or sort content on a page. It is, in some
                ways, similar to the{' '}
                <Anchor href="input#select">Select component</Anchor>. However,
                use the select component when the user must specify from a list
                of options and submit.
              </Text>,
            ]}
            docs="https://v2.grommet.io/menu?theme=hpe#props"
          >
            <MenuExample />
          </Example>
        </Subsection>
      </ContentSection>
    </Layout>
  );
};
export default Menu;
