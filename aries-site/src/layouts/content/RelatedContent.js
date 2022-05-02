import React from 'react';
import PropTypes from 'prop-types';
import { ContentSection, Subsection } from '.';
import { CardGrid, SubsectionText } from '../../components';

export function RelatedContent({ relatedContent, title }) {
  return <ContentSection>
      <Subsection name="Related">
        <SubsectionText>
          Related content you may find useful when using {title}.
        </SubsectionText>
        <CardGrid cards={relatedContent} />
      </Subsection>
    </ContentSection>;
}

RelatedContent.propTypes = {
  relatedContent: PropTypes.arrayOf(PropTypes.shape({})),
  title: PropTypes.string.isRequired,
};
