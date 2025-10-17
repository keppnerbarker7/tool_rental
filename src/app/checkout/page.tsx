import { Suspense } from 'react'
import { CheckoutPageClient } from '@/components/checkout/checkout-page-client'

interface CheckoutPageProps {
  searchParams: {
    toolId?: string
    toolName?: string
    startDate?: string
    endDate?: string
    days?: string
    subtotal?: string
    taxes?: string
    rentalTotal?: string
    deposit?: string
    location?: string
  }
}

// Prevent static generation for this search params-dependent page
export const dynamic = 'force-dynamic'

export default function CheckoutPage({ searchParams }: CheckoutPageProps) {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    }>
      <CheckoutPageClient searchParams={searchParams} />
    </Suspense>
  )
}