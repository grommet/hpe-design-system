import React, { useContext } from 'react';
import {
  Box,
  Button,
  Grid,
  Heading,
  Image,
  PageContent,
  ResponsiveContext,
} from 'grommet';
import { LinkNext } from 'grommet-icons';
import { CardTemplate } from './components/CardTemplate';

export const HPEAIUseCase = () => {
  const breakpoint = useContext(ResponsiveContext);

  const columns = ['xsmall', 'small'].includes(breakpoint)
    ? ['auto']
    : { count: 3, size: 'auto' };
  const rows = ['auto'];
  const gap = {
    medium: 'medium',
    large: 'large',
    xlarge: 'large',
  };

  return (
    <Box gap="medium">
      {/* in marketing page they have 60px heading
        even with size xlarge we are at 48px  */}
      <Heading size="xlarge" margin="none" level={2}>
        AI use cases
      </Heading>
      <Grid columns={columns} rows={rows} gap={gap[breakpoint]}>
        <CardTemplate
          pad={null}
          border={false}
          media={
            <Image
              src="/VirtualAssistant.png"
              alt="hpe cray supercomputing"
              fit="cover"
            />
          }
          title="Virtual Assistants"
          description="Deploy chatbots for seamless customer support."
          actions={
            // button sizes are off in design they have 42px height and we have 36px
            <Button
              label="View the use case brief"
              aria-label="View the use case brief on Virtual Assistants"
              reverse
              primary
              icon={<LinkNext />}
            />
          }
        />
        <CardTemplate
          border={false}
          pad={null}
          media={
            <Image
              src="/automation.png"
              alt="hpe cray supercomputing"
              fit="cover"
            />
          }
          title="Automation"
          description="Deploy AI driven event and incident management."
          actions={
            <Button
              label="View the usecase brief"
              aria-label="View the use case brief on automation"
              reverse
              primary
              icon={<LinkNext />}
            />
          }
        />
        <CardTemplate
          border={false}
          pad={null}
          media={
            <Image
              src="/ProductCreation.png"
              alt="hpe cray supercomputing"
              fit="cover"
            />
          }
          title="Content and Product Creation"
          description="Rapidly create and produce content for an insights-driven, customizable customer experience."
          actions={
            <Button
              label="View the use case brief"
              aria-label="View the use case brief on Content and Product Creation"
              reverse
              primary
              icon={<LinkNext />}
            />
          }
        />
      </Grid>
    </Box>
  );
};
