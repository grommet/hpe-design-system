import React from 'react';
import { CardGrid, Meta, SubsectionText } from '../../components';
import { RadioButtonGroupExample } from '../../examples';
import { ContentSection, Example, Layout, Subsection } from '../../layouts';
import { getPageDetails, getRelatedContent } from '../../utils';

const title = 'RadioButtonGroup';
const topic = 'Components';
const page = getPageDetails(title);
const relatedContent = getRelatedContent(title);

const RadioButtonGroup = () => {
  return (
    <Layout title={title}>
      <Meta
        title={title}
        description={page.seoDescription}
        canonicalUrl="https://design-system.hpe.design/components/radiobuttongroup"
      />
      <ContentSection>
        <Subsection name={title} level={1} topic={topic}>
          <SubsectionText>{page.description}</SubsectionText>
          <Example
            code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/components/radiobuttongroup/RadioButtonGroupExample.js"
            docs="https://v2.grommet.io/radiobuttongroup?theme=hpe#props"
            figma="https://www.figma.com/file/aZyY606ENQedz4FXugdzgS/HPE-Radio-Button-Group-Component?node-id=105%3A643"
            width="medium"
          >
            <RadioButtonGroupExample />
          </Example>
        </Subsection>
      </ContentSection>
      <ContentSection>
        <Subsection name="Guidance">
          <SubsectionText>
            fadhads dfhjdasd dafsadhlhdfa dafhlkhdaf
          </SubsectionText>
        </Subsection>
      </ContentSection>
      <ContentSection>
        <Subsection name="Variants">
          <SubsectionText>
            fadhads dfhjdasd dafsadhlhdfa dafhlkhdaf
          </SubsectionText>
        </Subsection>
        <Subsection name="Validation" level={3} gap="small">
          <SubsectionText>
            fddsdfdasdfas fasfdsdadf afdsfda afasf afadsf adf
          </SubsectionText>
          <Example
            code=""
            docs="https://v2.grommet.io/radiobuttongroup?theme=hpe#props"
            height={{ min: 'small' }}
            width="medium"
          >
            <RadioButtonGroupExample />
          </Example>
        </Subsection>
        <Subsection name="Disabled" level={3} gap="small">
          <SubsectionText>
            fasdfa adfadsfa adfsaddf afasdfd adfdsafd{' '}
          </SubsectionText>
          <Example
            code=""
            docs="https://v2.grommet.io/radiobuttongroup?theme=hpe#props"
            height={{ min: 'small' }}
            width="medium"
          >
            <RadioButtonGroupExample />
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
export default RadioButtonGroup;
