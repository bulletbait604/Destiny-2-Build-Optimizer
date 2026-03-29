import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Destiny 2 Build Optimizer',
  description: 'AI-Powered Build Optimization with Exotic Armor Synergy',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="antialiased bg-black text-white">{children}</body>
    </html>
  )
}
