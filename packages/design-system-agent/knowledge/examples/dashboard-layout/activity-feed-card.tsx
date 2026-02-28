<Card background="background-front">
  <CardHeader pad="medium">
    <Heading level={3} margin="none">Recent Activity</Heading>
  </CardHeader>
  <CardBody pad="medium">
    <Box gap="small">
      {activities.map((activity, index) => (
        <Box key={index} direction="row" gap="small" align="center">
          <CircleInformation size="small" color="text-weak" />
          <Box>
            <Text size="small">{activity.message}</Text>
            <Text size="xsmall" color="text-weak">{activity.time}</Text>
          </Box>
        </Box>
      ))}
    </Box>
  </CardBody>
</Card>