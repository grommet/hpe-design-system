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
    href: '/playground/props',
    title: 'Prop explorer',
    description: '500+ props across 43 components',
    category: 'Tools',
  },
];

export default function PlaygroundIndex() {
  // Derive filterable categories (exclude Tools)
  const filterCategories = useMemo(() => {
    const cats = [
      ...new Set(
        pages
          .filter(p => p.category !== 'Tools')
          .map(p => p.category),
      ),
    ];
    return cats;
  }, []);

  const [activeFilters, setActiveFilters] = useState(
    () => filterCategories,
  );

  const toggleGroupOptions = useMemo(
    () =>
      filterCategories.map(cat => ({
        label: `${cat} (${
          pages.filter(p => p.category === cat).length
        })`,
        value: cat,
      })),
    [filterCategories],
  );

  const handleToggle = ({ value }) => {
    // prevent deselecting all
    if (value.length > 0) setActiveFilters(value);
  };

  const visiblePages = useMemo(
    () =>
      pages.filter(
        p =>
          p.category === 'Tools' ||
          activeFilters.includes(p.category),
      ),
    [activeFilters],
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
              multiple
              options={toggleGroupOptions}
              value={activeFilters}
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
