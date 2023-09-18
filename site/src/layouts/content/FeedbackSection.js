import React from 'react';
import { ContentSection, Subsection } from '.';
import { SubmitFeedback, SubsectionText } from '../../components';

export const FeedbackSection = () => (
    <ContentSection lastSection>
      <Subsection name="Still have questions?" level={2}>
        <SubsectionText>
          Something missing or looking for more information? Get in touch to
          help make the HPE Design System better.
        </SubsectionText>
        <SubmitFeedback />
      </Subsection>
    </ContentSection>
  );
