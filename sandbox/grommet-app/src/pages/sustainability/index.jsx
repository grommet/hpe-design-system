import {
  Anchor,
  Box,
  PageHeader,
  Page,
  PageContent,
  Button,
  Tabs,
  Tab,
  Text,
} from 'grommet';
import { Link } from 'react-router-dom';
import { Devices } from './Devices';
import { SustainabilityInsights } from './SustainabilityInsights';
import { Previous } from 'grommet-icons';
import ContentPane from '../../components/ContentPane';

function Sustainability() {
  return (
    <Page pad={{ bottom: 'large' }}>
      <PageContent>
        <PageHeader
          title="Sustainability Insight Center"
          parent={<Anchor as={Link} to="/" label="Home" icon={<Previous />} />}
          actions={<Button label="Export report" secondary />}
        />
        <Box gap="medium" animation="fadeIn">
          <Tabs alignControls="start">
            <Tab title="Insights">
              <Box pad={{ vertical: 'medium' }}>
                <SustainabilityInsights />
                <ContentPane heading="Devices" level={2}>
                  <Devices />
                </ContentPane>
              </Box>
            </Tab>
            <Tab title="Manage">
              <Box pad={{ vertical: 'medium' }}>
                <Text>TBD</Text>
              </Box>
            </Tab>
          </Tabs>
        </Box>
      </PageContent>
    </Page>
  );
}

export default Sustainability;
