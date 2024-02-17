import Link from 'next/link'
import { Box, Card, CardHeader, Heading, Page, PageContent, PageHeader, Text } from 'grommet'

export default function Home() {
  return (
    <Page 
      pad={{bottom: 'large'}}
      flex
    >
      <PageContent> 
       <PageHeader title="HPE Design System Manager"/>
        <Box align='start'>
          <Link href="/components" passHref legacyBehavior >
            <Card background="background-front">
              <CardHeader
                background={{
                  image: "purple-magenta-yellow",
                  clip: "text",
                  rotate: 285,
                }}
              >
                <Heading level={2}>
                  <Box align='end'>
                    <Text weight="bold" size='4rem' margin="none">Manage</Text>
                    <Text weight="lighter" size="2rem" margin="none">components</Text>
                  </Box>
                </Heading>
              </CardHeader>
            </Card>
          </Link>
        </Box>
      </PageContent>
    </Page>
  )
}
