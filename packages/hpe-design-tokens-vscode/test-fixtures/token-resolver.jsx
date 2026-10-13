// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import {
  Accordion,
  Avatar,
  Box,
  Paragraph,
  Anchor,
  CheckBox,
  CheckBoxGroup,
  Data,
  Text,
  Heading,
  Button,
  Calendar,
  Cards,
  Carousel,
  Chart,
  DataChart,
  DateInput,
  DataTable,
  DataTableGroupBy,
  DataView,
  Diagram,
  Distribution,
  Drop,
  DropButton,
  FormField,
  Grommet,
  Grid,
  Image,
  Layer,
  List,
  Meter,
  Menu,
  MaskedInput,
  Nav,
  RangeInput,
  RangeSelector,
  RadioButtonGroup,
  PageHeader,
  Pagination,
  Select,
  SelectMultiple,
  Skeleton,
  Sidebar,
  Spinner,
  Stack,
  Stepper,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Tabs,
  Tag,
  TextArea,
  TextInput,
  Tip,
  Toolbar,
  ToggleGroup,
  Video,
  Wizard,
  WizardContent,
  WizardFooter,
  WizardHeader,
  WizardProgress,
  WizardStepHeader,
  WorldMap,
} from 'grommet';
import { Alarm as NoticeIcon } from '@hpe-design/icons-grommet';

const dataChartData = [
  { year: '2024', amount: 10 },
  { year: '2025', amount: 20 },
];
const wizardSteps = [{ id: 'details', title: 'Details' }];
const dropTarget = { current: null };
const menuItems = [{ label: 'Option' }];

