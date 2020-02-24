import React, { useState } from 'react';
import { Box, Button, CheckBox } from 'grommet';
import { Meta, SubsectionText } from '../../components';
import { ListScreenExample } from '../../examples';
import { ContentSection, Example, Layout, Subsection } from '../../layouts';
import { getPageDetails, nameToPath } from '../../utils';

const title = 'List Views';
const topic = 'Templates';
const page = getPageDetails(title);

const ListScreen = () => {
  const [checked, setChecked] = useState(false);
  return (
    <Layout title={title}>
      <Meta
        title={title}
        description={page.seoDescription}
        canonicalUrl="https://design-system.hpe.design/templates/list-views"
      />
      <ContentSection>
        <Subsection name={title} level={1} topic={topic}>
          <SubsectionText>
            HPE Design System list view templates are go-to patterns for
            displaying homogeneous data such as services, devices, users, and
            more.
          </SubsectionText>
          <SubsectionText size="medium">
            List views are optimized for scanability and reading comprehension.
            Each list item provides users focussed information and identity
            labels to aid selection, decision making, and action.
          </SubsectionText>
        </Subsection>
      </ContentSection>
      <ContentSection>
        <Subsection name="Manage Users Screen">
          <CheckBox
            label="View mobile layout"
            onChange={() => setChecked(!checked)}
            value={checked}
            toggle
          />
          <Example code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/templates/list-views/ListScreenExample.js">
            <ListScreenExample mobile={checked} />
          </Example>
        </Subsection>
        <Subsection name="What components make this screen?" level={3}>
          <SubsectionText>
            To find more details about the usage of each of these components,
            check out their documentation.
          </SubsectionText>
          <Box direction="row-responsive" gap="medium">
            <Button label="Box" href={nameToPath('Box')} />
            <Button label="Button" href={nameToPath('Button')} />
            <Button label="Header" href={nameToPath('Header')} />
            <Button
              label="List"
              href="https://v2.grommet.io/list?theme=hpe#props"
              target="_blank"
              rel="noopener noreferrer"
            />
          </Box>
        </Subsection>
      </ContentSection>
    </Layout>
  );
};

export default ListScreen;
