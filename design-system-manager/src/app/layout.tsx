import React from 'react'
import type { Metadata } from 'next'
import { Avatar, Footer, Grommet, Header, Main, SkipLink, SkipLinkTarget, SkipLinks, Text } from 'grommet';
import { hpe } from '../themes/hpe.ts'

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
        <Grommet 
          theme={hpe} 
          themeMode="auto" 
          full="min" 
          background="background-back" 
          style={{ display: 'flex', flexDirection: 'column' }}
        >
          <SkipLinks>
            <SkipLink id="main" label="Skip to main content" />
          </SkipLinks>
          <Header 
            pad={{ horizontal: 'large', vertical: 'small' }}
            sticky='scrollup'
            style={{ backdropFilter: 'blur(12px)'}}
          >
            <Text weight={300}><Text weight="bold">HPE</Text> Design System Manager</Text>
            <Avatar background="background-contrast" size='36px' src="https://avatars.githubusercontent.com/u/1756948?v=4" />
          </Header>
          <Main>
            <SkipLinkTarget id="main" />
            {children}
          </Main>
          <Footer background="background-contrast" pad="small">My footer</Footer>
        </Grommet>
      </body>
    </html>
  )
}
