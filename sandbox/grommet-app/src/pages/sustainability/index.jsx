import { PageHeader, Page, PageContent, Heading, Button } from 'grommet';
import { Devices } from './Devices';
import { SustainabilityInsights } from './SustainabilityInsights';

function Sustainability() {
  return (
    <Page pad={{ bottom: 'large' }}>
      <PageContent gap="medium">
        <PageHeader
          title="Sustainability Insight Center"
          actions={<Button label="Export report" secondary />}
        />
        <SustainabilityInsights />
        <Heading level={2} margin="none">
          Devices
        </Heading>
        <Devices />
      </PageContent>
    </Page>
  );
}

export default Sustainability;
