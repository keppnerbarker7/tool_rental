"use client"

import { ClerkProvider } from '@clerk/nextjs'

interface ProvidersProps {
  children: React.ReactNode
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
      dynamic
    >
      {children}
    </ClerkProvider>
  )
}
