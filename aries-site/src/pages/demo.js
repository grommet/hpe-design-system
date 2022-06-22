import React, { useContext, useState } from 'react';
import {
  Anchor,
  Box,
  Button,
  Collapsible,
  DropButton,
  Footer,
  FormField,
  Heading,
  List,
  Menu,
  Page,
  PageContent,
  PageHeader,
  Paragraph,
  RadioButtonGroup,
  ResponsiveContext,
  Sidebar,
  Text,
  ThemeContext,
} from 'grommet';
import {
  ChapterAdd,
  FormDown,
  FormUp,
  FormPrevious,
  Menu as MenuIcon,
  More,
  MoreVertical,
  Pin,
  ShareRounded,
  Terminal,
} from 'grommet-icons';

import { Meta } from '../components';
import { deepMerge } from 'grommet/utils';

const Demo = () => {
  const breakpoint = useContext(ResponsiveContext);
  const theme = useContext(ThemeContext);
  const [page, setPage] = useState('figmaSpec');
  const [topicsOpen, setTopicsOpen] = useState(false);

  const pageHeaders = {
    figmaSpec: (
      <PageHeader
        title={`Back to the Future @ ${breakpoint}`}
        subtitle={`"Roads? Where we're going, we don't need roads," and the rest of your favorite quotes.`}
        parent={
          <Anchor
            // why is presence of icon adding height to anchor?
            icon={<FormPrevious />}
            label="Home"
            onClick={() => setPage('figmaSpec')}
          />
        }
        actions={<ActionMenu option="optionA" />}
        pad={theme.pageHeader.pad}
      />
    ),
    manyActions: (
      <PageHeader
        title={`Back to the Future @ ${breakpoint}`}
        subtitle={`"Roads? Where we're going, we don't need roads," and the rest of your favorite quotes.`}
        actions={<ActionMenu option="optionC" />}
        pad={theme.pageHeader.pad}
        parent={
          <Anchor
            // why is presence of icon adding height to anchor?
            icon={<FormPrevious />}
            label="Home"
            onClick={() => setPage('figmaSpec')}
          />
        }
      />
    ),
    ltr: (
      <PageHeader
        title={`Back to the Future @ ${breakpoint}`}
        subtitle={`"Roads? Where we're going, we don't need roads," and the rest of your favorite quotes.`}
        parent={
          <Anchor
            // why is presence of icon adding height to anchor?
            icon={<FormPrevious />}
            label="Home"
            onClick={() => setPage('figmaSpec')}
          />
        }
        actions={<ActionMenu option="optionB" />}
        pad={theme.pageHeader.pad}
      />
    ),
    noPrimary: (
      <PageHeader
        title={`Back to the Future @ ${breakpoint}`}
        subtitle={`"Roads? Where we're going, we don't need roads," and the rest of your favorite quotes.`}
        parent={
          <Anchor
            // why is presence of icon adding height to anchor?
            icon={<FormPrevious />}
            label="Home"
            onClick={() => setPage('figmaSpec')}
          />
        }
        actions={<ActionMenu option="optionD" />}
        pad={theme.pageHeader.pad}
        gridProps={{
          areas: [
            ['parent', 'null'],
            ['title', 'actions'],
            ['subtitle', 'actions'],
          ],
        }}
      />
    ),
    'glpc-top': (
      <PageHeader
        title={`Private Cloud Home @ ${breakpoint}`}
        actions={<GLPCActionMenu />}
        pad={theme.pageHeader.pad}
      />
    ),
    'glpc-child': (
      <PageHeader
        title={`Service Status @ ${breakpoint}`}
        parent={
          <Anchor
            // why is presence of icon adding height to anchor?
            icon={<FormPrevious />}
            label="Home"
            onClick={() => setPage('glpc-top')}
          />
        }
        actions={<GLPCActionMenu />}
        pad={theme.pageHeader.pad}
      />
    ),
    'glpc-top-ham': (
      <PageHeader
        title={
          <Box direction="row">
            <Button
              alignSelf="start"
              icon={<MenuIcon />}
              tip="Open menu"
              onClick={() => {}}
            />
            <Heading {...theme.pageHeader.title}>
              Service Status @ {breakpoint}
            </Heading>
          </Box>
        }
        actions={<GLPCActionMenu />}
        pad={theme.pageHeader.pad}
      />
    ),
    'glpc-child-ham': (
      <PageHeader
        title={
          <Box direction="row">
            <Button
              alignSelf="start"
              icon={<MenuIcon />}
              tip="Open menu"
              onClick={() => {}}
            />
            <Heading {...theme.pageHeader.title}>
              Service Status @ {breakpoint}
            </Heading>
          </Box>
        }
        actions={<GLPCActionMenu />}
        pad={theme.pageHeader.pad}
        parent={
          <Anchor
            // why is presence of icon adding height to anchor?
            icon={<FormPrevious />}
            label="Home"
            onClick={() => setPage('glpc-top-ham')}
          />
        }
      />
    ),
    'glpc-top-ham-location': (
      <ThemeContext.Extend
        value={{
          pageHeader: {
            xsmall: {
              actions: {
                border: true,
              },
              areas: [
                ['parent', 'actions'],
                ['title', 'actions'],
                ['subtitle', 'null'],
              ],
              columns: [['small', 'flex'], 'auto'],
              rows: ['auto', 'auto', 'auto'],
              gap: { row: 'xsmall', column: 'medium' },
            },
            xlarge: {
              actions: {
                border: true,
              },
              areas: [
                ['parent', 'actions'],
                ['title', 'actions'],
                ['subtitle', 'null'],
              ],
              columns: [['medium', 'flex'], 'auto'],
              rows: ['auto', 'auto', 'auto'],
              gap: { row: 'xsmall', column: 'large' },
            },
          },
        }}
      >
        <PageHeader
          title={
            <Box direction="row">
              <Button
                alignSelf="start"
                icon={<MenuIcon />}
                tip="Open menu"
                onClick={() => {}}
              />
              <Heading {...theme.pageHeader.title}>
                Service Status @ {breakpoint}
              </Heading>
            </Box>
          }
          subtitle="View and adjust the service's status."
          actions={<GLPCActionMenu2 />}
          parent={
            <Box direction="row" justify="between" fill>
              <Anchor
                // why is presence of icon adding height to anchor?
                icon={<FormPrevious />}
                label="Home"
                onClick={() => setPage('glpc-top-ham')}
              />{' '}
              <SelectLocation />
            </Box>
          }
          pad={theme.pageHeader.pad}
          gridProps={{
            areas: [
              ['parent', 'parent'],
              ['title', 'actions'],
              ['subtitle', 'null'],
            ],
            // align: 'end',
          }}
        />
      </ThemeContext.Extend>
    ),
  };

  return (
    <>
      <Meta title="PageHeader Demo Page" />
      <Box direction="row" height={{ min: 'large' }} background="background">
        {['glpc-top', 'glpc-child'].includes(page) && <SidebarNav />}
        <Page background="background">
          <PageContent gap="medium">
            {pageHeaders[page]}
            <Paragraph margin="none">
              Good evening, I'm Doctor Emmett Brown. I'm standing on the parking
              lot of Twin Pines Mall. It's Saturday morning, October 26, 1985,
              1:18 a.m. and this is temporal experiment number one. C'mon, Einy,
              hey hey boy, get in there, that a boy, in you go, get down, that's
              it.{' '}
            </Paragraph>
            <Button
              alignSelf="start"
              label={topicsOpen ? 'Hide topics' : 'Show topics'}
              icon={topicsOpen ? <FormUp /> : <FormDown />}
              onClick={() => setTopicsOpen(!topicsOpen)}
            />
            <Collapsible open={topicsOpen}>
              <Heading level={2} size="small" margin="none">
                Discussion Topics
              </Heading>
              <List
                data={[
                  '• Treatment of actions and overflow menu',
                  '--- Overflow menu',
                  '--- Page title wrapping',
                  '--- Opportunity for smarter button bar behavior',
                  '--- Ordering / prioritization of action menu items',
                  "--- Inconsistent placement of actions menu --> Actions can simply collapse into the overflow menu in their current position, however when primary button is present, the menu drops below the identifier. We don't know what types of buttons a caller is placing inside actions",
                  "--- Greg's comment re: >=2 actions of same priority should be placed in overflow menu",
                  '--- Meatball vs. kebab',
                  '--- Does an actions menu have sections within it?',
                  '• Vertical spacing - Responsibility of PageHeader or Page?',
                  '• Region context selector',
                  '--- Alot of hurdles to get the behavior shown here. --> Add ability to pass custom gridAreas as a child of Grid?',
                  '• Tweaks and/or enhancements',
                  '--- Action padding for alignment with Heading --> theme adjustment',
                  "--- Define columns as `columns: [['min-width', 'flex'], 'auto'],` to provide greatest flexibility --> theme adjustment",
                  '--- Heading font size and padding step down at <= small  --> do we want to replicate this in Figma?',
                ]}
                // border="bottom"
                pad={{ vertical: 'xsmall' }}
                width="small"
              />
            </Collapsible>
            <Box
              align="start"
              alignSelf="start"
              background="background-back"
              pad={{ top: 'small', horizontal: 'large', bottom: 'medium' }}
              round="small"
              // fill={false}
            >
              <FormField label="PageHeader Variant">
                <RadioButtonGroup
                  options={[
                    {
                      label: 'Current Spec',
                      value: 'figmaSpec',
                    },
                    {
                      label: 'Many Action Types',
                      value: 'manyActions',
                    },
                    {
                      label: 'No Primary',
                      value: 'noPrimary',
                    },
                    {
                      label: 'Left to Right',
                      value: 'ltr',
                    },
                    {
                      label: 'HPE GreenLake Private Cloud - Current Designs',
                      value: 'glpc-top-ham-location',
                    },
                    {
                      label:
                        'HPE GreenLake Private Cloud - Region selector in actions menu',
                      value: 'glpc-child',
                    },
                    {
                      label: 'HPE GreenLake Private Cloud - Sidebar Menu',
                      value: 'glpc-top',
                    },
                  ]}
                  value={page}
                  onChange={e => setPage(e.target.value)}
                />
              </FormField>
            </Box>
          </PageContent>
        </Page>
      </Box>
    </>
  );
};

