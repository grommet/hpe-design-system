/* eslint-disable react/jsx-key */
import React, { useContext, useEffect, useMemo } from 'react';
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
  Notification,
  Spinner,
  Tag,
  Select,
  FormField,
  SelectMultiple,
  NameValueList,
  NameValuePair,
  FileInput,
  DataTable,
  Meter,
  Tab,
  Tabs,
} from 'grommet';
import { User, Previous } from 'grommet-icons';
import { hpe } from 'grommet-theme-hpe';
import { current as hpeCurrent } from '../../themes/theme';
import ContentPane from '../../components/ContentPane';
import { Compare, ModeContext, TabContent } from './components';
import {
  Accordions,
  Anchors,
  Buttons,
  Checkboxes,
  CheckboxGroups,
  DateInputs,
  FileInputs,
  Headings,
  Menus,
  Paginations,
  Paragraphs,
  RadioButtonGroups,
  RangeInputs,
  SelectMultiples,
  Selects,
  StarRatings,
  Switches,
  Tabs as TabsContent,
  TextAreas,
  TextInputs,
  Texts,
  ThumbsRatings,
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
  const [activeIndex, setActiveIndex] = React.useState(
    Number.parseInt(sessionStorage.getItem('activeIndex'), 10) || 0,
  );
  const theme = useContext(ThemeContext);
  const contextValue = useMemo(() => {
    return {
      mode,
      direction,
    };
  }, [mode, direction]);

  useEffect(() => {
    sessionStorage.setItem('activeIndex', activeIndex);
  }, [activeIndex]);

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
            <Tabs
              activeIndex={activeIndex}
              onActive={index => setActiveIndex(index)}
              alignControls="start"
            >
              <Tab title="Type">
                <TabContent>
                  <Anchors textSizes={textSizes} />
                  <Texts textSizes={textSizes} />
                  <Paragraphs />
                  <Headings />
                </TabContent>
              </Tab>
              <Tab title="Controls">
                <TabContent>
                  <Buttons />
                  <Menus />
                  <ToggleGroups />
                  <Paginations />
                  <TabsContent />
                  <Accordions />
                </TabContent>
              </Tab>
              <Tab title="Inputs">
                <TabContent>
                  <Checkboxes />
                  <Switches />
                  <CheckboxGroups />
                  <RadioButtonGroups />
                  <StarRatings />
                  <ThumbsRatings />
                  <TextInputs />
                  <DateInputs />
                  <TextAreas />
                  <Selects />
                  <SelectMultiples />
                  <FileInputs />
                  <RangeInputs />
                </TabContent>
              </Tab>
              <Tab title="Others">
                <TabContent>
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
                                background={{
                                  color: 'blue',
                                  opacity: 'medium',
                                }}
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
                                background={{
                                  color: 'blue',
                                  opacity: 'medium',
                                }}
                                width={size}
                                height={size}
                                flex={false}
                              />
                            </Compare>
                          ),
                      )}
                    </Box>
                  </ContentPane>
                </TabContent>
              </Tab>
            </Tabs>
          </PageContent>
        </Page>
      </ModeContext.Provider>
    </Grommet>
  );
};

export default StickerSheet;
