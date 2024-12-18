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
  Tab,
  Tabs,
  SelectMultiple,
} from 'grommet';
import { Previous } from 'grommet-icons';
import { hpe } from 'grommet-theme-hpe';
import { current as hpeCurrent } from '../../themes/theme';
import { themes as allThemes } from '../../themes/theme';
import { ModeContext, TabContent } from './components';
import {
  Accordions,
  Anchors,
  Buttons,
  Checkboxes,
  CheckboxGroups,
  ContentSizes,
  DataTables,
  DateInputs,
  FileInputs,
  Headings,
  Icons,
  Menus,
  Meters,
  NameValueLists,
  Notifications,
  PageHeaders,
  Paginations,
  Paragraphs,
  RadioButtonGroups,
  RangeInputs,
  SelectMultiples,
  Selects,
  Spacing,
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
import ContentPane from '../../components/ContentPane';

const themeOptions = Object.entries(allThemes).map(([key, value]) => ({
  label: key,
  value,
}));
themeOptions.splice(0, 0, { label: 'hpe', value: hpe });

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
  const [themes, setThemes] = React.useState(
    JSON.parse(sessionStorage.getItem('themes')) || [],
  );
  const [activeIndex, setActiveIndex] = React.useState(
    Number.parseInt(sessionStorage.getItem('activeIndex'), 10) || 0,
  );
  const theme = useContext(ThemeContext);
  const contextValue = useMemo(() => {
    return {
      mode,
      direction,
      themes,
    };
  }, [mode, direction, themes]);

  useEffect(() => {
    sessionStorage.setItem('activeIndex', activeIndex);
  }, [activeIndex]);

  useEffect(() => {
    sessionStorage.setItem('themes', JSON.stringify(themes));
  }, [themes]);

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
                  <FormField
                    label="Themes"
                    htmlFor="themes__input"
                    name="themes"
                  >
                    <SelectMultiple
                      id="themes"
                      name="themes"
                      options={themeOptions}
                      value={themes}
                      onChange={({ value: nextValue }) => {
                        setThemes(nextValue);
                      }}
                      limit={2}
                      showSelectedInline
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
              <Tab title="Layout">
                <TabContent>
                  <PageHeaders />
                  <Spacing theme={hpeCurrent} />
                  <ContentSizes theme={hpeCurrent} />
                </TabContent>
              </Tab>

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
            </Tabs>
          </PageContent>
        </Page>
      </ModeContext.Provider>
    </Grommet>
  );
};

export default StickerSheet;
