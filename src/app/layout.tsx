import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import { OfflineIndicator } from '@/components/ui/offline-indicator'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import './globals.css'

export const metadata: Metadata = {
  title: 'Utah Valley Tool Rental',
  description: 'Rent professional tools by the day - simple, secure, self-service',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'UV Tool Rental',
    startupImage: [
      {
        url: '/icons/apple-splash-2048-2732.png',
        media: '(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)',
      },
      {
        url: '/icons/apple-splash-1668-2224.png',
        media: '(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2)',
      },
      {
        url: '/icons/apple-splash-1536-2048.png',
        media: '(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)',
      },
      {
        url: '/icons/apple-splash-1125-2436.png',
        media: '(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)',
      },
      {
        url: '/icons/apple-splash-1242-2208.png',
        media: '(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3)',
      },
      {
        url: '/icons/apple-splash-750-1334.png',
        media: '(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)',
      },
      {
        url: '/icons/apple-splash-640-1136.png',
        media: '(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)',
      },
    ],
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    shortcut: '/favicon.ico',
    apple: [
      { url: '/icons/icon-152x152.png', sizes: '152x152' },
      { url: '/icons/icon-192x192.png', sizes: '192x192' },
    ],
  },
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'UV Tool Rental',
    'application-name': 'UV Tool Rental',
    'msapplication-TileColor': '#0F172A',
    'msapplication-TileImage': '/icons/icon-144x144.png',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: '#0F172A',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Only use ClerkProvider if we have the publishable key
  const clerkPublishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

  const content = (
    <html lang="en">
      <body>
        <OfflineIndicator />
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )

  if (clerkPublishableKey) {
    return (
      <ClerkProvider publishableKey={clerkPublishableKey}>
        {content}
      </ClerkProvider>
    )
  }

  // Return content without Clerk if key is not available
  return content
}