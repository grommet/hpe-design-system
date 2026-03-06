import React, { useState, useMemo } from 'react';
import {
  Box,
  Card,
  CardBody,
  Grommet,
  Grid,
  Heading,
  Page,
  PageContent,
  PageHeader,
  Text,
  ToggleGroup,
} from 'grommet';
import { hpe } from 'grommet-theme-hpe';

const pages = [
  {
    href: '/playground/anchor',
    title: 'Anchor',
    description: '15 props',
    category: 'Controls',
  },
  {
    href: '/playground/checkbox',
    title: 'CheckBox',
    description: '8 props',
    category: 'Input',
  },
  {
    href: '/playground/box',
    title: 'Box',
    description: '31 props',
    category: 'Layout',
  },
  {
    href: '/playground/button',
    title: 'Button',
    description: '31 props',
    category: 'Controls',
  },
  {
    href: '/playground/form-field',
    title: 'FormField',
    description: '15 props',
    category: 'Input',
  },
  {
    href: '/playground/grid',
    title: 'Grid',
    description: '17 props',
    category: 'Layout',
  },
  {
    href: '/playground/heading',
    title: 'Heading',
    description: '13 props',
    category: 'Typography',
  },
  {
    href: '/playground/page-header',
    title: 'PageHeader',
    description: '12 props',
    category: 'Layout',
  },
  {
    href: '/playground/radio-button',
    title: 'RadioButton',
    description: '6 props',
    category: 'Input',
  },
  {
    href: '/playground/radio-button-group',
    title: 'RadioButtonGroup',
    description: '4 props',
    category: 'Input',
  },
  {
    href: '/playground/select',
    title: 'Select',
    description: '29 props',
    category: 'Controls',
  },
  {
    href: '/playground/text-input',
    title: 'TextInput',
    description: '25 props',
    category: 'Input',
  },
  {
    href: '/playground/notification',
    title: 'Notification',
    description: '9 props',
    category: 'Visualizations',
  },
  {
    href: '/playground/meter',
    title: 'Meter',
    description: '15 props',
    category: 'Visualizations',
  },
  {
    href: '/playground/avatar',
    title: 'Avatar',
    description: '4 props',
    category: 'Visualizations',
  },
  {
    href: '/playground/pagination',
    title: 'Pagination',
    description: '14 props',
    category: 'Visualizations',
  },
  {
    href: '/playground/name-value-list',
    title: 'NameValueList',
    description: '6 props',
    category: 'Visualizations',
  },
  {
    href: '/playground/text-area',
    title: 'TextArea',
    description: '9 props',
    category: 'Input',
  },
  {
    href: '/playground/paragraph',
    title: 'Paragraph',
    description: '8 props',
    category: 'Typography',
  },
  {
    href: '/playground/star-rating',
    title: 'StarRating',
    description: '2 props',
    category: 'Input',
  },
  {
    href: '/playground/props',
    title: 'Prop explorer',
    description: '736 props across 61 components',
    category: 'Tools',
  },
];

export default function PlaygroundIndex() {
  // Derive categories (include Tools this time)
  const filterCategories = useMemo(() => {
    const cats = [
      ...new Set(pages.map(p => p.category)),
    ];
    return cats;
  }, []);

  // Single-select; 'All' is the default
  const [activeFilter, setActiveFilter] = useState('All');

  const toggleGroupOptions = useMemo(
    () => [
      {
        label: `All (${pages.length})`,
        value: 'All',
      },
      ...filterCategories.map(cat => ({
        label: `${cat} (${pages.filter(p => p.category === cat).length})`,
        value: cat,
      })),
    ],
    [filterCategories],
  );

  const handleToggle = ({ value }) => {
    if (value) setActiveFilter(value);
  };

  const visiblePages = useMemo(
    () =>
      activeFilter === 'All'
        ? pages
        : pages.filter(p => p.category === activeFilter),
    [activeFilter],
  );

  return (
    <Grommet theme={hpe} full>
      <Page>
        <PageContent>
          <PageHeader
            title="Component playground"
            subtitle={
              'CSV-driven first-pass playgrounds. All props from ' +
              'grommet-props.csv, functions skipped, unions and ' +
              'objects shown with help text.'
            }
          />
          {/* Category filter toggles */}
          <Box margin={{ bottom: 'medium' }}>
            <ToggleGroup
              options={toggleGroupOptions}
              value={activeFilter}
              onToggle={handleToggle}
            />
          </Box>
          <Grid
            columns={{ count: 'fill', size: 'small' }}
            gap="medium"
          >
            {visiblePages.map(
              ({ href, title, description, category }) => (
                <Card
                  key={href}
                  tag="a"
                  href={href}
                  background="background-front"
                  elevation="small"
                  round="small"
                  style={{ textDecoration: 'none' }}
                >
                  <CardBody pad="medium" gap="xsmall">
                    <Text
                      size="xsmall"
                      color="text-weak"
                      weight="bold"
                    >
                      {category.toUpperCase()}
                    </Text>
                    <Heading
                      level={3}
                      size="small"
                      margin="none"
                    >
                      {title}
                    </Heading>
                    <Text size="small" color="text-weak">
                      {description}
                    </Text>
                  </CardBody>
                </Card>
              ),
            )}
          </Grid>
        </PageContent>
      </Page>
    </Grommet>
  );
}

PlaygroundIndex.getLayout = page => page;
