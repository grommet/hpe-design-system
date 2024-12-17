/* eslint-disable react/jsx-key */
import React, { useContext, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Anchor,
  Box,
  CheckBox,
  Grommet,
  Page,
  PageContent,
  PageHeader,
  ThemeContext,
  Select,
  FormField,
  Meter,
  Tab,
  Tabs,
} from 'grommet';
import { Previous } from 'grommet-icons';
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
  DataTables,
  DateInputs,
  FileInputs,
  Headings,
  Icons,
  Menus,
  Meters,
  NameValueLists,
  Notifications,
  Paginations,
  Paragraphs,
  RadioButtonGroups,
  RangeInputs,
  SelectMultiples,
  Selects,
  Spinners,
  StarRatings,
  Switches,
  Tabs as TabsContent,
  Tags,
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
                  <Tags />
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
              <Tab title="Visualizations">
                <TabContent>
                  <Icons />
                  <Spinners />
                  <NameValueLists />
                  <Notifications />
                  <DataTables />
                  <Meters />
                </TabContent>
              </Tab>
              <Tab title="Others">
                <TabContent>
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
                      <PageHeader
                        title="Page title"
                        subtitle="Here is a subtitle for the page."
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
