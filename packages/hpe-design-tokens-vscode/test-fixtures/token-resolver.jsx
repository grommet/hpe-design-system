// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import {
  Accordion,
  Box,
  Paragraph,
  Anchor,
  CheckBox,
  Text,
  Heading,
  Button,
  Calendar,
  Cards,
  Carousel,
  Chart,
  DataChart,
  DataTable,
  Distribution,
  Drop,
  DropButton,
  FormField,
  Grommet,
  Image,
  Layer,
  List,
  Meter,
  Menu,
  Nav,
  RangeInput,
  RangeSelector,
  PageHeader,
  Select,
  SelectMultiple,
  Skeleton,
  Sidebar,
  Spinner,
  Stack,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Tabs,
  Tag,
  TextInput,
  Toolbar,
  Video,
  WorldMap,
} from 'grommet';
import { Alarm as NoticeIcon } from '@hpe-design/icons-grommet';

const chartValues = [{ value: [10, 20, 30] }];
const dataChartData = [
  { year: '2024', amount: 10 },
  { year: '2025', amount: 20 },
];
const dropTarget = { current: null };
const menuItems = [{ label: 'Option' }];

export const TokenResolverFixture = () => (
  <Grommet background={{ color: 'background-front' }}>
    <NoticeIcon color="icon-disabled" size="xxlarge" />;
    <Box width="medium" />
    <Box height={{ min: 'medium' }} />
    <Box width={{ max: 'xlarge' }} />
    <Box background={{ color: 'decorative-blue', opacity: 'weak' }} />
    <Box border={{ color: 'border-weak', side: 'bottom' }} />
    <Box background="background-front" />
    <Box background="decorative-blue" />
    <Box background="foreground-critical" />
    <Box background="brand" />
    <Paragraph size="small" />
    <Button gap="xsmall" pad="none" />
    <Anchor size="small" />
    <CheckBox pad="none" />
    <Text margin="small">Status</Text>
    <Heading margin="none">Title</Heading>
    <Paragraph margin="none" />
    <Anchor margin="xxsmall">Learn more</Anchor>
    <Accordion margin="small" />
    <Button color="decorative-blue" label="Save" margin="medium" />
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
    <DataTable columns={[]} data={[]} margin="none" />
    <Distribution gap="small" margin="small" values={[{ value: 1 }]} />
    <Drop
      background="background-front"
      margin="5xsmall"
      round="medium"
      target={dropTarget}
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
    <PageHeader margin="medium" title="Page title" />
    <RangeInput color="decorative-blue" value={50} />
    <RangeSelector
      color="foreground-critical"
      max={100}
      min={0}
      values={[25, 75]}
    />
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
    <Spinner margin="none" />
    <Stack margin="none">
      <Skeleton height="small" />
    </Stack>
    <Table margin="5xsmall">
      <TableBody>
        <TableRow>
          <TableCell>Row</TableCell>
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
    <Video margin="none" />
    <WorldMap color="decorative-blue" hoverColor="foreground-critical" />
  </Grommet>
);
