/* eslint-disable react/jsx-key */
import React, { useContext, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Anchor,
  Grommet,
  Page,
  PageContent,
  PageHeader,
  Notification,
  ThemeContext,
  Tab,
  Tabs,
} from 'grommet';
import { Previous } from 'grommet-icons';
import { themes } from '../../themes/theme';
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
];

const StickerSheet = () => {
  const [
    mode,
    // setMode
  ] = React.useState('Compare diffs');
  const [
    direction,
    // setDirection
  ] = React.useState('row');
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
      theme={themes.v2}
      background="background-back"
      themeMode={theme.dark ? 'dark' : 'light'}
    >
      <ModeContext.Provider value={contextValue}>
        <Page kind="full" pad={{ bottom: '3xlarge' }}>
          <PageContent align="start" gap="medium">
            <PageHeader
              title="Sticker sheet"
              subtitle={`To be used for visual regression comparisons from 
            current theme to the next.`}
              parent={
                <Anchor as={Link} to="/" label="Home" icon={<Previous />} />
              }
              // hide actions from demo deploy
              // actions={
              //   <Box direction="row" gap="xsmall">
              //     <FormField label="Layout">
              //       <CheckBox
              //         label="View side-by-side"
              //         onChange={e =>
              //           setDirection(e.target.checked ? 'row' : '')
              //         }
              //         checked={direction === 'row' ? true : false}
              //         toggle
              //       />
              //     </FormField>
              //     <FormField
              //       label="View mode"
              //       htmlFor="view-mode__input"
              //       name="view-mode"
              //     >
              //       <Select
              //         id="view-mode"
              //         name="view-mode"
              //         options={['v5', 'next', 'Compare diffs']}
              //         value={mode}
              //         onChange={({ option }) => setMode(option)}
              //       />
              //     </FormField>
              //   </Box>
              // }
              width="100%"
            />
            <Notification
              status="info"
              message="This page provides a comparison between the existing and updated HPE theme. For each component, the version on the left is the existing styling and the verison on the right is the new styling."
              width={{ max: 'xlarge' }}
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
                  <Spacing theme={themes.v1} />
                  <ContentSizes theme={themes.v1} />
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
