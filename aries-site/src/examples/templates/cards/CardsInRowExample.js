import React from 'react';
import { Box, Card, CardBody, CardFooter, Text } from 'grommet';
import {
  Aruba,
  Archlinux,
  Centos,
  Cloudlinux,
  CodeSandbox,
  Codepen,
  Debian,
  Docker,
} from 'grommet-icons';

const technologies = [
  {
    name: 'Aruba',
    icon: (color, size) => <Aruba color={color} size={size} />,
    shortDesc: 'Subtitle',
    size: 'small',
  },
  {
    name: 'Archlinux',
    icon: (color, size) => <Archlinux color={color} size={size} />,
    shortDesc: 'Subtitle',
    size: 'small',
  },
  {
    name: 'Centos',
    icon: (color, size) => <Centos color={color} size={size} />,
    shortDesc: 'Subtitle',
    size: 'medium',
  },
  {
    name: 'Cloudlinux',
    icon: (color, size) => <Cloudlinux color={color} size={size} />,
    shortDesc: 'Subtitle',
    size: 'small',
  },
  {
    name: 'CodeSandbox',
    icon: (color, size) => <CodeSandbox color={color} size={size} />,
    shortDesc: 'Subtitle',
    size: 'small',
  },
  {
    name: 'Codepen',
    icon: (color, size) => <Codepen color={color} size={size} />,
    shortDesc: 'Subtitle',
    size: 'small',
  },
  {
    name: 'Debian',
    icon: (color, size) => <Debian color={color} size={size} />,
    shortDesc: 'Subtitle',
    size: 'small',
  },
  {
    name: 'Docker',
    icon: (color, size) => <Docker color={color} size={size} />,
    shortDesc: 'Subtitle',
    size: 'medium',
  },
];

export const CardsInRowExample = () => {
  return (
    <Box
      background="background-back"
      overflow={{ vertical: 'auto', horizontal: 'hidden' }}
      pad="small"
      fill
    >
      <Box direction="row" wrap>
        {technologies &&
          technologies.map(
            ({ name: title, shortDesc: subtitle, icon, size }, index) => (
              <Card
                key={index}
                flex={false}
                margin="small"
                height="small"
                width={size}
              >
                <CardBody
                  direction={size === 'small' ? 'column' : 'row'}
                  align="center"
                >
                  <Box
                    margin={
                      size === 'small'
                        ? { bottom: 'small' }
                        : { right: 'medium' }
                    }
                  >
                    {icon(undefined, 'xlarge')}
                  </Box>
                  <Box align={size === 'small' ? 'center' : 'start'}>
                    <Text color="text-strong" size="xlarge" weight="bold">
                      {title}
                    </Text>
                    <Text>{subtitle}</Text>
                  </Box>
                </CardBody>
              </Card>
            ),
          )}
      </Box>
    </Box>
  );
};
