/* eslint-disable react/jsx-key */
import React, { useContext, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Anchor,
  Box,
  CheckBox,
  RangeInput,
  Grommet,
  Page,
  PageContent,
  PageHeader,
  ThemeContext,
  Accordion,
  AccordionPanel,
  Notification,
  DateInput,
  Pagination,
  Spinner,
  Tag,
  Select,
  FormField,
  CheckBoxGroup,
  RadioButtonGroup,
  TextInput,
  SelectMultiple,
  TextArea,
  NameValueList,
  NameValuePair,
  FileInput,
  StarRating,
  ThumbsRating,
  DataTable,
  Meter,
  Text,
} from 'grommet';
import { User, Previous } from 'grommet-icons';
import { hpe } from 'grommet-theme-hpe';
import { current as hpeCurrent } from '../../themes/theme';
import ContentPane from '../../components/ContentPane';
import { Compare, ModeContext, StyleInProgress } from './components';
import {
  Accordions,
  Anchors,
  Buttons,
  Headings,
  Menus,
  Paginations,
  Paragraphs,
  Tabs,
  Texts,
  ToggleGroups,
} from './content';

const textSizes = [
  'xsmall',
  'small',
  'medium',
  'large',
  'xlarge',
  'xxlarge',
  '3xl',
  '4xl',
  '5xl',
  '6xl',
];