export const TokenResolverFixture = () => (
  <Grommet background={{ color: 'background-front' }}>
    <NoticeIcon color="icon-disabled" size="xxlarge" />;
    <Avatar background="background-front" borderWidth="medium" gap="small">
      A
    </Avatar>
    <Box width="medium" />
    <Box height={{ min: 'medium' }} />
    <Box width={{ max: 'xlarge' }} />
    <Box background={{ color: 'decorative-blue', opacity: 'weak' }} />
    <Box border={{ color: 'border-weak', side: 'bottom' }} />
    <Box background="background-front" />
    <Box background="decorative-blue" />
    <Box background="foreground-critical" />
    <Box background="brand" />
    <Box hoverIndicator={{ color: 'decorative-blue' }} />
    <Box
      hoverIndicator={{ background: 'background-front', elevation: 'small' }}
    />
    <Grid
      columns={{ count: 'fit', size: 'medium' }}
      hoverIndicator={{ color: 'decorative-blue' }}
      rows="medium"
    >
      <Box />
    </Grid>
    <Paragraph size="small" />
    <Button
      badge={{ background: 'decorative-blue', value: 1 }}
      gap="xsmall"
      pad="none"
      size="small"
    />
    <Anchor size="small" />
    <CheckBox pad="none" />
    <CheckBoxGroup gap="small" name="checks" options={['One']} />
    <Text margin="small">Status</Text>
    <Heading margin="none">Title</Heading>
    <Paragraph margin="none" />
    <Anchor margin="xxsmall">Learn more</Anchor>
    <Accordion hoverIndicator="decorative-blue" margin="small" pad="medium" />
    <Button
      color="decorative-blue"
      hoverIndicator={{ color: 'background-front' }}
      label="Save"
      margin="medium"
    />
    <Calendar margin="none" />
    <Cards data={['One']} margin="medium" pad="small" />
    <Carousel height={{ max: 'medium' }} width={{ min: 'medium' }}>
      <Box background="background-front" />
    </Carousel>
    <Chart
      color="decorative-blue"
      gap="small"
      margin="medium"
      pad="5xsmall"
      size={{ height: 'medium', width: 'medium' }}
      thickness="medium"
      values={[
        { color: 'decorative-blue', thickness: 'medium', value: [10, 20, 30] },
      ]}
    />
    <DataChart
      chart={{
        color: 'decorative-blue',
        property: 'amount',
        thickness: 'medium',
      }}
      data={dataChartData}
      gap="small"
      offset={{ gap: 'small' }}
      series={[{ property: 'amount' }]}
      pad="medium"
      size={{ height: 'medium', width: 'medium' }}
    />
    <Data data={dataChartData} margin="small" views={[{ name: 'Default' }]}>
      <DataTableGroupBy dropHeight="medium" margin="small" options={['year']} />
      <DataView margin="none" />
    </Data>
    <DataTable
      background={{ color: 'background-front' }}
      border={{ color: 'border-weak', size: 'medium' }}
      columns={[]}
      data={[]}
      margin="none"
      pad="medium"
    />
    <DateInput
      buttonProps={{
        color: 'decorative-blue',
        gap: 'small',
        hoverIndicator: 'background-front',
        margin: 'small',
        pad: 'medium',
        size: 'small',
      }}
      calendarProps={{ margin: 'small' }}
      dropProps={{
        background: 'background-front',
        borderWidth: 'medium',
        gap: 'small',
        height: 'medium',
        hoverIndicator: 'decorative-blue',
        margin: 'small',
        pad: 'medium',
        round: 'medium',
        width: 'medium',
      }}
      format="mm/dd/yyyy"
      inputProps={{ dropHeight: 'medium', size: 'small' }}
      size="medium"
    />
    <Box id="diagram-start" />
    <Box id="diagram-end" />
    <Diagram
      connections={[
        {
          color: 'decorative-blue',
          fromTarget: 'diagram-start',
          offset: 'small',
          thickness: 'medium',
          toTarget: 'diagram-end',
        },
      ]}
    />
    <Distribution gap="small" margin="small" values={[{ value: 1 }]} />
    <Drop
      background="background-front"
      margin="5xsmall"
      pad="medium"
      round="medium"
      target={dropTarget}
      width="medium"
    />
    <DropButton
      color="decorative-blue"
      dropContent={<Box />}
      dropProps={{
        background: 'background-front',
        borderWidth: 'medium',
        gap: 'small',
        height: 'medium',
        hoverIndicator: 'decorative-blue',
        margin: 'small',
        pad: 'medium',
        round: 'medium',
        width: 'medium',
      }}
      gap="small"
      hoverIndicator="background-front"
      margin="5xsmall"
      pad="medium"
      size="small"
    />
    <FormField
      contentProps={{
        background: 'background-front',
        borderWidth: 'medium',
        gap: 'small',
        height: 'medium',
        hoverIndicator: 'decorative-blue',
        margin: 'small',
        pad: 'medium',
        round: 'medium',
        width: 'medium',
      }}
      label="Name"
      margin="5xsmall"
    >
      <TextInput size="medium" />
    </FormField>
    <Image alt="Placeholder" margin="5xsmall" src="/placeholder.png" />
    <List
      background="background-front"
      data={['One', 'Two']}
      margin="none"
      pad="none"
      pinned={{
        background: 'background-front',
        color: 'decorative-blue',
        items: ['One'],
      }}
    />
    <Layer background={{ color: 'decorative-blue' }} margin="5xsmall" />
    <Meter
      background="foreground-critical"
      color="decorative-blue"
      margin="medium"
      size="medium"
      thickness="medium"
      values={[{ color: 'decorative-blue', value: 50 }]}
    />
    <Menu
      color="decorative-blue"
      dropBackground={{ color: 'decorative-blue' }}
      dropProps={{
        background: 'background-front',
        borderWidth: 'medium',
        gap: 'small',
        height: 'medium',
        hoverIndicator: 'decorative-blue',
        margin: 'small',
        pad: 'medium',
        round: 'medium',
        width: 'medium',
      }}
      gap="small"
      hoverIndicator="background-front"
      items={menuItems}
      margin="5xsmall"
      pad="medium"
      size="small"
    />
    <MaskedInput
      dropProps={{
        background: 'background-front',
        borderWidth: 'medium',
        gap: 'small',
        height: 'medium',
        hoverIndicator: 'decorative-blue',
        margin: 'small',
        pad: 'medium',
        round: 'medium',
        width: 'medium',
      }}
      mask={[{ options: ['1', '2'], placeholder: '0', regexp: /^[0-9]$/ }]}
      size="small"
    />
    <Nav gap="small">
      <Text>Navigation</Text>
    </Nav>
    <PageHeader
      background="background-front"
      gap="medium"
      hoverIndicator={{ background: 'background-front' }}
      margin="medium"
      title="Page title"
    />
    <Pagination numberItems={100} round="medium" size="small" />
    <RangeInput color="decorative-blue" value={50} />
    <RangeSelector
      color="foreground-critical"
      max={100}
      min={0}
      round="medium"
      size="small"
      values={[25, 75]}
    />
    <RadioButtonGroup name="radio" options={['One']} round="medium" />
    <Select
      dropHeight="medium"
      dropProps={{
        background: 'background-front',
        borderWidth: 'medium',
        gap: 'small',
        height: 'medium',
        hoverIndicator: 'decorative-blue',
      }}
      margin="medium"
      options={['One']}
      size="medium"
    />
    <SelectMultiple
      dropHeight="medium"
      dropProps={{
        margin: 'small',
        pad: 'medium',
        round: 'medium',
        width: 'medium',
      }}
      margin="none"
      options={['One']}
      size="large"
    />
    <Skeleton
      height={{ max: 'medium' }}
      margin="5xsmall"
      pad="small"
      round="medium"
      width="medium"
    />
    <Sidebar hoverIndicator={{ color: 'decorative-blue' }} pad="medium" />
    <Spinner color="decorative-blue" margin="none" />
    <Stack margin="none">
      <Skeleton height="small" />
    </Stack>
    <Stepper gap="medium" steps={wizardSteps} />
    <Table margin="5xsmall">
      <TableBody>
        <TableRow>
          <TableCell
            background="background-front"
            border={{ color: 'border-weak', size: 'medium' }}
            pad="medium"
          >
            Row
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
    <Tabs margin="medium">
      <Tab title="First">Content</Tab>
    </Tabs>
    <Tag round="medium" size="small" value="Active" />
    <TextArea a11yTitle="Notes" size="large" />
    <TextInput
      dropProps={{
        background: 'background-front',
        borderWidth: 'medium',
        gap: 'small',
        height: 'medium',
        hoverIndicator: 'decorative-blue',
        margin: 'small',
        pad: 'medium',
        round: 'medium',
        width: 'medium',
      }}
      size="medium"
      suggestions={['One', 'Two']}
    />
    <Tip
      content="More information"
      dropProps={{
        background: 'background-front',
        borderWidth: 'medium',
        gap: 'small',
        height: 'medium',
        hoverIndicator: 'decorative-blue',
        margin: 'small',
        pad: 'medium',
        round: 'medium',
        width: 'medium',
      }}
    >
      <Text>Details</Text>
    </Tip>
    <Toolbar
      background="background-front"
      hoverIndicator={{ background: 'background-front' }}
    >
      <Button label="Action" />
    </Toolbar>
    <ToggleGroup
      hoverIndicator={{ color: 'decorative-blue' }}
      options={['One']}
      round="medium"
    />
    <Video margin="none" />
    <Wizard steps={wizardSteps}>
      <WizardHeader background="background-front" />
      <WizardProgress round="medium" />
      <WizardStepHeader gap="small" />
      <WizardContent width="medium" />
      <WizardFooter pad="medium" />
    </Wizard>
    <WorldMap
      color="decorative-blue"
      continents={[{ color: 'foreground-critical', name: 'Africa' }]}
      hoverColor="foreground-critical"
      places={[{ color: 'decorative-blue', location: [0, 0], name: 'Origin' }]}
    />
  </Grommet>
);
