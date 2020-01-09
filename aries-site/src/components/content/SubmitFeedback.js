import React from 'react';
import { Anchor } from 'aries-core';
import { ContentSection, Subsection } from '../../layouts/content';
import { SubsectionText } from '.';

export const SubmitFeedback = () => {
  return (
    <ContentSection lastSection>
      <Subsection name="Still have questions?" level={2}>
        <SubsectionText>
          Something missing or looking for more information? Edit or open an
          issue on Github to help us make HPE Aries better.
        </SubsectionText>
        <Anchor
          href="https://github.com/hpe-design/aries/issues"
          target="_blank"
          label="Open page in Github"
          rel="noopener noreferrer"
        />
      </Subsection>
    </ContentSection>
  );
};
