import type { ReactNode } from 'react';
import { Anchor, Box, Button, Heading, Paragraph } from 'grommet';
import { Search, StatusWarning } from '@hpe-design/icons-grommet';

// Grommet does not export an EmptyState component. Compose one from Box,
// Heading, and Paragraph.
export function EmptyState({
  actions,
  align = 'center',
  description,
  icon,
  level,
  title,
}: {
  actions?: ReactNode;
  align?: 'start' | 'center';
  description?: string;
  icon?: ReactNode;
  // Set from the heading hierarchy where the empty state is placed.
  level: 1 | 2 | 3 | 4 | 5 | 6;
  title: string;
}) {
  return (
    <Box gap="medium" align={align} flex={false}>
      {icon}
      <Box align={align} gap="3xsmall">
        <Heading level={level} margin="none">
          {title}
        </Heading>
        {description && (
          <Paragraph margin="none" textAlign={align}>
            {description}
          </Paragraph>
        )}
      </Box>
      {actions}
    </Box>
  );
}

// No data: nothing exists yet, so offer a way out and a learning link.
export function NoServers({ onAddServer }: { onAddServer: () => void }) {
  return (
    <EmptyState
      level={2}
      title="No servers found"
      description="Add a server to start monitoring your infrastructure."
      actions={
        <Box align="center" gap="xsmall">
          <Button label="Add server" primary onClick={onAddServer} />
          <Anchor label="What is a server?" href="/docs/servers" />
        </Box>
      }
    />
  );
}

// Action: a search or filter returned nothing.
export function NoSearchResults() {
  return (
    <EmptyState
      icon={<Search size="xlarge" aria-hidden="true" />}
      level={2}
      title="No results found"
      description="Refine your search and try again."
    />
  );
}

// Error management: an error prevented the data from loading.
export function UnableToRetrieveData({
  onSubmitSupportRequest,
}: {
  onSubmitSupportRequest: () => void;
}) {
  return (
    <EmptyState
      icon={
        <StatusWarning size="xlarge" color="icon-warning" aria-hidden="true" />
      }
      level={2}
      title="Unable to retrieve data"
      description="Try refreshing the browser window. If the problem persists, submit a support request."
      actions={
        <Button
          label="Submit support request"
          primary
          onClick={onSubmitSupportRequest}
        />
      }
    />
  );
}
