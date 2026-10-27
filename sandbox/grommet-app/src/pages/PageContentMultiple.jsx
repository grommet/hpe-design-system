// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { Page, PageContent, PageContext, PageHeader, Paragraph } from 'grommet';
import { Left } from '@hpe-design/icons-grommet';
import { Link } from 'react-router-dom';
import { RoutedAnchor } from '../components';

function PageContentWithoutVerticalPadding(props) {
  return (
    <PageContext.Consumer>
      {({ pad }) => (
        <PageContent
          {...props}
          pad={{ ...pad, top: 'none', bottom: 'none' }}
        />
      )}
    </PageContext.Consumer>
  );
}


export default function PageContentMultiple() {
  return (
    <Page>
      <PageContent>
        <PageHeader
          title="PageContent multiple"
          parent={
            <RoutedAnchor as={Link} to="/" label="Home" icon={<Left />} />
          }
        />
      </PageContent>

      <PageContent background="brand">
        <Paragraph>Second PageContent.</Paragraph>
        <Paragraph>
          Inherits responsive padding from the active theme. In v3:
        </Paragraph>
        <Paragraph>
          Small screens:{' '}
          <code>{"pad: { top: 'medium', bottom: '3xlarge' }"}</code>
        </Paragraph>
        <Paragraph>
          Medium screens and larger:{' '}
          <code>{"pad: { top: 'large', bottom: '3xlarge' }"}</code>
        </Paragraph>
      </PageContent>

      <PageContent
        background={{
        fill: 'horizontal',
        size: 'contain',
        position: 'left',
        color: 'brand', // custom to match image background
      }}
      >
        <Paragraph>Second +  PageContent.</Paragraph>
        <Paragraph>
          fill: 'horizontal' make BG color extend only horizontally.

        </Paragraph>
     

      </PageContent>

      <PageContent
        pad="none"
        background="background-front"
      >
        <Paragraph>Third PageContent.</Paragraph>
        <Paragraph>
          <code>{'pad="none"'}</code> overrides all theme padding, including
          horizontal padding.
        </Paragraph>
      </PageContent>

      <PageContext.Consumer>
        {({ pad }) => (
          <PageContent
            pad={{ ...pad, top: 'none', bottom: 'none' }}
            background="brand"
          >
            <Paragraph>Fourth PageContent.</Paragraph>
            <Paragraph>
              PageContext.Consumer reads the padding selected by Page for the
              active theme, page kind and current breakpoint.
            </Paragraph>
            <Paragraph>
              <code>{"pad={{ ...pad, top: 'none', bottom: 'none' }}"}</code>{' '}
              copies that padding, then removes only the top and bottom values.
              Horizontal padding stays responsive and follows the active theme.
            </Paragraph>
            <Paragraph>
              Without <code>...pad</code>, the new padding object would replace
              all inherited padding, including horizontal padding.
            </Paragraph>
          </PageContent>
        )}
      </PageContext.Consumer>

      <PageContentWithoutVerticalPadding background="red">
        <Paragraph>Fifth PageContent without vertical padding.</Paragraph>
        <Paragraph>
          Uses the reusable <code>PageContentWithoutVerticalPadding</code>{' '}
          wrapper instead of repeating PageContext.Consumer in each section.
        </Paragraph>
        <Paragraph>
          The wrapper reads the resolved padding from PageContext and applies{' '}
          <code>{"pad={{ ...pad, top: 'none', bottom: 'none' }}"}</code> to
          PageContent. Horizontal padding follows the active theme, page kind
          and breakpoint; top and bottom padding are removed.
        </Paragraph>
        <Paragraph>
          Other props and children pass through via <code>{'...props'}</code>,
          including this section&apos;s background and height. The wrapper sets
          pad after those props, so its padding treatment takes precedence.
        </Paragraph>
        <Paragraph>
          Use this wrapper inside Page. It gives the same result as the fourth
          example, with the context and padding logic defined once for reuse.
        </Paragraph>
      </PageContentWithoutVerticalPadding>
    </Page>
  );
}