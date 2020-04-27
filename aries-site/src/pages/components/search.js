import React from 'react';
import { Anchor, Box, Text } from 'grommet';

import { BulletedList, CardGrid, Meta, SubsectionText } from '../../components';
import {
  SearchExample,
  SearchIconPositionExample,
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
            Search inputs provide a powerful means for users to access content
            quickly and efficiently.
          </SubsectionText>
          <SubsectionText>
            Many search best practices extend "behind the scenes," such as how
            query strings are matched to relevant content and to the efficiency
            in which that information is retrieved.
          </SubsectionText>
        </Subsection>
        <Subsection name="Auto-suggestions" level={3} gap="small">
          <Box width={{ max: 'large' }}>
            <BulletedList
              level={3}
              items={[
                <Text>
                  Provide effective{' '}
                  <Anchor href="#search-with-auto-suggestions">
                    auto-suggestions
                  </Anchor>{' '}
                  whenever possible.
                </Text>,
                `Auto suggestions accelerate search and allow users to focus
                on task completion.`,
              ]}
            />
          </Box>
        </Subsection>
        <Subsection name="Returning search results" level={3} gap="small">
          <Box width={{ max: 'large' }}>
            <BulletedList
              level={3}
              items={[
                `Use "live filtering." When results are visibile and quick to 
                filter, results should be filtered as the user types.`,
                `Sort results by highest relevance. Relevance can be 
                determined by keyword matching, however, to really elevate user 
                experience, consider implementing probability based 
                approaches.`,
                `Persist users' original query. This eliminates the need to 
                re-type and assists query reformation if needed.`,
                `Persist users' recently used search queries. Remembering the 
                user's previous efforts respects their time and serves as 
                "short cuts" for returning to previously visited content.`,
              ]}
            />
          </Box>
        </Subsection>
        <Subsection name="Accessibility" level={3} gap="small">
          <SubsectionText>
            Search inputs should be accessible. Ensure users have the ability to
            return results using their keyboard as well as clicking a button.
          </SubsectionText>
          <SubsectionText>
            Inputs should always be accompanied by labels for accessibility. An
            icon may serve as a label if: 1) the icon meaning is well
            understood, and 2) has an 'aria-labelledby' attribute. For
            additional detail, see{' '}
            <Anchor
              href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/forms/Basic_form_hints"
              target="_blank"
              rel="noopener noreferrer"
            >
              ARIA form hints
            </Anchor>{' '}
            and{' '}
            <Anchor
              href="https://www.w3.org/WAI/tutorials/forms/labels/#using-aria-labelledby"
              target="_blank"
              rel="noopener noreferrer"
            >
              'aria-labelledby'
            </Anchor>
            .
          </SubsectionText>
        </Subsection>
      </ContentSection>
      <ContentSection>
        <Subsection name="Variants">
          <SubsectionText>
            Visual and functional extensions for Search.
          </SubsectionText>
        </Subsection>
        <Subsection name="Search with Auto Suggestions" level={3} gap="small">
          <SubsectionText>
            Suggestions provide users instantaneous feedback as they type, and
            aid by prompting with common search intents most closely matching
            the query in progress. Helpful matching functions include root word
            recognition and predictive text.
          </SubsectionText>
          <SubsectionText>
            Suggested queries should be sorted from highest probability match to
            lowest. Limit the number of suggested queries displayed to five or
            less.
          </SubsectionText>
          <Example
            code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/components/search/SearchSuggestionsExample.js"
            docs="https://v2.grommet.io/textinput?theme=hpe#props"
            height={{ min: 'small' }}
          >
            <SearchSuggestionsExample />
          </Example>
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
        <Subsection name="Icon Position" level={3}>
          <SubsectionText>
            The search icon may be placed either to the right or left of the
            input field. Icon position is controlled via the{' '}
            <Anchor
              href="https://v2.grommet.io/textinput?theme=hpe#reverse"
              target="_blank"
            >
              reverse
            </Anchor>{' '}
            property.
          </SubsectionText>
          <Example
            code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/components/search/SearchIconPositionExample.js"
            docs="https://v2.grommet.io/textinput?theme=hpe#props"
            height={{ min: 'small' }}
          >
            <SearchIconPositionExample />
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
