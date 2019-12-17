import React from 'react';
import { Anchor, Text } from 'grommet';
import { ContentSection, Subsection } from '../../layouts/content';
import { SubsectionText } from '.';

export const SubmitFeedback = () => {
  return (
    <ContentSection lastSection>
      <Subsection name="Still have questions?" level={2}>
        <SubsectionText size="large">
          Something missing or looking for more information? Edit or open an
          issue on Github to help us make HPE Aries better.
        </SubsectionText>
        <Anchor
          href="https://github.com/hpe-design/aries/issues"
          target="_blank"
          label={
            <Text weight={400} size="large">
              Open page in Github
            </Text>
          }
        />
      </Subsection>
    </ContentSection>
  );
};