export default Demo;

const ActionMenu = ({ option = 'optionA' }) => {
  const breakpoint = useContext(ResponsiveContext);
  const theme = useContext(ThemeContext);
  const actions = [
    {
      label: 'Add Gigawatts',
      onClick: () => {},
      render: <Button primary label="Add Gigawatts" onClick={() => {}} />,
    },
    {
      label: 'Select Year',
      onClick: () => {},
      render: <Button secondary label="Select Year" onClick={() => {}} />,
    },
    {
      label: 'Set Velocity',
      onClick: () => {},
      render: <Button secondary label="Set Velocity" onClick={() => {}} />,
    },
    {
      label: 'Share Page',
      onClick: () => {},
      render: (
        <Button icon={<ShareRounded />} tip="Share page" onClick={() => {}} />
      ),
    },
    {
      label: 'Pin',
      onClick: () => {},
      render: <Button icon={<Pin />} tip="Pin page" onClick={() => {}} />,
    },
  ];

  const actionPlacements = {
    optionA: {
      xsmall: {
        detail: actions.slice(0, 1),
        overflow: actions.slice(1),
      },
      small: {
        primary: actions[0],
        detail: undefined,
        overflow: actions.slice(1),
      },
      medium: {
        primary: actions[0],
        // detail: actions.slice(1, 3),
        overflow: actions.slice(1, 3),
      },
      large: {
        primary: actions[0],
        detail: actions.slice(1, 3).reverse(),
        overflow: undefined,
      },
      xlarge: {
        primary: actions[0],
        detail: actions.slice(1, 3).reverse(),
        overflow: undefined,
      },
    },
    optionB: {
      xsmall: {
        detail: actions.slice(0, 1),
        overflow: actions.slice(1, 3),
      },
      small: {
        detail: actions.slice(0, 1),
        overflow: actions.slice(1, 3),
      },
      medium: {
        detail: actions.slice(0, 1),
        overflow: actions.slice(1),
      },
      large: {
        detail: actions.slice(0, 3),
        // overflow: actions.slice(1, 3),
        // utils: actions.slice(3),
      },
      xlarge: {
        detail: actions.slice(0, 3),
        overflow: undefined,
        // utils: actions.slice(3),
      },
    },
    optionC: {
      xsmall: {
        detail: actions.slice(0, 1),
        overflow: actions.slice(1),
      },
      small: {
        primary: actions[0],
        detail: undefined,
        overflow: actions.slice(1),
      },
      medium: {
        primary: actions[0],
        detail: actions.slice(3).reverse(),
        overflow: actions.slice(1, 3),
      },
      large: {
        primary: actions[0],
        detail: actions.slice(1).reverse(),
        overflow: undefined,
      },
      xlarge: {
        primary: actions[0],
        detail: actions.slice(1).reverse(),
        overflow: undefined,
      },
    },
    optionD: {
      xsmall: {
        // detail: actions.slice(0, 1),
        overflow: actions.slice(1, 3),
      },
      small: {
        // primary: actions[0],
        detail: undefined,
        overflow: actions.slice(1, 3),
      },
      medium: {
        // primary: actions[0],
        detail: actions.slice(1, 3),
        // overflow: actions.slice(1, 3),
      },
      large: {
        // primary: actions[0],
        detail: actions.slice(1, 3).reverse(),
        overflow: undefined,
      },
      xlarge: {
        // primary: actions[0],
        detail: actions.slice(1, 3).reverse(),
        overflow: undefined,
      },
    },
  };

  return (
    <Box
      direction="row"
      gap="xsmall"
      alignSelf={breakpoint === 'xsmall' ? 'start' : undefined}
    >
      {actionPlacements[option][breakpoint].utils?.map(item => item.render)}
      {actionPlacements[option][breakpoint].detail?.map(item => item.render)}
      {actionPlacements[option][breakpoint].overflow?.length >= 1 && (
        <Menu
          icon={<More />}
          items={actionPlacements[option][breakpoint].overflow}
          dropAlign={{ top: 'bottom', right: 'right' }}
        />
      )}
      {actionPlacements[option][breakpoint].primary?.render}
    </Box>
  );
};

