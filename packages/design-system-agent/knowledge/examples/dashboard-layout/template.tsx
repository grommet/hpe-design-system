import { Box, Card, CardHeader, CardBody, Grid, Heading, Text, Meter } from 'grommet';
import { StatusGood, StatusWarning, StatusCritical } from 'grommet-icons';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  status?: 'ok' | 'warning' | 'critical';
}

function MetricCard({ title, value, icon, status = 'ok' }: MetricCardProps) {
  const statusColors = {
    ok: 'status-ok',
    warning: 'status-warning',
    critical: 'status-critical'
  };

  return (
    <Card background="background-front" pad="medium">
      <CardBody>
        <Box direction="row" align="center" gap="small" margin={{ bottom: 'small' }}>
          {icon}
          <Text size="small" color="text-weak">{title}</Text>
        </Box>
        <Heading level={2} margin="none">{value}</Heading>
        <Box margin={{ top: 'small' }}>
          <Meter
            type="bar"
            values={[{ value: 75, color: statusColors[status] }]}
            size="small"
          />
        </Box>
      </CardBody>
    </Card>
  );
}

export function Dashboard() {
  return (
    <Box gap="medium">
      <Box>
        <Heading level={2} margin={{ bottom: 'small' }}>Dashboard Overview</Heading>
        <Text color="text-weak">Monitor key metrics and system health</Text>
      </Box>

      <Grid columns={{ count: 3, size: 'auto' }} gap="medium">
        <MetricCard
          title="Active Users"
          value="1,247"
          icon={<StatusGood color="status-ok" />}
          status="ok"
        />
        <MetricCard
          title="System Load"
          value="67%"
          icon={<StatusWarning color="status-warning" />}
          status="warning"
        />
        <MetricCard
          title="Error Rate"
          value="0.3%"
          icon={<StatusCritical color="status-critical" />}
          status="critical"
        />
      </Grid>
    </Box>
  );
}