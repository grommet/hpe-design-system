import React, { useState } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Box, Button, Heading, Markdown, Text } from 'grommet';
import { Link as LinkIcon } from 'grommet-icons';
import { CardGrid, Meta, Status, SubsectionText } from '../../components';
import { ExamplePreview } from '.';
import { ContentSection, Layout, Subsection } from '..';
import { getPageDetails, getRelatedContent } from '../../utils';

const SubsectionHeader = ({ headingHtml, level }) => {
  const [over, setOver] = useState(false);
  const { children, id } = headingHtml;
  return (
    <Box
      direction="row"
      align="center"
      gap="small"
      id={id}
      onMouseOver={() => setOver(true)}
      onFocus={() => {}}
      onMouseOut={() => setOver(false)}
      onBlur={() => {}}
    >
      <Heading
        margin={{ vertical: 'small' }}
        level={level}
        size={level === 3 ? 'small' : undefined}
      >
        {[children]}
      </Heading>
      <Button
        a11yTitle={`Jump to section titled ${[children]}`}
        href={`#${id}`}
        icon={<LinkIcon color={over ? 'text-weak' : 'transparent'} />}
      />
    </Box>
  );
};

SubsectionHeader.propTypes = {
  headingHtml: PropTypes.shape({
    children: PropTypes.arrayOf(PropTypes.string).isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
  level: PropTypes.number,
};

export const MarkdownDocs = ({ data, docs }) => {
  const { grommetDocs, topic, title } = data;
  const parent = getPageDetails(topic);
  const page = getPageDetails(title);
  const relatedContent = getRelatedContent(title);

  return (
    <Layout title={title}>
      <Meta
        title={title}
        description={page.seoDescription}
        canonicalUrl={`https://design-system.hpe.design/${topic.toLowerCase()}/${title.toLowerCase()}`}
      />
      <ContentSection>
        <Box>
          <Link href={`/${topic.toLowerCase()}`} passHref>
            <Button
              label={<Text color="text">{parent.name}</Text>}
              icon={parent.icon('small', parent.color)}
              plain
              alignSelf="start"
            />
          </Link>
          <Heading margin={{ vertical: 'small' }}>{title}</Heading>
          <SubsectionText>{page.description}</SubsectionText>
          <Status status={page.status} />
        </Box>
        <Box gap="small">
          {docs.map((item, index) => {
            if (typeof item === 'string') {
              const renderedMarkdown = item;
              return (
                <Markdown
                  key={index}
                  components={{
                    p: SubsectionText,
                    // eslint-disable-next-line react/prop-types
                    ul: ({ children }) => (
                      <SubsectionText
                        as="ul"
                        style={{
                          // don't let text wrap beneath bullet
                          listStylePosition: 'outside',
                          paddingLeft: '21px', // Left align bullet with p text
                        }}
                      >
                        {[children]}
                      </SubsectionText>
                    ),
                    h1: <Heading margin={{ vertical: 'small' }} level={1} />,
                    h2: headingHtml => {
                      return (
                        <SubsectionHeader headingHtml={headingHtml} level={2} />
                      );
                    },
                    h3: headingHtml => {
                      return (
                        <SubsectionHeader headingHtml={headingHtml} level={3} />
                      );
                    },
                  }}
                >
                  {renderedMarkdown}
                </Markdown>
              );
            }
            return (
              <ExamplePreview
                key={index}
                example={item}
                title={title}
                docs={grommetDocs}
              />
            );
          })}
        </Box>
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

MarkdownDocs.propTypes = {
  data: PropTypes.shape({
    grommetDocs: PropTypes.string,
    topic: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  docs: PropTypes.array.isRequired,
};
