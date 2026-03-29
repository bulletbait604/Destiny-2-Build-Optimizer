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
      <body className="antialiased">{children}</body>
    </html>
  )
}