const StickerSheet = () => {
  const [mode, setMode] = React.useState('Compare diffs');
  const [direction, setDirection] = React.useState('row');
  const theme = useContext(ThemeContext);
  const contextValue = useMemo(() => {
    return {
      mode,
      direction,
    };
  }, [mode, direction]);
  return (
    <Grommet
      theme={hpe}
      background="background-back"
      themeMode={theme.dark ? 'dark' : 'light'}
    >
      <ModeContext.Provider value={contextValue}>
        <Page kind="full" pad={{ bottom: 'xlarge' }}>
          <PageContent align="start" gap="medium">
            <PageHeader
              title="Sticker sheet"
              subtitle={`To be used for visual regression comparisons from 
            current theme to the next.`}
              parent={
                <Anchor as={Link} to="/" label="Home" icon={<Previous />} />
              }
              actions={
                <Box direction="row" gap="xsmall">
                  <FormField label="Layout">
                    <CheckBox
                      label="View side-by-side"
                      onChange={e =>
                        setDirection(e.target.checked ? 'row' : '')
                      }
                      checked={direction === 'row' ? true : false}
                      toggle
                    />
                  </FormField>
                  <FormField
                    label="View mode"
                    htmlFor="view-mode__input"
                    name="view-mode"
                  >
                    <Select
                      id="view-mode"
                      name="view-mode"
                      options={['v5', 'next', 'Compare diffs']}
                      value={mode}
                      onChange={({ option }) => setMode(option)}
                    />
                  </FormField>
                </Box>
              }
              width="100%"
            />
            <Anchors textSizes={textSizes} />
            <Texts textSizes={textSizes} />
            <Paragraphs />
            <Headings />
            <Buttons />
            <Menus />
            <ToggleGroups />
            <Paginations />
            <Tabs />
            <Accordions />
            <ContentPane>
              <Box gap="small">
                <Compare>
                  <User size="small" />
                </Compare>
                <Compare>
                  <User />
                </Compare>
                <Compare>
                  <User size="large" />
                </Compare>
                <Compare>
                  <User size="xlarge" />
                </Compare>
              </Box>
            </ContentPane>

            {/* <Box>
          <Avatar background="blue!" size="small">
            <Text weight={500}>TS</Text>
          </Avatar>
          <Avatar background="blue!">
            <Text weight={500}>TS</Text>
          </Avatar>
          <Avatar background="blue!" size="large">
            <Text weight={500}>TS</Text>
          </Avatar>
        </Box> */}
            <ContentPane>
              <Compare>
                <CheckBox label="Checkbox label" />
              </Compare>
              <Compare guidingChild="last">
                <FormField label="Label">
                  <CheckBox label="Checkbox label" />
                </FormField>
              </Compare>
              <Compare guidingChild="last">
                <FormField label="Label" error="There is an error.">
                  <CheckBox label="Checkbox label" />
                </FormField>
              </Compare>
            </ContentPane>
            <ContentPane>
              <StyleInProgress />
              <Compare>
                <CheckBox label="Switch label" toggle />
                <CheckBox label="Switch label" toggle checked />
                <CheckBox label="Switch label" toggle disabled />
              </Compare>
            </ContentPane>
            <ContentPane>
              <Compare guidingChild="last">
                <CheckBoxGroup
                  options={[
                    { label: 'Option 1' },
                    { label: 'Option 2' },
                    { label: 'Option 3', disabled: true },
                  ]}
                  value={['Option 2']}
                />
              </Compare>
              <Compare>
                <FormField label="Label">
                  <CheckBoxGroup
                    options={['Option 1', 'Option 2', 'Option 3']}
                    value={['Option 2']}
                  />
                </FormField>
              </Compare>
            </ContentPane>
            <ContentPane>
              <StyleInProgress />
              <Compare guidingChild="last">
                <RadioButtonGroup
                  options={['Option 1', 'Option 2', 'Option 3']}
                  value="Option 2"
                  name="radio-group"
                />
              </Compare>
              <Compare>
                <FormField label="Label">
                  <RadioButtonGroup
                    options={['Option 1', 'Option 2', 'Option 3']}
                    value="Option 2"
                    name="radio-group-form"
                  />
                </FormField>
              </Compare>
            </ContentPane>
            <ContentPane>
              <Compare>
                <StarRating name="rating" value={2} />
              </Compare>
            </ContentPane>
            <ContentPane>
              <Compare>
                <ThumbsRating name="like-dislike" value="like" />
              </Compare>
            </ContentPane>
            <ContentPane>
              <Compare guidingChild="last">
                <FormField
                  label="Label"
                  help="Here is help text"
                  info="Here is info text"
                >
                  <TextInput value="Value" />
                </FormField>
              </Compare>
              <Compare guidingChild="last">
                <FormField label="Disabled input" disabled>
                  <TextInput value="Value" disabled />
                </FormField>
              </Compare>
            </ContentPane>
            <ContentPane>
              <Compare>
                <DateInput
                  format="mm/dd/yyyy-mm/dd/yyyy"
                  inline
                  value={[
                    new Date().toISOString(),
                    new Date(+new Date() + 86400000 * 9).toISOString(),
                  ]}
                />
              </Compare>
            </ContentPane>
            <ContentPane>
              <Compare>
                <TextArea placeholder="Type something" />
              </Compare>
            </ContentPane>
            <ContentPane>
              <Compare>
                <Select
                  options={['Option 1', 'Option 2', 'Option 3']}
                  placeholder="Select option"
                />
              </Compare>
            </ContentPane>
            <ContentPane>
              <Compare>
                <SelectMultiple
                  options={['Option 1', 'Option 2', 'Option 3']}
                  value={['Option 1', 'Option 2']}
                  showSelectedInline
                />
              </Compare>
            </ContentPane>
            <ContentPane>
              <Compare>
                <FileInput />
              </Compare>
            </ContentPane>
            <ContentPane>
              <Compare>
                <RangeInput value={60} />
              </Compare>
            </ContentPane>
            <ContentPane>
              <Box gap="medium">
                <Compare>
                  <Spinner size="xsmall" />
                </Compare>
                <Compare>
                  <Spinner size="small" />
                </Compare>
                <Compare>
                  <Spinner size="medium" />
                </Compare>
                <Compare>
                  <Spinner size="large" />
                </Compare>
              </Box>
            </ContentPane>
            <ContentPane>
              <Compare>
                <Box align="start" gap="small">
                  <Tag value="Value" name="Name" />
                  <Tag value="Value" name="Name" onRemove={() => {}} />
                </Box>
              </Compare>
            </ContentPane>
            <ContentPane>
              <Compare>
                <NameValueList>
                  <NameValuePair name="City">San Francisco</NameValuePair>
                  <NameValuePair name="State">California</NameValuePair>
                </NameValueList>
              </Compare>
            </ContentPane>
            <ContentPane>
              <Box gap="medium">
                <Compare>
                  <Notification
                    status="critical"
                    message="this is a message"
                    title="this is a title"
                  />
                </Compare>
                <Compare>
                  <Notification
                    status="warning"
                    message="this is a message"
                    title="this is a title"
                    onClose={() => {}}
                  />
                </Compare>
                <Compare>
                  <Notification
                    status="normal"
                    message="this is a message"
                    title="this is a title"
                    onClose={() => {}}
                  />
                </Compare>
                <Compare>
                  <Notification
                    status="info"
                    message="this is a message"
                    title="this is a title"
                    onClose={() => {}}
                  />
                </Compare>
                <Compare>
                  <Notification
                    status="unknown"
                    message="this is a message"
                    title="this is a title"
                    onClose={() => {}}
                  />
                </Compare>
              </Box>
            </ContentPane>
            <ContentPane>
              <Compare>
                <PageHeader
                  title="Page title"
                  subtitle="Here is a subtitle for the page."
                />
              </Compare>
            </ContentPane>
            <ContentPane>
              <Compare>
                <DataTable
                  onSelect={() => {}}
                  select={['4352351']}
                  columns={[
                    {
                      property: 'id',
                      header: 'ID',
                    },
                    {
                      property: 'firstName',
                      header: 'First name',
                    },
                    {
                      property: 'lastName',
                      header: 'Last name',
                      units: 'GB',
                    },
                  ]}
                  data={[
                    {
                      id: '2341234',
                      firstName: 'Taylor',
                      lastName: 'Seamans',
                    },
                    {
                      id: '4352351',
                      firstName: 'Oliver',
                      lastName: 'Plunkett',
                    },
                    {
                      id: '6439201',
                      firstName: 'Joelle',
                      lastName: 'Gregory',
                    },
                  ]}
                  sort={{
                    property: 'firstName',
                    direction: 'asc',
                  }}
                />
              </Compare>
            </ContentPane>
            <ContentPane>
              <Compare>
                <Meter
                  type="circle"
                  values={[
                    {
                      value: 40,
                    },
                    {
                      value: 30,
                    },
                    {
                      value: 10,
                    },
                    {
                      value: 10,
                    },
                    {
                      value: 10,
                    },
                  ]}
                  max={100}
                  size="small"
                  thickness="medium"
                />
              </Compare>
            </ContentPane>
            <ContentPane>
              <Box gap="small">
                {Object.keys(hpeCurrent.global.edgeSize).map(
                  size =>
                    size !== 'responsiveBreakpoint' && (
                      <Compare key={size}>
                        <Box
                          alignSelf="start"
                          background={{ color: 'blue', opacity: 'medium' }}
                          pad={{ left: size }}
                          height="xxsmall"
                          flex={false}
                        />
                      </Compare>
                    ),
                )}
              </Box>
            </ContentPane>
            <ContentPane overflow={{ horizontal: 'auto' }}>
              <Box gap="small">
                {Object.keys(hpeCurrent.global.size).map(
                  size =>
                    size !== 'responsiveBreakpoint' && (
                      <Compare key={size}>
                        <Box
                          alignSelf="start"
                          background={{ color: 'blue', opacity: 'medium' }}
                          width={size}
                          height={size}
                          flex={false}
                        />
                      </Compare>
                    ),
                )}
              </Box>
            </ContentPane>
          </PageContent>
        </Page>
      </ModeContext.Provider>
    </Grommet>
  );
};

export default StickerSheet;
