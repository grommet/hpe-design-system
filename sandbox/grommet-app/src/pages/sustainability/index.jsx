import {
  Anchor,
  Box,
  PageHeader,
  Page,
  PageContent,
  Button,
  Tabs,
  Tab,
  Heading,
  Paragraph,
} from 'grommet';
import { Link } from 'react-router-dom';
import { Devices } from './Devices';
import { SustainabilityInsights } from './SustainabilityInsights';
import { Previous } from 'grommet-icons';
import ContentPane from '../../components/ContentPane';

function Sustainability() {
  return (
    <Page pad={{ bottom: 'xlarge' }}>
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
                <ContentPane alignSelf="start">
                  <Box gap="medium" align="start" flex={false}>
                    <Box align="start" gap="3xsmall">
                      <Heading margin="none" level={2}>
                        No resources to manage
                      </Heading>
                      <Paragraph margin="none" textAlign="start">
                        You do not have access to manage resources. Please
                        contact the administrator to request access.
                      </Paragraph>
                    </Box>
                    <Button secondary label="Request access" />
                  </Box>
                </ContentPane>
              </Box>
            </Tab>
          </Tabs>
        </Box>
      </PageContent>
    </Page>
  );
}

export default Sustainability;
