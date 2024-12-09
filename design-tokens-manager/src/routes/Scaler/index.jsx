import { useState } from 'react';
import { Box, Page, PageContent, PageHeader } from 'grommet';
import { ControlPane } from './ControlPane';
import { Results } from './Results';

const defaultValues = {
  base: 24,
  steps: 7,
  factor: 1.414,
  nearest: 24,
  'spacing-factor': 0,
  'type-factor': 0,
  'content-base': undefined,
};

export const Scaler = () => {
  const [values, setValues] = useState(defaultValues);
  const [controlsOpen, setControlsOpen] = useState(true);
  const [scale, setScale] = useState([]);

  return (
    <Page pad={{ bottom: 'xlarge' }}>
      <PageContent>
        <PageHeader
          title="Scale generator"
          subtitle="Explore dimension scaling options by adjusting scale settings."
        />
        <Box direction="row" gap="small">
          <Results
            base={values.base}
            contentBase={values['content-base']}
            factor={values.factor}
            steps={values.steps}
            nearest={values.nearest}
            open={controlsOpen}
            setOpen={() => setControlsOpen(!controlsOpen)}
            scale={scale}
            setScale={setScale}
          />
          {controlsOpen && (
            <ControlPane
              defaultValues={defaultValues}
              values={values}
              setValues={setValues}
              scale={scale}
              alignSelf="start"
              animation={
                controlsOpen
                  ? [
                      { type: 'fadeIn', duration: 250, delay: 0 },
                      { type: 'zoomIn', delay: 0, duration: 500 },
                    ]
                  : undefined
              }
            />
          )}
        </Box>
      </PageContent>
    </Page>
  );
};
