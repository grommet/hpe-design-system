// Adapts from 3 columns on desktop to 1 on mobile
<Grid columns={{ count: 'fit', size: 'medium' }} gap="medium">
  <MetricCard title="Active Users" value="1,247" icon={<StatusGood />} status="ok" />
  <MetricCard title="System Load" value="67%" icon={<StatusWarning />} status="warning" />
  <MetricCard title="Error Rate" value="0.3%" icon={<StatusCritical />} status="critical" />
</Grid>