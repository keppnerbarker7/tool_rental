import { Suspense } from 'react'
import { CheckoutSuccessClient } from '@/components/checkout/checkout-success-client'

interface CheckoutSuccessPageProps {
  searchParams: {
    accessCode?: string
    toolName?: string
    startDate?: string
    endDate?: string
    days?: string
    rentalTotal?: string
    deposit?: string
    location?: string
    email?: string
    phone?: string
    firstName?: string
    lastName?: string
  }
}

// Prevent static generation for this search params-dependent page
export const dynamic = 'force-dynamic'

export default function CheckoutSuccessPage({ searchParams }: CheckoutSuccessPageProps) {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    }>
      <CheckoutSuccessClient searchParams={searchParams} />
    </Suspense>
  )
}