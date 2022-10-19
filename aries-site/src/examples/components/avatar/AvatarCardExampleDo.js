import React from 'react';
import { Button } from 'grommet';
import { ShareRounded } from 'grommet-icons';
import { Card } from '../../templates';

const product = {
  icon: '/apache-spark.svg',
  title: 'Apache Spark',
  description: `Open source analytics engine for big data processing, 
with built-in modules for streaming, SQL, machine learning and 
graph processing.`,
  action: {
    label: 'Launch',
    icon: <ShareRounded />,
    href: '#',
  },
};

export const AvatarCardExampleDo = () => (
  <Card
    avatar={product.icon}
    title={product.title}
    description={product.description}
    actions={
      <Button
        label={product.action.label}
        icon={product.action.icon}
        href={product.action.href}
        reverse
      />
    }
    alignActions="end"
    onClick={() => {}}
    level={3}
  />
);
