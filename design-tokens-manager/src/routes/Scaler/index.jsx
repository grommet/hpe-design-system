import { useState } from 'react';
import { Box, Page, PageContent, PageHeader } from 'grommet';
import { ControlPane } from './ControlPane';
import { Results } from './Results';

const defaultValues = {
  base: 8,
  steps: 10,
  factor: 1.333,
  nearest: 8,
  'spacing-factor': 0,
  'type-factor': 0,
};

export const Scaler = () => {
  const [values, setValues] = useState(defaultValues);

  return (
    <Page pad={{ bottom: 'xlarge' }}>
      <PageContent>
        <PageHeader
          title="Scale generator"
          subtitle="Explore dimension scaling options by adjusting scale settings."
        />
        <Box direction="row" gap="large">
          <Results
            base={values.base}
            factor={values.factor}
            steps={values.steps}
            nearest={values.nearest}
            background="background-front"
            round="medium"
            pad="medium"
          />
          <ControlPane
            defaultValues={defaultValues}
            values={values}
            setValues={setValues}
            alignSelf="start"
          />
        </Box>
      </PageContent>
    </Page>
  );
};
