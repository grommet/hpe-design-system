import React from 'react';
import { Button, Image } from 'grommet';

import {
  ButtonRow,
  ContentSection,
  Layout,
  Subsection,
  UsageExample,
} from '../../layouts';
import { Meta, SubsectionText } from '../../components';
import { ArubaIconExample, HpeElementExample } from '../../examples';
import { getPageDetails } from '../../utils';

const title = 'Branding';
const page = getPageDetails(title);
const topic = 'Foundation';

const Branding = () => (
  <Layout title={title}>
    <Meta
      title={title}
      description={page.seoDescription}
      canonicalUrl="https://aries.hpe.design/foundation/branding"
    />
    <ContentSection>
      <Subsection level={1} name={title} topic={topic}>
        <SubsectionText>
          Our logos are a powerful expression of our brand and who we are. The
          distinctive symbol, we call the "Element," speaks to our focus on
          customers and their success, with a color which signals growth and
          opportunity, and an approachable word-mark which says we are welcoming
          to our partners.
        </SubsectionText>
        <SubsectionText size="medium">
          This guide also supports, Aruba, a Hewlett Packard Enterprise company,
          a leading provider of next-generation networking solutions for
          enterprise whose cloud first approach is part of HPE's effort to help
          our partners address the fundamental changes in today's business
          environment.
        </SubsectionText>
        <ButtonRow>
          <Button
            href="https://www.figma.com/file/TJUX0lFOOL2eFuVpfMmixx/hpe-design-sytem-library-styles?node-id=1%3A458"
            label="See in Figma"
            primary
            target="_blank"
            rel="noreferrer noopener"
          />
        </ButtonRow>
      </Subsection>
    </ContentSection>
    <ContentSection>
      <Subsection name="Hewlett Packard Enterprise">
        <SubsectionText>
          Hewlett Packard Enterprise, also known as HPE has a couple logo
          variations to help build your experience. Each variation should be
          used in the appropriate context. Being aware of different uses helps
          make your experience more compliant.
        </SubsectionText>
      </Subsection>
      <Subsection name="HPE Logo" level={3}>
        <SubsectionText>
          Use the HPE Logo when establishing the brand and building layouts with
          less dense content. Place the logo on the top left or bottom left
          depending on the layout; neither placement is necessarily preferred.
        </SubsectionText>
        <UsageExample label="hpe-logo" themeMode="light">
          <Image src="/static/images/hpe-logo.svg" />
        </UsageExample>
        <UsageExample label="hpe-logo-invert" themeMode="dark">
          <Image src="/static/images/hpe-logo-invert.svg" />
        </UsageExample>
      </Subsection>
      <Subsection name="HPE Element" level={3}>
        <SubsectionText>
          Always use the HPE Element at the top-left of your service or product
          experience. To ensure consistency across HPE, the Element should
          always be accompanied by the company name and product/service name. Do
          not veer from the layout and spacing of the elements.
        </SubsectionText>
        <UsageExample
          label="hpe-element"
          themeMode="light"
          pad={{
            horizontal: 'large',
            vertical: 'medium',
            small: { horizontal: 'xlarge', vertical: 'large' },
          }}
        >
          <HpeElementExample />
        </UsageExample>
        <UsageExample
          label="hpe-element-invert"
          themeMode="dark"
          pad={{
            horizontal: 'large',
            vertical: 'medium',
            small: { horizontal: 'xlarge', vertical: 'large' },
          }}
        >
          <HpeElementExample />
        </UsageExample>
      </Subsection>
    </ContentSection>
    <ContentSection>
      <Subsection name="Aruba Networks">
        <SubsectionText>
          Aruba Networks, also referenced as Aruba, has a couple logo
          variations. Each variation should be used in the appropriate context.
          Being aware of the different uses will help make your experience more
          compliant.
        </SubsectionText>
      </Subsection>
      <Subsection name="Aruba Logo" level={3}>
        <SubsectionText>
          Use the Aruba logo when establishing the brand and building layouts
          with less dense content. Place the logo on the top-left or bottom-left
          depending on the layout; neither placement is necessarily preferred.
        </SubsectionText>
        <UsageExample label="aruba-logo" themeMode="light">
          <Image src="/static/images/aruba-logo.svg" />
        </UsageExample>
        <UsageExample label="aruba-logo-invert" themeMode="dark">
          <Image src="/static/images/aruba-logo.svg" />
        </UsageExample>
      </Subsection>
      <Subsection name="Aruba Icon" level={3}>
        <SubsectionText>
          Always use the Aruba icon at the top-left of your service or product
          experience. To ensure consistency across Aruba, the icon should always
          be accompanied by the company name and product/service name. Do not
          veer from the layout and spacing of the elements.
        </SubsectionText>
        <UsageExample label="aruba-icon" themeMode="light">
          <ArubaIconExample />
        </UsageExample>
        <UsageExample label="aruba-icon-invert" themeMode="dark">
          <ArubaIconExample />
        </UsageExample>
      </Subsection>
    </ContentSection>
  </Layout>
);

export default Branding;
