import {
  Box,
  Card,
  CardHeader,
  CardBody,
  Grid,
  Heading,
  Text,
  Meter,
} from 'grommet';
import {
  StatusGood,
  StatusWarning,
  StatusCritical,
} from '@hpe-design/icons-grommet';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  status?: 'ok' | 'warning' | 'critical';
}

function MetricCard({ title, value, icon, status = 'ok' }: MetricCardProps) {
  // Meter fill is a foreground target; icons take icon-* (see color-names-its-target).
  const meterColors = {
    ok: 'foreground-ok',
    warning: 'foreground-warning',
    critical: 'foreground-critical',
  };

  return (
    <Card background="background-front">
      <CardBody gap="small">
        <Box direction="row" align="center" gap="small">
          {icon}
          <Text size="small" color="text-weak">
            {title}
          </Text>
        </Box>
        <Heading level={2} margin="none">
          {value}
        </Heading>
        <Meter
          type="bar"
          values={[{ value: 75, color: meterColors[status] }]}
          size="small"
        />
      </CardBody>
    </Card>
  );
}

export function Dashboard() {
  return (
    <Box gap="medium">
      <Box>
        <Heading level={2} margin={{ bottom: 'small' }}>
          Dashboard Overview
        </Heading>
        <Text color="text-weak">Monitor key metrics and system health</Text>
      </Box>

      <Grid columns={{ count: 3, size: 'auto' }} gap="medium">
        <MetricCard
          title="Active Users"
          value="1,247"
          icon={<StatusGood aria-hidden="true" color="icon-ok" />}
          status="ok"
        />
        <MetricCard
          title="System Load"
          value="67%"
          icon={<StatusWarning aria-hidden="true" color="icon-warning" />}
          status="warning"
        />
        <MetricCard
          title="Error Rate"
          value="0.3%"
          icon={<StatusCritical aria-hidden="true" color="icon-critical" />}
          status="critical"
        />
      </Grid>
    </Box>
  );
}
