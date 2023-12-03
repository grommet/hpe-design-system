import Link from 'next/link'
import { Box, Card, CardHeader, Heading, Page, PageContent, PageHeader } from 'grommet'

export default function Home() {
  return (
    <Page>
      <PageContent> 
      <PageHeader title="Home" />
        <Box align='start'>
          <Link href="/components" passHref legacyBehavior>
            <Card background="background-front">
              <CardHeader>
                <Heading level={2}>Manage components</Heading>
              </CardHeader>
            </Card>
          </Link>
        </Box>
      </PageContent>
    </Page>
  )
}