const GLPCActionMenu = () => {
  const breakpoint = useContext(ResponsiveContext);
  const theme = useContext(ThemeContext);
  const actions = [
    {
      label: 'Region',
      render: <SelectLocation breakpoint={breakpoint} />,
    },
    {
      label: 'Add dashboard item',
      onClick: () => {},
      render: <Button icon={<ChapterAdd />} tip="Add dashbord item" />,
    },
    {
      label: 'Open terminal',
      onClick: () => {},
      render: <Button icon={<Terminal />} tip="Open terminal" />,
    },
  ];
  const actionPlacements = {
    xsmall: {
      detail: undefined,
      overflow: actions,
    },
    small: {
      detail: undefined,
      overflow: actions,
    },
    medium: {
      detail: actions.slice(0, 1),
      overflow: actions.slice(1),
    },
    large: {
      detail: actions,
      overflow: undefined,
    },
    xlarge: {
      detail: actions,
      overflow: undefined,
    },
  };

  return (
    <Box
      direction="row"
      gap={['xsmall', 'small'].includes(breakpoint) ? 'xsmall' : 'small'}
      pad={
        theme.pageHeader.actions.pad[breakpoint] || theme.pageHeader.actions.pad
      }
    >
      {actionPlacements[breakpoint].detail?.map(item => item.render)}
      {actionPlacements[breakpoint].overflow?.length >= 1 && (
        <Menu
          icon={<MoreVertical />}
          items={actionPlacements[breakpoint].overflow}
          dropAlign={{ top: 'bottom', right: 'right' }}
        />
      )}
    </Box>
  );
};

