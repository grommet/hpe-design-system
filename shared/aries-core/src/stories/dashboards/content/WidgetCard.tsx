// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import {
  Anchor,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
} from 'grommet';
import { LinkNext } from '@hpe-design/icons-grommet';
import { serviceCount } from './myServices';

const TITLE = 'My services';

export type WidgetWidth = 'medium' | 'xlarge' | 'xxlarge';

export interface WidgetProps {
  /** Card width; maps to the dashboard's small, medium and large widget sizes. */
  width?: WidgetWidth;
  /** Number of columns the region groups flow into. */
  columns?: number;
  /** Maximum service rows to show before a "View all" footer appears. */
  limit?: number;
}

interface WidgetCardProps {
  width: WidgetWidth;
  truncated: boolean;
  /** Horizontal body padding; 'small' lets full-width rows own the hover edge. */
  bodyPad?: 'small' | 'medium';
  children: React.ReactNode;
}

/**
 * Shared dashboard-widget shell so each list treatment is compared on the
 * list alone. Header and footer match the Figma reference.
 */
export const WidgetCard = ({
  width,
  truncated,
  bodyPad = 'medium',
  children,
}: WidgetCardProps) => (
  <Card width={width}>
    <CardHeader align="center">
      <Heading level={2} margin="none">
        {TITLE}
      </Heading>
      <Button
        icon={<LinkNext color="icon-primary" />}
        a11yTitle={`Go to ${TITLE}`}
        href="/services"
        onClick={event => event.preventDefault()}
      />
    </CardHeader>
    {/* Header already pads the shared edge, so the body starts flush. */}
    <CardBody pad={{ horizontal: bodyPad, bottom: 'medium', top: 'none' }}>
      {children}
    </CardBody>
    {truncated && (
      <CardFooter border={{ side: 'top', color: 'border-weak' }} justify="end">
        <Anchor
          label={`View all ${serviceCount} services`}
          href="/services"
          onClick={event => event.preventDefault()}
        />
      </CardFooter>
    )}
  </Card>
);
