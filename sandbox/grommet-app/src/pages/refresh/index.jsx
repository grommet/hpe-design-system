import {
  Anchor,
  Box,
  PageHeader,
  Grid,
  Page,
  PageContent,
  Button,
  Heading,
  Text,
} from 'grommet';
import { Link } from 'react-router-dom';
import { Devices } from '../sustainability/Devices';
import {
  Down,
  LinkNext,
  MoreVertical,
  Next,
  Previous,
  Refresh,
  ShareRounded,
  Sidebar,
  VirtualMachine,
} from 'grommet-icons';
import ContentPane from '../../components/ContentPane';

function Sustainability() {
  return (
    <Grid columns={['medium', 'flex']}>
      <Box
        background="background-front"
        border={{ side: 'right', color: 'border-weak' }}
        pad='xsmall'
        gap='xsmall'
      >
        <Box align="center" pad='xsmall' direction="row" justify="between">
          <Text size="large">Private Cloud</Text>
          <Button icon={<Sidebar />} />
        </Box>
        <Box border={{ side: 'bottom', color: 'border-weak' }} />
        <Box gap='xsmall'>
          <Button kind="nav" align="start" label="Dashboard" />
          <Button kind="nav" align="start" label="Systems" />
          <Button
            kind="nav"
            align="start"
            label="Virtual Machines"
            icon={<Down />}
            active
            justify="between"
            reverse
          />
          <Box pad={{ horizontal: 'xsmall', vertical: '3xsmall' }} gap='xsmall'>
            <Button
              kind="nav"
              align="start"
              justify="start"
              label="Private Cloud"
              icon={<LinkNext />}
            />
            <Button kind="nav" align="start" label="Public Cloud" />
            <Button kind="nav" align="start" label="View all" />
          </Box>
          <Button kind="nav" align="start" label="Bare Metal" />
          <Button kind="nav" align="start" label="Container Clusters" />
          <Button kind="nav" align="start" label="Protection Groups" />
          <Button kind="nav" align="start" label="Encryption Detection" />
          <Button kind="nav" align="start" label="Reports" />
        </Box>
        <Box border={{ side: 'bottom', color: 'border-weak' }} />
        <Box gap='xsmall'>
          <Button kind="nav" align="start" label="Tasks" />
          <Button kind="nav" align="start" label="Documentation" />
        </Box>
      </Box>
      <Page pad={{ bottom: 'xlarge' }}>
        <PageContent>
          <PageHeader
            title={
              <Box direction="row" align="center" gap='xsmall'>
                <VirtualMachine size="xlarge" />
                <Heading level={1} margin="none">
                  Virtual Machines
                </Heading>
              </Box>
            }
            parent={
              <Anchor as={Link} to="/" label="Home" icon={<Previous />} />
            }
            actions={
              <Box direction="row">
                <Button icon={<Refresh />} />
                <Button icon={<ShareRounded />} />
                <Button icon={<MoreVertical />} />
              </Box>
            }
          />
          <Box gap="medium" animation="fadeIn">
            <Grid align="start" columns={['medium', 'flex']} gap='xlarge'>
              <ContentPane>
                <Box gap='xsmall'>
                  <Button
                    align="start"
                    justify="start"
                    kind="nav"
                    icon={<Next color="icon-brand" />}
                    label="HPE Private Cloud Las Vegas"
                  />
                  <Button
                    align="start"
                    justify="start"
                    kind="nav"
                    label="vCenter"
                    icon={<Down color="icon-brand" />}
                  />
                  <Button
                    align="start"
                    kind="nav"
                    label="Devices"
                    icon={<Text color="text-brand">8</Text>}
                    reverse
                    active
                  />
                </Box>
              </ContentPane>

              <ContentPane heading="Devices" level={2}>
                <Devices />
              </ContentPane>
            </Grid>
          </Box>
        </PageContent>
      </Page>
    </Grid>
  );
}

export default Sustainability;
