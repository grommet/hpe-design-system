import React from 'react';
import { Text } from 'grommet';

import { ContentSection, PageLayout, Subsection } from '../../layouts';

import {
  BulletedList,
  MainDescription,
  MainHeading,
  Subheading,
} from '../../components';

const title = 'Principles';

const Principles = () => (
  <PageLayout title={title}>
    <ContentSection>
      <MainHeading>{title}</MainHeading>
      <MainDescription>
        Our principles provide clear criteria for the conception, craftsmanship
        and creativity our brand demands and our clients deserve. They are for
        designers and non-designers alike, anyone authoring or authorizing any
        form of design on behalf of HPE.
      </MainDescription>
      <Subsection>
        <Subheading>Innovative and Adventurous</Subheading>
        <Text>
          We are a company reborn, a new culture, and in a new space. We live in
          markets that ravenous and cutthroat when we are respectful and humane.
          We need more than technology to drive us. We need to embrace the
          discomfort and push to look at all avenues to stoke the fire for the
          next generation of tools—We must explore!
        </Text>
        <BulletedList
          items={[
            'Just start.',
            'It is HPE’s mission to innovate.',
            'To conceive an idea just takes one person.',
            'An adventure is a shared experience.',
            'The less time you spend seeking answers the better.',
          ]}
        />
      </Subsection>
      <Subsection>
        <Subheading>Purposeful and Useful</Subheading>
        <Text>
          Presenting a long list of features or giving the user too much choice
          is not the business we’re in. Usefulness should be born out of a
          diverse library of solutions, each honed from relentless pursuit of
          solving the users needs—No, “One tool to rule them all!” mentality.
          Every interaction should ask if this is something essential? In the
          end, the purpose will be ascertained by the metrics.
        </Text>
        <BulletedList
          items={[
            'Task-based experiences prioritized of data rich sifting.',
            `Can we be additive, helpful, or need to make a larger shift to
                   be useful?`,
            `Accentuate the user context. Usefulness is different for every
                   user.`,
            `HPE provides value, not quick wins. Does the purpose serve the
                   company?.`,
            'Lean is mean! It’s also the quickest way to learn.',
          ]}
        />
      </Subsection>
      <Subsection>
        <Subheading>Integrated but Composable</Subheading>
        <Text>
          To ensure every experience we define is part of a cohesive direction,
          it is important to ask where this product lives in the ecosystem of
          HPE. Not all products have to look exact to garner the confidence of
          customers. It is important to check how it integrates and is consumed
          in conjunction with other services we provide.
        </Text>
        <BulletedList
          items={[
            `Every experience talks to different set of users, but should 
                  we restrict access?`,
            `Designing towards a smaller set of functions opens the 
                  possibilities of utility.`,
            `Thinking holistically of the technology platforms can connect
                   the dots`,
            `Fake it until you make it! Take a cognitive leap to push 
                  ingenuity.`,
          ]}
        />
      </Subsection>
    </ContentSection>
  </PageLayout>
);

export default Principles;
