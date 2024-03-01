import {
  Anchor,
  PageHeader,
  Page,
  PageContent,
  Heading,
  Button,
} from 'grommet';
import { Link } from 'react-router-dom';
import { Devices } from './Devices';
import { SustainabilityInsights } from './SustainabilityInsights';
import { Previous } from 'grommet-icons';

function Sustainability() {
  return (
    <Page pad={{ bottom: 'large' }}>
      <PageContent gap="medium">
        <PageHeader
          title="Sustainability Insight Center"
          parent={
            <Link to="/">
              <Anchor label="Home" icon={<Previous />} />
            </Link>
          }
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
