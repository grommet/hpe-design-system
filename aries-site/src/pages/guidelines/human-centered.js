import React from 'react';
import { Button } from 'grommet';
import { ContentSection, PageLayout, Subsection } from '../../layouts';
import { Meta, SubsectionText } from '../../components';

const topic = 'Guidelines';
const title = 'Human Centered';
const description =
  'Unlocking human potential through human centered design. ' +
  'HPE Design System is inclusive, attentive, adaptable, and conversational.';

const HumanCentered = () => (
  <PageLayout title={title}>
    <Meta
      title={title}
      description={description}
      canonicalUrl="https://aries.hpe.design/guidelines/human-centered"
    />
    <ContentSection>
      <Subsection level={1} name={title} topic={topic}>
        <SubsectionText>
          The HPE Design System advances the way people live and work by
          creating experiences that unlock human potential.
        </SubsectionText>
        <SubsectionText size="medium">
          Human sensitivity to technology, as understood through research and a
          relentless pursuit of community engagement, allow the Design System to
          be inclusive, conversational, and adaptable.
        </SubsectionText>
      </Subsection>
    </ContentSection>
    <ContentSection>
      <Subsection name="Inclusive">
        <SubsectionText>
          Meeting WCAG accessibility standards, creating responsive experiences,
          and adhering to readability guidelines are just the beginning of
          understanding what it means to be inclusive. Community discussions
          that allow the Design System to thrive invites new ideas, innovation,
          and ongoing learning. THe Design System seeks to embrace an ethic that
          honors human engagement in the digital experience, keeping in mind
          emotional and social implications of the experience.
        </SubsectionText>
      </Subsection>
      <Subsection name="Attentive">
        <SubsectionText>
          Being human-centered requires attention to the needs of others. We
          first listen to our customers, with curiosity while seeking
          understanding. Listening attentively is an act of humility and it is a
          part of our ethos that buildst the community. Being attentive is
          followed by action through thoughtful presentation of data, utilizing
          a task-based approach to craft experiences, and ensuring services and
          application core competencies.
        </SubsectionText>
      </Subsection>
      <Subsection name="Conversational">
        <SubsectionText>
          The HPE Design System elicits a conversation in two ways. It first
          enables people to craft experiences that engage in an interactive
          dialogue. The Design System allows for the design to express tone and
          give voice to an interaction. Each itneraction elicits a positive or
          negative response that compiles into an entire experience for the
          user. Second, the Design System elicits conversation to continue its
          evolution, growth, maturity, and adaptability. It will not meet every
          need and solve every solution. However, it can bring about a
          conversation to safely allow people to be bold and accelerate what's
          next.
        </SubsectionText>
      </Subsection>
      <Button label="Join the Conversation" primary href="#" />
    </ContentSection>
  </PageLayout>
);

export default HumanCentered;
