import { useContext } from 'react';
import { Header, Paragraph, ResponsiveContext, ThemeContext } from 'grommet';

import {
  ContentArea,
  LayoutContainer,
  PageContainer,
  PageContainerContext,
} from '../../examples/templates/app-layouts';

const PageLayoutGrid = () => {
  const usePageContainer = useContext(PageContainerContext);
  const { pad } = usePageContainer;

  return (
    <PageContainer kind="narrow" border={{ style: 'dashed' }}>
      <Header pad={usePageContainer && pad}>
        <ContentArea title="Page Header" fill />
      </Header>
      <LayoutContainer
        gap="medium"
        columns={['small', ['small', 'flex']]}
        pad={usePageContainer && { ...pad, vertical: 'medium' }}
      >
        <ContentArea title="1" />
        <ContentArea title="2" />
        <ContentArea title="3">
          <Paragraph>
            I'm baby tilde vegan quinoa pickled iceland. YOLO succulents enamel
            pin, kitsch hot chicken microdosing authentic fingerstache tilde pug
            slow-carb. PBR&B portland whatever unicorn selfies kombucha. La
            croix blue bottle snackwave, polaroid glossier pabst normcore
            microdosing.
          </Paragraph>
        </ContentArea>
        <ContentArea title="4">
          <Paragraph>
            I'm baby tilde vegan quinoa pickled iceland. YOLO succulents enamel
            pin, kitsch hot chicken microdosing authentic fingerstache tilde pug
            slow-carb. PBR&B portland whatever unicorn selfies kombucha. La
            croix blue bottle snackwave, polaroid glossier pabst normcore
            microdosing.
          </Paragraph>
        </ContentArea>
        <ContentArea title="5">
          <Paragraph>
            I'm baby tilde vegan quinoa pickled iceland. YOLO succulents enamel
            pin, kitsch hot chicken microdosing authentic fingerstache tilde pug
            slow-carb. PBR&B portland whatever unicorn selfies kombucha. La
            croix blue bottle snackwave, polaroid glossier pabst normcore
            microdosing.
          </Paragraph>
        </ContentArea>
      </LayoutContainer>
    </PageContainer>
  );
};

const Example = () => {
  const size = useContext(ResponsiveContext);
  const theme = useContext(ThemeContext);
  const pad = { horizontal: theme.pageContainer.pad[size].horizontal };
  return (
    <PageContainerContext.Provider value={{ pad }}>
      <PageLayoutGrid />
    </PageContainerContext.Provider>
  );
};

export default Example;
