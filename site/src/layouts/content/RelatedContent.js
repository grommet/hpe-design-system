import React from 'react';
import PropTypes from 'prop-types';
import { ContentSection, Subsection } from '.';
import { CardGrid, SubsectionText } from '../../components';

export const RelatedContent = ({ relatedContent, title }) => (
  <ContentSection>
    <Subsection name="Related">
      <SubsectionText>
        Related content you may find useful when using {title}.
      </SubsectionText>
      <CardGrid cards={relatedContent} headingLevel={3} />
    </Subsection>
  </ContentSection>
);

RelatedContent.propTypes = {
  relatedContent: PropTypes.arrayOf(PropTypes.shape({})),
  title: PropTypes.string.isRequired,
};
