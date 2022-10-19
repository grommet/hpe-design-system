import React from 'react';
import { Box, Button } from 'grommet';
import { Notes, ShareRounded } from 'grommet-icons';
import { Card } from '../../templates';

const product = {
  icon: '/apache-spark.svg',
  title: 'Helpful Guides',
  description:
    'Access step by step guides on getting the most out of Apache Spark.',
  action: {
    label: 'View Guides',
    icon: <ShareRounded />,
    href: '#',
  },
};

export const AvatarCardExampleDont = () => (
  <Card
    avatar={product.icon}
    icon={
      <Box pad={{ left: 'small' }}>
        <Notes />
      </Box>
    }
    title={product.title}
    description={product.description}
    actions={
      <Button
        label={product.action.label}
        href={product.action.href}
        secondary
      />
    }
    alignActions="end"
    onClick={() => {}}
    level={3}
  />
);
