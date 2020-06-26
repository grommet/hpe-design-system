import React from 'react';
import { ContentSection, Layout, Subsection } from '../../layouts';
import { BulletedList, Meta, SubsectionText } from '../../components';
import { getPageDetails } from '../../utils';

const title = 'Philosophy and Principles';
const page = getPageDetails(title);
const topic = 'Foundation';

const Philosophy = () => (
  <Layout title={title}>
    <Meta
      title={title}
      description={page.seoDescription}
      canonicalUrl="https://design-system.hpe.design/guidelines/philosophy-and-principles"
    />
    <ContentSection>
      <Subsection level={1} name={title} topic={topic}>
        <SubsectionText>{page.description}</SubsectionText>
      </Subsection>
    </ContentSection>
    <ContentSection>
      <Subsection name="Philosophy">
        <SubsectionText>
          The HPE Design System contains an open-source library of elements
          consisting of working code, best practices, design resources,
          human-centered guidelines, and a vibrant community of contributors. It
          enables experiences to be crafted with uncompromising integrity.
        </SubsectionText>
        <SubsectionText>
          The Design System is built on 3 Pillars:
        </SubsectionText>
        <BulletedList
          items={[
            'Human-centered design',
            'A common design language',
            'Collaboration and community',
          ]}
        />
      </Subsection>
      <Subsection name="Human-centered Design" level={3}>
        <SubsectionText>
          We provide for the needs of people and their work. The HPE Design
          System is crafted upon user research and listening to customers first.
          We strive to create consistent and usable design patterns that will
          make HPE products and services a joy to use by customers, partners and
          internal HPE users.
        </SubsectionText>
      </Subsection>
      <Subsection name="Common Design Language" level={3}>
        <SubsectionText>
          The HPE Design System provides a common language for designers,
          developers and stakeholders. This allows everyone to speak the same
          design language without having to translate from one language to
          another. This also allows for more precise specification of UX
          requirements.
        </SubsectionText>
        <SubsectionText>
          A common set of UX/UI components for designers and developers helps to
          make implementation easier and more efficient. These pre-built
          components provide UX consistency, localizability and accessibility.
        </SubsectionText>
      </Subsection>
      <Subsection name="Collaboration and Community" level={3}>
        <SubsectionText>
          Collaborating with you and participating in ongoing conversation is
          how we can build and evolve the design system. Your voice is critical
          to cultivating a relationship that identifies issues and contributes
          to the growth and vitality of the community.
        </SubsectionText>
      </Subsection>
    </ContentSection>
    <ContentSection>
      <Subsection name="Principles">
        <SubsectionText>
          Our principles provide clear criteria for the concepts, craftsmanship
          and creativity our brand demands and which our clients deserve. They
          are for designers and non-designers alike, anyone authoring or
          authorizing any form of design on behalf of HPE. Designs created using
          these principles will be innovative and adventurous, purposeful and
          useful, and composable yet integrated.
        </SubsectionText>
      </Subsection>
      <Subsection name="Focus on the experience" level={3}>
        <SubsectionText>
          Understanding customer needs is critical to creating great user
          experiences (UX).
        </SubsectionText>
        <BulletedList
          items={[
            'Consider the use cases',
            `Simplify the end-to-end experience, making it elegant, intuitive
               and easy`,
            'Express creativity by empathizing with the user',
          ]}
        />
      </Subsection>
      <Subsection name="Simplify" level={3}>
        <SubsectionText>
          Be as simple as possible. Focus on the tasks that users need to do
          with intentionality and mindfulness.
        </SubsectionText>
        <BulletedList
          items={[
            'Reduce visual and cognitive overload',
            'Understand “why” things are needed in your design',
            `Design for the mainstream use cases, yet provide ways to 
              accomplish less frequent tasks`,
          ]}
        />
      </Subsection>
      <Subsection name="Be Intuitive" level={3}>
        <SubsectionText>
          Create designs that are easy to understand and use.
        </SubsectionText>
        <BulletedList
          items={[
            'Make use of affordance and common user interface paradigms',
            `Use consistent patterns and terminology within your design and
               across designs`,
            `Create self-documenting designs to minimize the need to refer to
               online help and other user documents`,
          ]}
        />
      </Subsection>
      <Subsection name="Lead people to success" level={3}>
        <SubsectionText>
          Present paths that guide people to accomplish the task or goal they
          need to achieve. It is the right thing to do and it results in happy
          customers.
        </SubsectionText>
        <BulletedList
          items={[
            'Show only choices and fields that apply to the current context',
            'Organize choices and fields with most common/reasonable first',
            'Reveal additional fields only when they apply',
            `Provide appropriate safeguards to protect the customer and HPE 
              from mistakes or unintentional actions`,
          ]}
        />
      </Subsection>
    </ContentSection>
  </Layout>
);

export default Philosophy;
