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
  TextInput,
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

const chartValues = [{ value: [10, 20, 30] }];
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
    <Grid columns={{ count: 'fit', size: 'medium' }} rows="medium">
      <Box />
    </Grid>
    <Paragraph size="small" />
    <Button gap="xsmall" pad="none" />
    <Anchor size="small" />
    <CheckBox pad="none" />
    <CheckBoxGroup gap="small" name="checks" options={['One']} />
    <Text margin="small">Status</Text>
    <Heading margin="none">Title</Heading>
    <Paragraph margin="none" />
    <Anchor margin="xxsmall">Learn more</Anchor>
    <Accordion margin="small" pad="medium" />
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
      margin="medium"
      pad="5xsmall"
      values={chartValues}
    />
    <DataChart
      data={dataChartData}
      series={[{ property: 'amount' }]}
      pad="medium"
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
    <Box id="diagram-start" />
    <Box id="diagram-end" />
    <Diagram
      connections={[
        {
          color: 'decorative-blue',
          fromTarget: 'diagram-start',
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
    <DropButton dropContent={<Box />} margin="5xsmall" />
    <FormField label="Name" margin="5xsmall">
      <TextInput />
    </FormField>
    <Image alt="Placeholder" margin="5xsmall" src="/placeholder.png" />
    <List
      background="background-front"
      data={['One', 'Two']}
      margin="none"
      pad="none"
    />
    <Layer background={{ color: 'decorative-blue' }} margin="5xsmall" />
    <Meter
      background="foreground-critical"
      color="decorative-blue"
      margin="medium"
      value={50}
    />
    <Menu
      dropBackground={{ color: 'decorative-blue' }}
      items={menuItems}
      margin="5xsmall"
    />
    <Nav gap="small">
      <Text>Navigation</Text>
    </Nav>
    <PageHeader
      background="background-front"
      gap="medium"
      margin="medium"
      title="Page title"
    />
    <Pagination numberItems={100} round="medium" />
    <RangeInput color="decorative-blue" value={50} />
    <RangeSelector
      color="foreground-critical"
      max={100}
      min={0}
      values={[25, 75]}
    />
    <RadioButtonGroup name="radio" options={['One']} round="medium" />
    <Select dropHeight="medium" margin="medium" options={['One']} />
    <SelectMultiple dropHeight="medium" margin="none" options={['One']} />
    <Skeleton
      height={{ max: 'medium' }}
      margin="5xsmall"
      pad="small"
      round="medium"
      width="medium"
    />
    <Sidebar pad="medium" />
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
    <Tag round="medium" value="Active" />
    <Toolbar background="background-front">
      <Button label="Action" />
    </Toolbar>
    <ToggleGroup options={['One']} round="medium" />
    <Video margin="none" />
    <Wizard steps={wizardSteps}>
      <WizardHeader background="background-front" />
      <WizardProgress round="medium" />
      <WizardStepHeader gap="small" />
      <WizardContent width="medium" />
      <WizardFooter pad="medium" />
    </Wizard>
    <WorldMap color="decorative-blue" hoverColor="foreground-critical" />
  </Grommet>
);
