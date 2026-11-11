// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { useContext } from 'react';
import type { ComponentProps, ReactNode } from 'react';
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  ResponsiveContext,
  ThemeContext,
} from 'grommet';
import { ChartCardHeader } from './ChartCardHeader';

export type ChartCardProps = Omit<
  ComponentProps<typeof Card>,
  'children' | 'title'
> & {
  action?: ReactNode;
  title?: string;
  level?: ComponentProps<typeof Heading>['level'];
  subtitle?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
};

type CardBodyPad = ComponentProps<typeof CardBody>['pad'];
type ChartCardTheme = {
  card: {
    body: { pad: Extract<CardBodyPad, string> };
    header: { pad: Extract<CardBodyPad, string> };
    footer: { pad: CardBodyPad };
  };
};

export const ChartCard = ({
  action,
  title,
  level = 2,
  subtitle,
  children,
  footer,
  onClick,
  ...rest
}: ChartCardProps) => {
  const size = useContext(ResponsiveContext);
  // This chart layout uses scalar body/header padding from the active theme.
  const theme = useContext(ThemeContext) as ChartCardTheme;
  const { body, header, footer: footerTheme } = theme.card;

  return (
    <Card onClick={onClick} {...rest}>
      <CardHeader
        pad={
          ['xsmall', 'small'].includes(size)
            ? { horizontal: 'xlarge', top: 'xlarge', bottom: header.pad }
            : { horizontal: header.pad, top: header.pad, bottom: 'xsmall' }
        }
      >
        <ChartCardHeader
          action={action}
          title={title}
          level={level}
          subtitle={subtitle}
        />
      </CardHeader>
      <CardBody
        pad={
          ['xsmall', 'small'].includes(size)
            ? { horizontal: 'xlarge', top: body.pad, bottom: 'xlarge' }
            : { horizontal: body.pad, top: 'xsmall', bottom: body.pad }
        }
      >
        {children}
      </CardBody>
      {footer && (
        <CardFooter
          pad={
            ['xsmall', 'small'].includes(size)
              ? { horizontal: 'xlarge', top: body.pad, bottom: 'xlarge' }
              : footerTheme.pad
          }
          border={{ side: 'top', color: 'border-weak' }}
        >
          {footer}
        </CardFooter>
      )}
    </Card>
  );
};