const GLPCActionMenu2 = () => {
  const breakpoint = useContext(ResponsiveContext);
  const theme = useContext(ThemeContext);
  const actions = [
    {
      label: 'Add dashboard item',
      onClick: () => {},
      render: <Button icon={<ChapterAdd />} tip="Add dashbord item" />,
    },
    {
      label: 'Open terminal',
      onClick: () => {},
      render: <Button icon={<Terminal />} tip="Open terminal" />,
    },
  ];
  const actionPlacements = {
    xsmall: {
      detail: undefined,
      overflow: actions,
    },
    small: {
      detail: actions,
    },
    medium: {
      detail: actions,
    },
    large: {
      detail: actions,
      overflow: undefined,
    },
    xlarge: {
      detail: actions,
      overflow: undefined,
    },
  };

  return (
    <Box
      direction="row"
      gap="xsmall"
      pad={
        theme.pageHeader.actions.pad[breakpoint] || theme.pageHeader.actions.pad
      }
    >
      {actionPlacements[breakpoint].detail?.map(item => item.render)}
      {actionPlacements[breakpoint].overflow?.length >= 1 && (
        <Menu
          icon={<MoreVertical />}
          items={actionPlacements[breakpoint].overflow}
          dropAlign={{ top: 'bottom', right: 'right' }}
        />
      )}
    </Box>
  );
};

const SelectLocation = ({ breakpoint }) => {
  const [location, setLocation] = useState('BangaloreUPC');
  const locations = ['BangaloreUPC', 'AP-Mumbai-Site'];
  return (
    <DropButton
      tip="Select region"
      reverse
      label={location}
      icon={<FormDown />}
      dropAlign={{ top: 'bottom' }}
      dropContent={
        <List
          data={locations}
          onClickItem={({ item }) => {
            setLocation(item);
          }}
        />
      }
      // kind="toolbar"
    />
  );
};

const SidebarNav = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      {!sidebarOpen && (
        <Sidebar>
          <Button
            alignSelf="start"
            icon={<MenuIcon />}
            tip="Open menu"
            onClick={() => setSidebarOpen(true)}
          />
        </Sidebar>
      )}
      <Collapsible direction="horizontal" open={sidebarOpen}>
        <Sidebar background="blue!" width="small" align="start">
          <Button
            icon={<MenuIcon />}
            tip="Close menu"
            onClick={() => setSidebarOpen(false)}
          />
          <Button label="Item 1" onClick={() => {}} />
          <Button label="Item 2" onClick={() => {}} />
          <Button label="Item 3" onClick={() => {}} />
        </Sidebar>
      </Collapsible>
    </>
  );
};
