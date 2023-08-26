import './globals.css'
import type { Metadata } from 'next'
import { Exo } from 'next/font/google'

const exo = Exo({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SpaceX Rockets',
  description: 'Using SpaceX API to create a landing page to display rockets.',
  icons: '/spaceicon.png'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
      <link href="/spaceicon.png" rel="icon" />
      </head>
      <body className={exo.className}>{children}</body>
    </html>
  )
}
