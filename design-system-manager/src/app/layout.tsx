import type { Metadata } from 'next'
import { Footer, Grommet, Header, Main, Page, PageContent } from 'grommet'
import { hpe } from '../themes/hpe'

export const metadata: Metadata = {
  title: {
    template: '%s | HPE Design System Manager',
    default: 'HPE Design System Manager'
  },
  description: 'Manage design system assets and supporting resources.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Grommet theme={hpe} themeMode="auto" full="min" background="background-back">
          <Header background="background-front" pad="small">My header</Header>
          <Main>
            {children}
          </Main>
          <Footer background="background-contrast" pad="small">My footer</Footer>
        </Grommet>
      </body>
    </html>
  )
}
