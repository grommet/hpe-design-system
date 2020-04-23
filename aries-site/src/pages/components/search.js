import React from 'react';

import { Anchor } from 'grommet';
import { CardGrid, Meta, SubsectionText } from '../../components';
import {
  SearchExample,
  SearchSimpleExample,
  SearchSuggestionsExample,
} from '../../examples';
import { ContentSection, Example, Layout, Subsection } from '../../layouts';
import { getPageDetails, getRelatedContent, nameToPath } from '../../utils';

const title = 'Search';
const topic = 'Components';
const page = getPageDetails(title);
const relatedContent = getRelatedContent(title);

const Search = () => {
  return (
    <Layout title={title}>
      <Meta
        title={title}
        description={page.seoDescription}
        canonicalUrl="https://design-system.hpe.design/components/select"
      />
      <ContentSection>
        <Subsection name={title} level={1} topic={topic}>
          <SubsectionText>{page.description}</SubsectionText>
          <Example
            code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/components/search/SearchExample.js"
            designer="https://designer.grommet.io/search?id=HPE-design-system-hpedesignsystem-hpe-com"
            docs="https://v2.grommet.io/textinput?theme=hpe#props"
            figma="https://www.figma.com/file/KKHWJN4GAI0Mq5yh0snDT6/HPE-Search-Component?node-id=265%3A112"
          >
            <SearchExample />
          </Example>
        </Subsection>
      </ContentSection>
      <ContentSection>
        <Subsection name="Guidance">
          <SubsectionText>
            Roof party sartorial lumbersexual etsy synth church-key, echo park
            typewriter fashion axe whatever everyday carry tattooed ugh
            intelligentsia. Microdosing letterpress ugh cold-pressed jianbing
            mustache viral direct trade master cleanse dreamcatcher church-key
            fixie.
          </SubsectionText>
        </Subsection>
        <Subsection name="When to use Search" level={3} gap="small">
          <SubsectionText>
            Bicycle rights iPhone roof party tousled beard sustainable bushwick
            crucifix keytar before they sold out flexitarian. Yuccie banh mi
            chambray brunch live-edge man bun deep v godard unicorn williamsburg
            swag.
          </SubsectionText>
        </Subsection>
        <Subsection name="Accessibility" level={3}>
          <SubsectionText>
            Fingerstache cardigan crucifix tofu unicorn pour-over. Chicharrones
            snackwave sustainable flannel neutra. Shaman marfa taiyaki bicycle
            rights occupy activated charcoal cornhole mlkshk kale chips bitters
            lyft tofu poke blog tumblr.
          </SubsectionText>
        </Subsection>
      </ContentSection>
      <ContentSection>
        <Subsection name="Variants">
          <SubsectionText>
            Polaroid church-key cronut sriracha, locavore ugh umami blue bottle.
            Mumblecore bicycle rights yr tote bag, keffiyeh direct trade tumeric
            you probably haven't heard of them wayfarers narwhal intelligentsia.
          </SubsectionText>
        </Subsection>
        <Subsection name="Simple Search" level={3}>
          <SubsectionText>
            Use simple search when its input field is desired to blend with its
            surrounding content, such as when used in a{' '}
            <Anchor href={nameToPath('Header')}>Header</Anchor>.
          </SubsectionText>
          <Example
            code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/components/search/SearchSimpleExample.js"
            docs="https://v2.grommet.io/textinput?theme=hpe#props"
            height={{ min: 'small' }}
          >
            <SearchSimpleExample />
          </Example>
        </Subsection>
        <Subsection name="Search with Suggested Queries" level={3}>
          <SubsectionText>
            Suggestions aid users in forming their search queries by prompting
            with common search intents most closely matching the query in
            progress. Keep the number of suggested queries at five or less.
          </SubsectionText>
          <Example
            code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/components/search/SearchSuggestionsExample.js"
            docs="https://v2.grommet.io/textinput?theme=hpe#props"
            height={{ min: 'small' }}
          >
            <SearchSuggestionsExample />
          </Example>
        </Subsection>
      </ContentSection>
      <ContentSection>
        {relatedContent.length > 0 ? (
          <Subsection name="Related">
            <SubsectionText>
              Related content you may find useful when using {title}.
            </SubsectionText>
            <CardGrid cards={relatedContent} />
          </Subsection>
        ) : null}
      </ContentSection>
    </Layout>
  );
};
export default Search;
