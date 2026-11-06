<Card background="background-front">
  <CardHeader>
    <Heading level={3} margin="none">
      Recent Activity
    </Heading>
  </CardHeader>
  <CardBody>
    <Box gap="small">
      {activities.map((activity, index) => (
        <Box key={index} direction="row" gap="small" align="center">
          <Box direction="row" align="center" gap="3xsmall">
            <StatusInfo aria-hidden="true" size="small" color="icon-info" />
            <Text size="small">Info</Text>
          </Box>
          <Box>
            <Text size="small">{activity.message}</Text>
            <Text size="xsmall" color="text-weak">
              {activity.time}
            </Text>
          </Box>
        </Box>
      ))}
    </Box>
  </CardBody>
</Card>;
