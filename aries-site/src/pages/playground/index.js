import React from 'react';
import {
  Card,
  CardBody,
  Grommet,
  Grid,
  Heading,
  Page,
  PageContent,
  PageHeader,
  Text,
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
    href: '/playground/page-header',
    title: 'PageHeader',
    description: '12 props',
    category: 'Layout',
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
            pad={{ bottom: 'medium' }}
          />
          <Grid
            columns={{ count: 'fill', size: 'small' }}
            gap="medium"
          >
            {pages.map(({ href, title, description, category }) => (
              <Card
                key={href}
                tag="a"
                href={href}
                background="background-front"
                elevation="small"
                round="small"
                style={{ textDecoration: 'none' }}
                hoverIndicator
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
            ))}
          </Grid>
        </PageContent>
      </Page>
    </Grommet>
  );
}

PlaygroundIndex.getLayout = page => page;
